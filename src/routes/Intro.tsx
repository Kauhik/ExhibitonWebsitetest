import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white px-6 pb-16 pt-20 text-slate-900">
      <BrandHeader />

      <PuzzleBackdrop pieceIds={[1, 2, 3, 4, 5]} scale={0.85} className="mt-12" />

      <button
        type="button"
        onClick={() => navigate('/hub')}
        className="mt-auto mb-10 inline-flex h-12 w-48 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-transform active:scale-95 focus-visible-ring"
      >
        Enter
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Intro;
