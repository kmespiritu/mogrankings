'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ARCHETYPE_LIST } from '@/lib/archetypes';
import { COUNTRY_OPTIONS, validateSubmission } from '@/lib/validation';
import type { ArchetypeKey, Platform } from '@/lib/types';

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'kick', label: 'Kick' },
  { value: 'x', label: 'X (Twitter)' },
];

interface PlatformRow {
  platform: Platform;
  username: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function SubmitPage() {
  // Form fields
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [archetypes, setArchetypes] = useState<ArchetypeKey[]>([]);
  const [platformRows, setPlatformRows] = useState<PlatformRow[]>([
    { platform: 'instagram', username: '' },
  ]);
  const [reason, setReason] = useState('');

  // Form state
  const [formState, setFormState] = useState<FormState>('idle');
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState('');

  // ── Archetype toggle ──
  function toggleArchetype(key: ArchetypeKey) {
    setArchetypes((prev) =>
      prev.includes(key)
        ? prev.filter((a) => a !== key)
        : prev.length >= 4
          ? prev
          : [...prev, key]
    );
  }

  // ── Platform row management ──
  function addPlatformRow() {
    if (platformRows.length >= 5) return;
    // Pick the first platform not yet used
    const usedPlatforms = new Set(platformRows.map((r) => r.platform));
    const nextPlatform = PLATFORM_OPTIONS.find((p) => !usedPlatforms.has(p.value));
    setPlatformRows([
      ...platformRows,
      { platform: nextPlatform?.value || 'instagram', username: '' },
    ]);
  }

  function removePlatformRow(index: number) {
    if (platformRows.length <= 1) return;
    setPlatformRows(platformRows.filter((_, i) => i !== index));
  }

  function updatePlatformRow(index: number, field: keyof PlatformRow, value: string) {
    const updated = [...platformRows];
    if (field === 'platform') {
      updated[index] = { ...updated[index], platform: value as Platform };
    } else {
      updated[index] = { ...updated[index], username: value };
    }
    setPlatformRows(updated);
  }

  // ── Submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors([]);
    setServerError('');

    // Build submission data
    const data = {
      name,
      handle,
      bio,
      country,
      archetypes,
      platforms: platformRows.map((r) => ({
        platform: r.platform,
        username: r.username,
      })),
      reason,
    };

    // Client-side validation
    const validation = validateSubmission(data);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFormState('submitting');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setFormState('error');
        if (result.details && Array.isArray(result.details)) {
          setFieldErrors(result.details);
        } else {
          setServerError(result.error || 'Something went wrong.');
        }
        return;
      }

