import { Link } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';

const Congrats = () => {
  const pieces = [1, 2, 3, 4, 5];

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-10 bg-white px-6 pb-16 pt-14 text-slate-900">
      <BrandHeader />

      <div className="w-full max-w-xs space-y-6 rounded-3xl border border-slate-200 bg-[#f0f2f8] p-6 text-center shadow-sm">
        <h2 className="text-xl font-extrabold tracking-wide">CONGRATULATIONS!!</h2>
        <div className="grid grid-cols-3 gap-3">
          {pieces.map((piece) => (
            <div
              key={piece}
              className="flex h-20 items-center justify-center rounded-3xl border border-slate-300 bg-white shadow-inner"
            >
              <span className="text-xl font-semibold text-slate-500">{piece}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/hub"
        className="mt-auto inline-flex h-12 w-48 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 focus-visible-ring"
      >
        Back to Hub
      </Link>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Congrats;
