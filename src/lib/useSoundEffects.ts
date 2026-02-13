'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'mog-sound-muted';

export interface UseSoundEffectsReturn {
  playMogSound: () => void;
  playMoggedSound: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

/**
 * Generates all sounds programmatically using the Web Audio API.
 * No MP3 files needed — zero file size, zero licensing concerns.
 */
export function useSoundEffects(): UseSoundEffectsReturn {
  const [isMuted, setIsMuted] = useState(true); // default muted until localStorage loads
  const ctxRef = useRef<AudioContext | null>(null);

  // Load mute preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Default to NOT muted (sounds on) if no preference saved
    setIsMuted(stored === 'true');
  }, []);

  // Lazily create AudioContext (browsers require user gesture)
  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    // Resume if suspended (happens after page load without interaction)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  /**
   * VICTORY SOUND: Bass drop with layered oscillators
   * - Sub bass sweep from 150Hz → 30Hz
   * - Mid punch at 300Hz, quick decay
   * - Slight distortion for grit
   */
  const playMogSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getContext();
      const now = ctx.currentTime;

      // Master gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.6, now);
      master.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      master.connect(ctx.destination);

      // Sub bass oscillator — sweep down
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(150, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.8, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      subOsc.connect(subGain);
      subGain.connect(master);
      subOsc.start(now);
      subOsc.stop(now + 0.8);

      // Mid punch oscillator — quick attack/decay
      const midOsc = ctx.createOscillator();
      midOsc.type = 'square';
      midOsc.frequency.setValueAtTime(300, now);
      midOsc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

      const midGain = ctx.createGain();
      midGain.gain.setValueAtTime(0.3, now);
      midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      midOsc.connect(midGain);
      midGain.connect(master);
      midOsc.start(now);
      midOsc.stop(now + 0.3);

      // High transient — click/snap
      const hiOsc = ctx.createOscillator();
      hiOsc.type = 'sawtooth';
      hiOsc.frequency.setValueAtTime(800, now);
      hiOsc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      const hiGain = ctx.createGain();
      hiGain.gain.setValueAtTime(0.2, now);
      hiGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      hiOsc.connect(hiGain);
      hiGain.connect(master);
      hiOsc.start(now);
      hiOsc.stop(now + 0.1);
    } catch {
      // Silently fail if Web Audio API unavailable
    }
  }, [isMuted, getContext]);

  /**
   * DEFEAT SOUND: Sad descending tone
   * - Higher pitch sweeping down (sad trombone energy)
   * - Shorter duration, lower volume
   */
  const playMoggedSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getContext();
      const now = ctx.currentTime;

      // Master gain — quieter than victory
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.25, now);
      master.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      master.connect(ctx.destination);

      // Descending tone
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.6);

      // Second harmonic — wobbly
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(350, now);
      osc2.frequency.exponentialRampToValueAtTime(100, now + 0.5);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc2.connect(gain2);
      gain2.connect(master);
      osc2.start(now);
      osc2.stop(now + 0.5);
    } catch {
      // Silently fail if Web Audio API unavailable
    }
  }, [isMuted, getContext]);

  return { playMogSound, playMoggedSound, isMuted, toggleMute };
}
