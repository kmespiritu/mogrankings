import { ArchetypeKey, Platform } from './types';

// ─── Valid values ────────────────────────────────────────────────

const VALID_ARCHETYPES: ArchetypeKey[] = ['prettyboy', 'gigachad', 'mogger', 'pslgod'];

const VALID_PLATFORMS: Platform[] = ['instagram', 'youtube', 'tiktok', 'kick', 'x'];

export const COUNTRY_OPTIONS = [
  '🇺🇸', '🇬🇧', '🇧🇷', '🇦🇺', '🇨🇦', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇳🇱',
  '🇸🇪', '🇳🇴', '🇩🇰', '🇵🇱', '🇷🇺', '🇺🇦', '🇹🇷', '🇰🇷', '🇯🇵', '🇮🇳',
  '🇲🇽', '🇦🇷', '🇨🇴', '🇵🇹', '🇿🇦', '🇳🇬', '🇵🇭', '🇮🇩', '🇹🇭', '🇻🇳',
];

// ─── Sanitization ────────────────────────────────────────────────

/** Strip HTML tags, JS protocols, event handlers, control chars */
export function sanitizeText(input: string): string {
  let text = input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove angle brackets that might be part of incomplete tags
    .replace(/[<>]/g, '')
    // Remove javascript: / data: / vbscript: protocols
    .replace(/(?:javascript|data|vbscript)\s*:/gi, '')
    // Remove event handlers (onclick, onload, onerror, etc.)
    .replace(/on\w+\s*=/gi, '')
    // Remove control characters (except newline/tab)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Collapse multiple whitespace
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

/** Sanitize and ensure @ prefix */
export function sanitizeHandle(input: string): string {
  let handle = sanitizeText(input);
  if (handle && !handle.startsWith('@')) {
    handle = '@' + handle;
  }
  return handle;
}

/** Platform username: alphanumeric + . _ - only */
export function sanitizeUsername(input: string): string {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .slice(0, 60);
}

// ─── Offensive content filter ────────────────────────────────────

/**
 * Basic regex blocklist for common slurs and hate speech.
 * Not comprehensive — admin review is the real content gate.
 * Catches low-effort trolling and obvious violations.
 */
const OFFENSIVE_PATTERNS = [
  // Racial slurs (word boundary protected)
  /\bn[i1][g9]{2,}(?:er|a|ah?)s?\b/i,
  /\bk[i1]ke?s?\b/i,
  /\bsp[i1]c?ks?\b/i,
  /\bch[i1]nks?\b/i,
  /\bw[e3]tb[a4]cks?\b/i,
  /\bg[o0]{2}ks?\b/i,
  // Homophobic slurs
  /\bf[a4][g9]{2,}(?:ot|ots)?\b/i,
  /\btr[a4]nn(?:y|ie)s?\b/i,
  // Hate speech / violence encouragement
  /\bh[e3][i1]l\s*h[i1]tl[e3]r\b/i,
  /\b(?:gas|kill)\s*(?:the\s+)?(?:jews|blacks|whites|muslims)\b/i,
  // Self-harm encouragement
  /\bk[i1]ll\s*y[o0]urs[e3]lf\b/i,
  /\bkys\b/i,
];

export function containsOffensiveContent(text: string): boolean {
  const lower = text.toLowerCase();
  return OFFENSIVE_PATTERNS.some((pattern) => pattern.test(lower));
}

// ─── Submission validation ───────────────────────────────────────

export interface SubmissionPlatformInput {
  platform: string;
  username: string;
}

export interface SubmissionInput {
  name?: unknown;
  handle?: unknown;
  bio?: unknown;
  country?: unknown;
  archetypes?: unknown;
  platforms?: unknown;
  reason?: unknown;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: {
    name: string;
    handle: string;
    bio: string;
    country: string;
    archetypes: ArchetypeKey[];
    platforms: { platform: Platform; username: string }[];
    reason: string;
  } | null;
}

export function validateSubmission(input: SubmissionInput): ValidationResult {
  const errors: string[] = [];

  // ── Name ──
  const rawName = typeof input.name === 'string' ? input.name : '';
  const name = sanitizeText(rawName);
  if (!name) {
    errors.push('Name is required.');
  } else if (name.length > 80) {
    errors.push('Name must be 80 characters or less.');
  } else if (containsOffensiveContent(name)) {
    errors.push('Name contains inappropriate content.');
  }

  // ── Handle ──
  const rawHandle = typeof input.handle === 'string' ? input.handle : '';
  const handle = sanitizeHandle(rawHandle);
  if (!handle || handle === '@') {
    errors.push('Handle is required.');
  } else if (handle.length > 60) {
    errors.push('Handle must be 60 characters or less.');
  }

  // ── Bio (optional) ──
  const rawBio = typeof input.bio === 'string' ? input.bio : '';
  const bio = sanitizeText(rawBio);
  if (bio.length > 500) {
    errors.push('Bio must be 500 characters or less.');
  } else if (bio && containsOffensiveContent(bio)) {
    errors.push('Bio contains inappropriate content.');
  }

  // ── Country ──
  const rawCountry = typeof input.country === 'string' ? input.country : '';
  const country = rawCountry.trim();
  if (!country) {
    errors.push('Country is required.');
  } else if (!COUNTRY_OPTIONS.includes(country)) {
    errors.push('Invalid country selection.');
  }

  // ── Archetypes ──
  const rawArchetypes = Array.isArray(input.archetypes) ? input.archetypes : [];
  const archetypes = rawArchetypes.filter(
    (a): a is ArchetypeKey => typeof a === 'string' && VALID_ARCHETYPES.includes(a as ArchetypeKey)
  );
  if (archetypes.length === 0) {
    errors.push('At least one archetype is required.');
  } else if (archetypes.length > 4) {
    errors.push('Maximum 4 archetypes allowed.');
  }

  // ── Platforms ──
  const rawPlatforms = Array.isArray(input.platforms) ? input.platforms : [];
  const platforms: { platform: Platform; username: string }[] = [];
  const seenPlatforms = new Set<string>();

  if (rawPlatforms.length === 0) {
    errors.push('At least one platform is required.');
  } else if (rawPlatforms.length > 5) {
    errors.push('Maximum 5 platforms allowed.');
  } else {
    for (const p of rawPlatforms) {
      if (!p || typeof p !== 'object') {
        errors.push('Invalid platform entry.');
        continue;
      }
      const pObj = p as SubmissionPlatformInput;
      const platform = typeof pObj.platform === 'string' ? pObj.platform : '';
      const username = typeof pObj.username === 'string' ? sanitizeUsername(pObj.username) : '';

      if (!VALID_PLATFORMS.includes(platform as Platform)) {
        errors.push(`Invalid platform: ${sanitizeText(platform)}`);
      } else if (!username) {
        errors.push(`Username is required for ${platform}.`);
      } else if (seenPlatforms.has(platform)) {
        errors.push(`Duplicate platform: ${platform}.`);
      } else {
        seenPlatforms.add(platform);
        platforms.push({ platform: platform as Platform, username });
      }
    }
  }

  // ── Reason (optional) ──
  const rawReason = typeof input.reason === 'string' ? input.reason : '';
  const reason = sanitizeText(rawReason);
  if (reason.length > 1000) {
    errors.push('Reason must be 1000 characters or less.');
  } else if (reason && containsOffensiveContent(reason)) {
    errors.push('Reason contains inappropriate content.');
  }

  if (errors.length > 0) {
    return { valid: false, errors, sanitized: null };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name,
      handle,
      bio,
      country,
      archetypes,
      platforms,
      reason,
    },
  };
}
