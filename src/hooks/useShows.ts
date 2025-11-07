import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  mapRowToShow,
  SHOW_SELECT_FIELDS,
  type AppRow,
} from '@/lib/showMapper';
import type { Show } from '@/types/show';

type UseShowsState = {
  shows: Show[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export const useShows = (): UseShowsState => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShows = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('apps')
      .select(SHOW_SELECT_FIELDS)
      .order('piece_id', { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setShows([]);
    } else {
      const typedData = (data ?? []) as AppRow[];
      setShows(typedData.map(mapRowToShow));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadShows();
  }, [loadShows]);

  return {
    shows,
    isLoading,
    error,
    reload: loadShows,
  };
};

type UseShowState = {
  show: Show | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export const useShow = (slug: string | null): UseShowState => {
  const [show, setShow] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShow = useCallback(async () => {
    if (!slug) {
      setShow(null);
      setIsLoading(false);
      setError('Missing app id.');
      return;
    }

    setIsLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('apps')
      .select(SHOW_SELECT_FIELDS)
      .eq('slug', slug)
      .single();

    if (queryError) {
      setError(queryError.message);
      setShow(null);
    } else if (data) {
      setShow(mapRowToShow(data as AppRow));
    } else {
      setShow(null);
      setError('App not found.');
    }
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    loadShow();
  }, [loadShow]);

  return {
    show,
    isLoading,
    error,
    reload: loadShow,
  };
};
