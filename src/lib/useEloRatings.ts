'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { EloRating } from './types';

interface UseEloRatingsReturn {
  ratings: Map<string, EloRating>;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useEloRatings(): UseEloRatingsReturn {
  const [ratings, setRatings] = useState<Map<string, EloRating>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchRatings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('elo_ratings')
        .select('*')
        .order('elo_rating', { ascending: false });

      if (error) {
        console.error('Failed to fetch ELO ratings:', error);
        return;
      }

      const map = new Map<string, EloRating>();
      for (const row of data ?? []) {
        map.set(row.chad_id, {
          chad_id: row.chad_id,
          elo_rating: Number(row.elo_rating),
          wins: row.wins,
          losses: row.losses,
          total_votes: row.total_votes,
        });
      }
      setRatings(map);
    } catch (err) {
      console.error('Failed to fetch ELO ratings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  return { ratings, loading, refetch: fetchRatings };
}