      setFormState('success');
    } catch {
      setFormState('error');
      setServerError('Network error. Please try again.');
    }
  }

  // ── Success state ──
  if (formState === 'success') {
    return (
      <div className="ambient-glow flex flex-col items-center gap-6 py-20">
        <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 px-8 py-10 text-center">
          <div className="text-4xl">✅</div>
          <h2 className="mt-4 font-heading text-2xl font-black text-[#10B981]">
            NOMINATION RECEIVED
          </h2>
          <p className="mt-2 font-mono text-sm text-[#64748B]">
            We&apos;ll review it shortly. We&apos;re all gonna make it.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg border border-[#1E293B] bg-[#0F172A] px-6 py-2 font-mono text-sm text-[#F8FAFC] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
          >
            Back to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ambient-glow flex flex-col gap-8">
      {/* Hero */}
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-4xl font-black tracking-tight text-[#F8FAFC]">
          NOMINATE A <span className="text-[#F59E0B]">CHAD</span>
        </h1>
        <p className="mt-2 font-mono text-sm text-[#64748B]">
          Know someone who deserves to be on the leaderboard? Submit them for review.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl rounded-xl border border-[#1E293B] bg-[#0F172A] p-6"
      >
        {/* Server error banner */}
        {serverError && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 font-mono text-sm text-red-400">
            {serverError}
          </div>
        )}

        {/* Field errors */}
        {fieldErrors.length > 0 && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
            <ul className="list-inside list-disc space-y-1 font-mono text-xs text-red-400">
              {fieldErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ── NAME ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan Barrett"
            maxLength={80}
            className="w-full rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-sm text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
          />
        </fieldset>

        {/* ── HANDLE ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Handle <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@username"
            maxLength={60}
            className="w-full rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-sm text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
          />
        </fieldset>

        {/* ── BIO ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Bio <span className="text-[#334155]">(optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Brief description..."
            maxLength={500}
            rows={3}
            className="w-full resize-none rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-sm text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
          />
          <div className="mt-1 text-right font-mono text-[10px] text-[#334155]">
            {bio.length}/500
          </div>
        </fieldset>

        {/* ── COUNTRY ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-sm text-[#F8FAFC] outline-none transition-colors focus:border-[#F59E0B]"
          >
            <option value="">Select country...</option>
            {COUNTRY_OPTIONS.map((flag) => (
              <option key={flag} value={flag}>
                {flag}
              </option>
            ))}
          </select>
        </fieldset>

        {/* ── ARCHETYPES ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Archetypes <span className="text-red-400">*</span>
            <span className="ml-2 text-[10px] font-normal normal-case text-[#334155]">
              select 1-4
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {ARCHETYPE_LIST.map((arch) => {
              const isSelected = archetypes.includes(arch.key);
              return (
                <button
                  key={arch.key}
                  type="button"
                  onClick={() => toggleArchetype(arch.key)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all"
                  style={{
                    borderColor: isSelected ? arch.color : '#1E293B',
                    backgroundColor: isSelected ? arch.color + '15' : 'transparent',
                    color: isSelected ? arch.color : '#64748B',
                  }}
                >
                  <span>{arch.icon}</span>
                  {arch.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* ── PLATFORMS ── */}
        <fieldset className="mb-6">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Social Platforms <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-col gap-3">
            {platformRows.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <select
                  value={row.platform}
                  onChange={(e) => updatePlatformRow(i, 'platform', e.target.value)}
                  className="w-36 rounded-lg border border-[#1E293B] bg-[#020617] px-3 py-2.5 font-mono text-xs text-[#F8FAFC] outline-none transition-colors focus:border-[#F59E0B]"
                >
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={row.username}
                  onChange={(e) => updatePlatformRow(i, 'username', e.target.value)}
                  placeholder="username"
                  maxLength={60}
                  className="flex-1 rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-xs text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
                />
                {platformRows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlatformRow(i)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1E293B] text-[#64748B] transition-colors hover:border-red-500/50 hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {platformRows.length < 5 && (
            <button
              type="button"
              onClick={addPlatformRow}
              className="mt-2 font-mono text-xs text-[#F59E0B] transition-colors hover:text-[#FBBF24]"
            >
              + Add Platform
            </button>
          )}
        </fieldset>

        {/* ── REASON ── */}
        <fieldset className="mb-8">
          <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Why should they be on the leaderboard?{' '}
            <span className="text-[#334155]">(optional)</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Make your case..."
            maxLength={1000}
            rows={3}
            className="w-full resize-none rounded-lg border border-[#1E293B] bg-[#020617] px-4 py-2.5 font-mono text-sm text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
          />
          <div className="mt-1 text-right font-mono text-[10px] text-[#334155]">
            {reason.length}/1000
          </div>
        </fieldset>

        {/* ── SUBMIT BUTTON ── */}
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full rounded-lg border border-[#F59E0B] bg-[#F59E0B]/10 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-[#F59E0B] transition-all hover:bg-[#F59E0B]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState === 'submitting' ? 'SUBMITTING...' : 'SUBMIT NOMINATION'}
        </button>

        <p className="mt-4 text-center font-mono text-[10px] text-[#334155]">
          All submissions are reviewed manually. Nothing goes live automatically.
        </p>
      </form>
    </div>
  );
}
