'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Building } from '@/data/mockCitySchema';

interface RepoInspectorProps {
  repo: Building | null;
  onClose: () => void;
}

export function RepoInspector({ repo, onClose }: RepoInspectorProps) {
  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }} // Apple-style critically damped spring
          className="fixed right-0 top-0 bottom-0 w-full max-w-sm p-6 pointer-events-none flex flex-col justify-center z-50"
        >
          <div className="hud-panel-active w-full p-8 rounded-xl pointer-events-auto flex flex-col gap-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded bg-[rgba(255,255,255,0.06)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-white hover:border-white transition-all active:scale-95"
            >
              ✕
            </button>

            <div>
              <div className="font-mono text-[10px] font-bold tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">
                Repository Target
              </div>
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-white">
                {repo.repoName}
              </h2>
            </div>

            <div className="h-[1px] w-full bg-[rgba(255,255,255,0.06)]" />

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Language</span>
                <div className="flex items-center gap-2">
                  {/* Language color indicator dot */}
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.material) }} />
                  <span className="font-mono text-[13px] font-semibold text-white capitalize">{repo.material}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Metrics</span>
                <span className="font-mono text-[13px] font-semibold text-white">{(repo.height * 100).toFixed(0)} Score</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Open PRs/Issues</span>
                <span className="font-mono text-[13px] font-semibold text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary-glow)]">
                  {repo.openPRs} Active
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Last Push</span>
                <span className="font-mono text-[13px] font-semibold text-white">
                  {repo.lastCommitDaysAgo === 0 ? 'Today' : `${repo.lastCommitDaysAgo} days ago`}
                </span>
              </div>
            </div>
            
            <button 
              className="w-full mt-2 h-12 rounded bg-[rgba(6,182,212,0.06)] text-[var(--color-secondary)] font-mono font-semibold text-[13px] border border-[rgba(6,182,212,0.25)] hover:bg-[rgba(6,182,212,0.14)] hover:border-[rgba(6,182,212,0.5)] hover:shadow-[0_0_16px_rgba(6,182,212,0.35)] active:scale-[0.97] transition-all duration-150 ease-out"
              onClick={() => console.log("Action triggered for:", repo.repoName)}
            >
              ACCESS_SOURCE()
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper to map material string back to the Stitch design token hex
function getLanguageColor(material: string) {
  switch (material.toLowerCase()) {
    case 'javascript': return '#F59E0B';
    case 'typescript': return '#06B6D4';
    case 'python': return '#EC4899';
    case 'go': return '#06B6D4';
    case 'rust': return '#DEA584';
    case 'ruby': return '#8B5CF6';
    default: return '#4B5563';
  }
}
