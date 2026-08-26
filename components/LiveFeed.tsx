import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitPullRequest, CircleDot, ExternalLink } from 'lucide-react';
import { fetchRecentActivity, GITHUB_REPO_URL, type GitHubFeedItem } from '../lib/github';

const STATIC_ITEM: GitHubFeedItem = {
  id: 'empty',
  action: 'Activity',
  description: 'No recent public activity',
  time: '',
  url: GITHUB_REPO_URL,
};

function iconForAction(action: string) {
  if (action.startsWith('PR')) {
    return <GitPullRequest className="w-4 h-4 text-cyan" />;
  }
  if (action === 'Push') {
    return <GitCommit className="w-4 h-4 text-yellow" />;
  }
  return <CircleDot className="w-4 h-4 text-blue-400" />;
}

export function LiveFeed() {
  const [items, setItems] = useState<GitHubFeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchRecentActivity(8)
      .then((activity) => {
        if (!cancelled) {
          setItems(activity.length > 0 ? activity : [STATIC_ITEM]);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([STATIC_ITEM]);
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded || items.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [items.length, loaded]);

  if (!loaded) {
    return null;
  }

  const currentItem = items[currentIndex] ?? STATIC_ITEM;

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none max-w-[calc(100vw-3rem)]">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.a
            key={currentItem.id}
            href={currentItem.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass-card p-4 rounded-xl shadow-2xl border border-white/[0.08] w-72 md:w-80 pointer-events-auto cursor-pointer hover:border-cyan/30 transition-colors block"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-white/[0.05]">
                {iconForAction(currentItem.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-text-primary">{currentItem.action}</span>
                  {currentItem.time && (
                    <span className="text-[10px] text-text-muted shrink-0">{currentItem.time}</span>
                  )}
                </div>
                <p className="text-xs text-text-secondary leading-snug mb-2 line-clamp-2">
                  {currentItem.description}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.05] text-text-muted text-[10px] font-medium">
                  <span>Public GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
