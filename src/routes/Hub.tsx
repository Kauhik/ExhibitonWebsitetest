import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';
import { useShows } from '@/hooks/useShows';
import { QR_SCANNER_ROUTE } from '@/api/qrApis';

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

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => navigate(QR_SCANNER_ROUTE)}
          className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 focus-visible-ring"
        >
          Scan QR code
        </button>
      </div>

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
        <>
          <PuzzleBackdrop
            pieceIds={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            shows={shows}
            scale={0.9}
            className="mt-12"
            showPieceIcons
            showPins={false}
            onPieceSelect={(show) => navigate(`/show/${show.id}`)}
          />

          <section className="mt-10 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Teams
            </h2>
            <div className="space-y-3">
              {shows.map((show) => (
                <button
                  key={show.id}
                  type="button"
                  onClick={() => navigate(`/show/${show.id}`)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition-transform active:scale-95 focus-visible-ring"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={show.icon ?? show.thumbnail}
                      alt={`${show.name} icon`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-slate-900">{show.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {show.platform && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                          {show.platform}
                        </span>
                      )}
                      {show.siteUrl && (
                        <span className="truncate text-xs text-slate-500">
                          {show.siteUrl}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Hub;
