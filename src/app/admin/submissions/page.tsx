'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Submission, SubmissionStatus } from '@/lib/types';

const STATUS_TABS: SubmissionStatus[] = ['pending', 'approved', 'rejected'];

export default function AdminSubmissionsPage() {
  const [adminKey, setAdminKey] = useState('');
  const [activeTab, setActiveTab] = useState<SubmissionStatus>('pending');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({});
  const [actionStatus, setActionStatus] = useState<Record<string, string>>({});

  // Read admin key from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key') || '';
    setAdminKey(key);
  }, []);

  const fetchSubmissions = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `/api/admin/submissions?key=${encodeURIComponent(adminKey)}&status=${activeTab}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch.');
        setSubmissions([]);
      } else {
        setSubmissions(data.submissions || []);
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }, [adminKey, activeTab]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function handleAction(id: string, action: 'approve' | 'reject') {
    const notes = actionNotes[id] || '';
    setActionStatus((prev) => ({ ...prev, [id]: 'processing' }));

    try {
      const res = await fetch(
        `/api/admin/submissions?key=${encodeURIComponent(adminKey)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action, notes }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setActionStatus((prev) => ({
          ...prev,
          [id]: `Error: ${data.error || 'Failed'}`,
        }));
        return;
      }

      setActionStatus((prev) => ({
        ...prev,
        [id]: action === 'approve' ? '✅ Approved' : '❌ Rejected',
      }));

      // Remove from list after brief delay
      setTimeout(() => {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        setActionStatus((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }, 1500);
    } catch {
      setActionStatus((prev) => ({ ...prev, [id]: 'Error: Network failure' }));
    }
  }

  if (!adminKey) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-mono text-sm text-[#64748B]">
          Missing admin key. Append ?key=YOUR_SECRET to the URL.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-heading text-2xl font-black text-[#F8FAFC]">
        SUBMISSION <span className="text-[#F59E0B]">REVIEW</span>
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 font-mono text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                : 'text-[#64748B] hover:text-[#F8FAFC]'
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={fetchSubmissions}
          className="ml-auto font-mono text-xs text-[#64748B] hover:text-[#F8FAFC]"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="font-mono text-sm text-[#64748B]">Loading...</p>
      )}

      {/* Empty state */}
      {!loading && submissions.length === 0 && !error && (
        <p className="font-mono text-sm text-[#64748B]">
          No {activeTab} submissions.
        </p>
      )}

      {/* Submissions */}
      <div className="flex flex-col gap-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-5"
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#F8FAFC]">
                  {sub.name}
                </h3>
                <span className="font-mono text-xs text-[#64748B]">
                  {sub.handle}
                </span>
              </div>
              <div className="text-right font-mono text-[10px] text-[#334155]">
                <div>{sub.country}</div>
                <div>{new Date(sub.created_at).toLocaleString()}</div>
                <div>IP: {sub.submitter_ip || 'unknown'}</div>
              </div>
            </div>

            {/* Bio */}
            {sub.bio && (
              <p className="mb-2 text-sm text-[#94A3B8]">{sub.bio}</p>
            )}

            {/* Archetypes */}
            <div className="mb-2 flex flex-wrap gap-1">
              {sub.archetypes.map((a) => (
                <span
                  key={a}
                  className="rounded bg-[#1E293B] px-2 py-0.5 font-mono text-[10px] text-[#94A3B8]"
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Platforms */}
            <div className="mb-2 flex flex-wrap gap-2">
              {(sub.platforms as { platform: string; username: string }[]).map(
                (p, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs text-[#64748B]"
                  >
                    {p.platform}: @{p.username}
                  </span>
                )
              )}
            </div>

            {/* Reason */}
            {sub.reason && (
              <div className="mb-3 rounded-md border border-[#1E293B] bg-[#020617] p-3">
                <div className="mb-1 font-mono text-[10px] uppercase text-[#334155]">
                  Reason
                </div>
                <p className="text-xs text-[#94A3B8]">{sub.reason}</p>
              </div>
            )}

            {/* Admin notes (for approved/rejected) */}
            {sub.admin_notes && (
              <div className="mb-3 rounded-md border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3">
                <div className="mb-1 font-mono text-[10px] uppercase text-[#F59E0B]">
                  Admin Notes
                </div>
                <p className="text-xs text-[#94A3B8]">{sub.admin_notes}</p>
              </div>
            )}

            {/* Action status */}
            {actionStatus[sub.id] && (
              <div className="mb-3 font-mono text-xs text-[#F59E0B]">
                {actionStatus[sub.id]}
              </div>
            )}

            {/* Actions (only for pending) */}
            {activeTab === 'pending' && !actionStatus[sub.id] && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  placeholder="Admin notes (optional)..."
                  value={actionNotes[sub.id] || ''}
                  onChange={(e) =>
                    setActionNotes((prev) => ({
                      ...prev,
                      [sub.id]: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full resize-none rounded-lg border border-[#1E293B] bg-[#020617] px-3 py-2 font-mono text-xs text-[#F8FAFC] placeholder-[#334155] outline-none focus:border-[#F59E0B]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(sub.id, 'approve')}
                    className="rounded-lg border border-[#10B981]/50 bg-[#10B981]/10 px-4 py-2 font-mono text-xs font-medium text-[#10B981] transition-colors hover:bg-[#10B981]/20"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleAction(sub.id, 'reject')}
                    className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 font-mono text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
