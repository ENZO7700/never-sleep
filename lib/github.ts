export const GITHUB_OWNER = 'ENZO7700';
export const GITHUB_REPO = 'never-sleep';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

export interface GitHubRepoInfo {
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  language: string | null;
  htmlUrl: string;
  updatedAt: string;
}

export interface GitHubCommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface GitHubFeedItem {
  id: string;
  action: string;
  description: string;
  time: string;
  url: string;
}

function relativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString();
}

export async function fetchPublicRepo(): Promise<GitHubRepoInfo> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repository');
  }

  const data = await response.json();
  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    stars: data.stargazers_count,
    language: data.language,
    htmlUrl: data.html_url,
    updatedAt: data.updated_at,
  };
}

export async function fetchRecentCommits(limit = 8): Promise<GitHubCommitInfo[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=${limit}`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }

  const data = await response.json();
  return data.map((commit: {
    sha: string;
    html_url: string;
    commit: { message: string; author?: { name?: string; date?: string } };
    author?: { login?: string } | null;
  }) => ({
    sha: commit.sha.slice(0, 7),
    message: commit.commit.message.split('\n')[0],
    author: commit.commit.author?.name || commit.author?.login || 'Unknown',
    date: commit.commit.author?.date || '',
    url: commit.html_url,
  }));
}

export async function fetchRecentActivity(limit = 8): Promise<GitHubFeedItem[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/events?per_page=${limit}`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch activity');
  }

  const events = await response.json();
  const items: GitHubFeedItem[] = [];

  for (const event of events) {
    const createdAt = event.created_at as string;
    const actor = (event.actor?.login as string) || GITHUB_OWNER;

    if (event.type === 'PushEvent') {
      const commits = (event.payload?.commits as Array<{ message: string }> | undefined) || [];
      const latest = commits[commits.length - 1];
      items.push({
        id: `${event.id}-push`,
        action: 'Push',
        description: latest?.message?.split('\n')[0] || `${actor} pushed commits`,
        time: relativeTime(createdAt),
        url: `${GITHUB_REPO_URL}/commits`,
      });
      continue;
    }

    if (event.type === 'PullRequestEvent') {
      const action = event.payload?.action as string;
      const pr = event.payload?.pull_request as { title?: string; html_url?: string } | undefined;
      items.push({
        id: `${event.id}-pr`,
        action: `PR ${action || 'updated'}`,
        description: pr?.title || 'Pull request activity',
        time: relativeTime(createdAt),
        url: pr?.html_url || GITHUB_REPO_URL,
      });
      continue;
    }

    if (event.type === 'IssuesEvent') {
      const action = event.payload?.action as string;
      const issue = event.payload?.issue as { title?: string; html_url?: string } | undefined;
      items.push({
        id: `${event.id}-issue`,
        action: `Issue ${action || 'updated'}`,
        description: issue?.title || 'Issue activity',
        time: relativeTime(createdAt),
        url: issue?.html_url || GITHUB_REPO_URL,
      });
      continue;
    }

    if (event.type === 'ReleaseEvent') {
      const release = event.payload?.release as { name?: string; tag_name?: string; html_url?: string } | undefined;
      items.push({
        id: `${event.id}-release`,
        action: 'Release',
        description: release?.name || release?.tag_name || 'New release',
        time: relativeTime(createdAt),
        url: release?.html_url || GITHUB_REPO_URL,
      });
    }
  }

  return items;
}
