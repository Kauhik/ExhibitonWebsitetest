import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';

const Congrats = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-10 bg-white px-6 pb-16 pt-14 text-slate-900">
      <BrandHeader />

      <div className="w-full max-w-xs space-y-6 rounded-3xl border border-slate-200 bg-[#f0f2f8] p-6 text-center shadow-sm">
        <h2 className="text-xl font-extrabold tracking-wide">CONGRATULATIONS!!</h2>
        <PuzzleBackdrop pieceIds={[1, 2, 3, 4, 5]} scale={0.7} />
      </div>

      <button
        type="button"
        onClick={() => navigate('/hub')}
        className="mt-auto inline-flex h-12 w-48 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 focus-visible-ring"
      >
        Back to Hub
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Congrats;
