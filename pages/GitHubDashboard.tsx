import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink, Github, GitCommit, Star } from 'lucide-react';
import {
  fetchPublicRepo,
  fetchRecentCommits,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_REPO_URL,
  type GitHubCommitInfo,
  type GitHubRepoInfo,
} from '../lib/github';

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function GitHubDashboard() {
  const [repo, setRepo] = useState<GitHubRepoInfo | null>(null);
  const [commits, setCommits] = useState<GitHubCommitInfo[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchPublicRepo(), fetchRecentCommits(8)])
      .then(([repoData, commitData]) => {
        if (!cancelled) {
          setRepo(repoData);
          setCommits(commitData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24 px-6">
        <p className="text-text-secondary text-sm">Loading public repository data...</p>
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full glass-card p-8 border-white/10 text-center"
        >
          <AlertCircle className="w-10 h-10 text-yellow mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-3">Unable to load repository</h1>
          <p className="text-text-secondary mb-6">
            Public GitHub data is unavailable right now. You can still view the repository directly on GitHub.
          </p>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Github className="w-4 h-4" />
            Open {GITHUB_OWNER}/{GITHUB_REPO}
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-10 border-white/10 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                  <Github className="w-6 h-6 text-yellow" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">Public repository</p>
                  <h1 className="text-3xl font-bold">{repo.fullName}</h1>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed max-w-2xl">
                {repo.description || 'Marketing site for RubberDuck.Space — built with Vite and React.'}
              </p>
            </div>

            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="github-repo-cta"
              className="inline-flex items-center justify-center gap-2 bg-yellow text-space font-semibold px-5 py-3 rounded-lg hover:scale-[1.02] active:scale-[0.99] transition-transform shrink-0"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow" />
              <span>{repo.stars} stars</span>
            </div>
            {repo.language && (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
                <span>{repo.language}</span>
              </div>
            )}
            <div>
              Updated {formatDate(repo.updatedAt)}
            </div>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 border-white/10"
        >
          <div className="flex items-center gap-2 mb-6">
            <GitCommit className="w-5 h-5 text-cyan" />
            <h2 className="text-xl font-bold">Recent commits</h2>
          </div>

          {commits.length === 0 ? (
            <p className="text-text-secondary text-sm">No recent public commits found.</p>
          ) : (
            <ul className="space-y-4">
              {commits.map((commit) => (
                <li key={commit.sha}>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-white/5 bg-white/[0.03] p-4 hover:border-white/15 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <span className="font-mono text-sm text-yellow">{commit.sha}</span>
                      <span className="text-xs text-text-muted">{formatDate(commit.date)}</span>
                    </div>
                    <p className="text-sm text-text-primary mb-1 line-clamp-2">{commit.message}</p>
                    <p className="text-xs text-text-secondary">{commit.author}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </div>
    </div>
  );
}
