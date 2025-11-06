import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';

const Intro = () => {
  const navigate = useNavigate();
  const pieces = [
    { id: 1, rotation: -8 },
    { id: 2, rotation: 6 },
    { id: 3, rotation: 12 },
    { id: 4, rotation: -12 },
    { id: 5, rotation: 4 },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white px-6 pb-16 pt-20 text-slate-900">
      <BrandHeader />

      <div className="mt-12 flex w-full max-w-xs flex-col items-center gap-6">
        <div className="grid w-full grid-cols-3 gap-3">
          {pieces.map(({ id, rotation }) => (
            <div
              key={id}
              className="flex h-24 items-center justify-center rounded-3xl border border-slate-300 bg-white shadow-sm"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <span className="text-2xl font-semibold text-slate-400">{id}</span>
            </div>
          ))}
        </div>
      </div>

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
