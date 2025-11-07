import { useNavigate } from 'react-router-dom';
import type { Show } from '@/data/shows';

type PuzzleBackdropProps = {
  pieceIds: number[];
  shows?: Show[];
  scale?: number;
  className?: string;
};

const PIECES_LAYOUT: Record<
  number,
  { top: number; left: number; rotate: number }
> = {
  1: { top: 20, left: 30, rotate: -8 },
  2: { top: 0, left: 150, rotate: 6 },
  3: { top: 24, left: 270, rotate: -5 },
  4: { top: 150, left: 30, rotate: 8 },
  5: { top: 140, left: 150, rotate: -4 },
  6: { top: 160, left: 270, rotate: 9 },
  7: { top: 280, left: 30, rotate: -7 },
  8: { top: 264, left: 150, rotate: 5 },
  9: { top: 290, left: 270, rotate: -6 },
  10: { top: 210, left: 206, rotate: 12 },
};

const basePieceClasses =
  'absolute flex h-[82px] w-[104px] items-center justify-center rounded-[26px] border border-slate-300 bg-white text-xl font-semibold text-slate-500 shadow-sm';

const PuzzleBackdrop = ({
  pieceIds,
  shows = [],
  scale = 1,
  className = '',
}: PuzzleBackdropProps) => {
  const navigate = useNavigate();

  return (
    <div className={`relative mx-auto flex justify-center ${className}`}>
      <div
        className="relative h-[380px] w-[370px]"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
      >
        {pieceIds.map((id) => {
          const piece = PIECES_LAYOUT[id];
          if (!piece) return null;
          return (
            <div
              key={id}
              className={basePieceClasses}
              style={{
                top: piece.top,
                left: piece.left,
                transform: `rotate(${piece.rotate}deg)`,
              }}
            >
              {id}
            </div>
          );
        })}

        {shows.map((show) => {
          const piece = PIECES_LAYOUT[show.pieceId];
          if (!piece || !pieceIds.includes(show.pieceId)) return null;
          const baseOffset = { x: 52, y: 36 };
          const pinTop = piece.top + (show.pinOffset?.y ?? baseOffset.y);
          const pinLeft = piece.left + (show.pinOffset?.x ?? baseOffset.x);
          return (
            <button
              type="button"
              key={show.id}
              onClick={() => navigate(`/show/${show.id}`)}
              className="group absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-transform active:scale-95 focus-visible-ring"
              style={{
                top: pinTop,
                left: pinLeft,
              }}
              aria-label={`Open ${show.name}`}
            >
              <img
                src={show.thumbnail}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleBackdrop;
