import BrandHeader from '@/components/BrandHeader';
import ShowTile from '@/components/ShowTile';
import { shows } from '@/data/shows';

const Hub = () => {
  return (
    <div className="relative min-h-screen bg-white px-6 pb-24 pt-14 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[420px] w-[280px]">
            <div className="absolute -left-6 top-0 h-24 w-24 rotate-[-10deg] rounded-2xl border border-slate-300" />
            <div className="absolute left-10 top-4 h-24 w-24 rotate-[8deg] rounded-2xl border border-slate-300" />
            <div className="absolute left-0 top-28 h-24 w-24 rotate-[18deg] rounded-2xl border border-slate-300" />
            <div className="absolute left-20 top-32 h-24 w-24 rotate-[-16deg] rounded-2xl border border-slate-300" />
            <div className="absolute left-14 top-56 h-24 w-24 rotate-[12deg] rounded-2xl border border-slate-300" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
      </div>

      <BrandHeader compact />

      <p className="mt-10 text-center text-sm text-slate-500">
        Tap a pin to open each project showcase.
      </p>

      <section className="mt-12 grid grid-cols-2 gap-6">
        {shows.map((show) => (
          <ShowTile key={show.id} show={show} />
        ))}
      </section>
    </div>
  );
};

export default Hub;
