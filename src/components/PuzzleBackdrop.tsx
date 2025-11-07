import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Show } from '@/types/show';

type PuzzleBackdropProps = {
  pieceIds: number[];
  shows?: Show[];
  scale?: number;
  className?: string;
  showPieceIcons?: boolean;
  showPinNumbers?: boolean;
  showPins?: boolean;
  onPieceSelect?: (show: Show) => void;
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
  'absolute flex h-[82px] w-[104px] items-center justify-center overflow-hidden rounded-[26px] border border-slate-300 bg-slate-50 text-2xl font-bold text-slate-800 shadow transition-transform active:scale-95';

const PuzzleBackdrop = ({
  pieceIds,
  shows = [],
  scale = 1,
  className = '',
  showPieceIcons = false,
  showPinNumbers = false,
  showPins = true,
  onPieceSelect,
}: PuzzleBackdropProps) => {
  const navigate = useNavigate();
  const showsByPiece = useMemo(() => {
    const map = new Map<number, Show>();
    shows.forEach((show) => {
      map.set(show.pieceId, show);
    });
    return map;
  }, [shows]);

  const buildIconSrc = (icon?: string | null) => {
    if (!icon) return null;
    const separator = icon.includes('?') ? '&' : '?';
    return `${icon}${separator}width=1024&height=1024&fit=cover`;
  };

  return (
    <div className={`relative mx-auto flex justify-center ${className}`}>
      <div
        className="relative h-[380px] w-[370px]"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
      >
        {pieceIds.map((id) => {
          const piece = PIECES_LAYOUT[id];
          if (!piece) return null;
          const associatedShow = showsByPiece.get(id);
          const iconSrc =
            showPieceIcons && buildIconSrc(associatedShow?.icon ?? associatedShow?.thumbnail);
          const content = iconSrc ? (
            <>
              <img src={iconSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/15" />
              <span className="relative text-2xl font-semibold text-white/85 drop-shadow">
                {id}
              </span>
            </>
          ) : (
            <span className="text-3xl font-semibold text-slate-500">{id}</span>
          );

          const commonProps = {
            style: {
              top: piece.top,
              left: piece.left,
              transform: `rotate(${piece.rotate}deg)`,
            },
            className: basePieceClasses,
          };

          if (associatedShow && onPieceSelect) {
            return (
              <button
                type="button"
                key={id}
                onClick={() => onPieceSelect(associatedShow)}
                {...commonProps}
              >
                {content}
              </button>
            );
          }

          return (
            <div key={id} {...commonProps}>
              {content}
            </div>
          );
        })}

        {showPins &&
          shows.map((show) => {
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
              {buildIconSrc(show.icon ?? show.thumbnail) ? (
                <img
                  src={buildIconSrc(show.icon ?? show.thumbnail) ?? undefined}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  {show.name.charAt(0)}
                </span>
              )}
              {showPinNumbers && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white/90 drop-shadow">
                  {show.pieceId}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleBackdrop;
