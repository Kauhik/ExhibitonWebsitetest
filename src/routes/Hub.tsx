import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';
import { useShows } from '@/hooks/useShows';

const REGISTRATION_FLAG = 'attendee_registered';

const Hub = () => {
  const navigate = useNavigate();
  const { shows, isLoading, error, reload } = useShows();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasRegistered = window.localStorage.getItem(REGISTRATION_FLAG) === 'true';

    if (!hasRegistered) {
      navigate('/', { replace: true });
      return;
    }

    setIsAllowed(true);
  }, [navigate]);

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white px-6 pb-24 pt-14 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />

      <BrandHeader compact />

      <p className="mt-10 text-center text-sm text-slate-500">
        Tap a pin to open each project showcase.
      </p>

      {isLoading && (
        <p className="mt-12 text-center text-sm text-slate-500">Loading showcases…</p>
      )}

      {error && (
        <div className="mt-12 space-y-4 text-center">
          <p className="text-sm text-rose-600">Unable to load showcases: {error}</p>
          <button
            type="button"
            onClick={reload}
            className="mx-auto inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 focus-visible-ring"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <PuzzleBackdrop
          pieceIds={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          shows={shows}
          scale={0.9}
          className="mt-12"
        />
      )}
    </div>
  );
};

export default Hub;
