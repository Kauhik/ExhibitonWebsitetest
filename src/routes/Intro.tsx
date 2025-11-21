import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';
import { useShows } from '@/hooks/useShows';

const Intro = () => {
  const navigate = useNavigate();
  const { shows } = useShows();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white px-6 pb-16 pt-20 text-slate-900">
      <BrandHeader />

      <PuzzleBackdrop
        pieceIds={[1, 2, 3, 4, 5]}
        shows={shows}
        scale={0.85}
        className="mt-12"
        showPieceIcons
        showPins={false}
      />

      <div className="mt-10 flex w-full max-w-md flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 text-center backdrop-blur">
        <p className="text-sm text-slate-600">
          Welcome to ExhibitionDay. Tap below to explore the projects.
        </p>
        <button
          type="button"
          onClick={() => navigate('/hub', { replace: true })}
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-all active:scale-95 focus-visible-ring"
        >
          Enter
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Intro;
