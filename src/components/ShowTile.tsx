import { Link } from 'react-router-dom';
import type { Show } from '@/data/shows';

type ShowTileProps = {
  show: Show;
};

const ShowTile = ({ show }: ShowTileProps) => (
  <Link
    to={`/show/${show.id}`}
    className="group block focus-visible-ring"
    aria-label={`${show.name} details`}
  >
    <div
      className="relative flex h-36 flex-col justify-end rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-transform duration-150 group-active:scale-95"
      style={{ backgroundColor: show.accent }}
    >
      <div className="absolute -top-5 right-4 flex items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
        <img
          src={show.thumbnail}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-600">
          Featured App
        </span>
        <p className="text-lg font-semibold text-slate-800">{show.name}</p>
      </div>
    </div>
  </Link>
);

export default ShowTile;
