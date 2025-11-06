import { useEffect, useMemo, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import type { Board } from '@/lib/puzzle';
import {
  countCorrectTiles,
  getTileCoordinates,
  isSolved,
  shuffleBoard,
  swapTiles,
} from '@/lib/puzzle';
import { useLiveAnnouncer } from '@/lib/a11y';

type PuzzleGridProps = {
  tileCount?: number;
  columns?: number;
  onSolved: () => void;
};

const COLORS = ['#fef08a', '#bfdbfe', '#fbcfe8', '#bbf7d0', '#fed7aa'];

const PuzzleGrid = ({
  tileCount = 5,
  columns = 3,
  onSolved,
}: PuzzleGridProps) => {
  const [board, setBoard] = useState<Board>(() => shuffleBoard(tileCount));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(() =>
    countCorrectTiles(board),
  );
  const [complete, setComplete] = useState(false);
  const announce = useLiveAnnouncer();

  const totalTiles = useMemo(() => tileCount, [tileCount]);

  useEffect(() => {
    const nextBoard = shuffleBoard(tileCount);
    setBoard(nextBoard);
    setSelectedIndex(null);
    setDraggedIndex(null);
    setCorrectCount(countCorrectTiles(nextBoard));
    setComplete(false);
  }, [tileCount]);

  useEffect(() => {
    const nextCorrect = countCorrectTiles(board);
    setCorrectCount(nextCorrect);
    if (!complete && isSolved(board)) {
      setComplete(true);
      announce('Puzzle solved.');
      onSolved();
    }
  }, [board, complete, announce, onSolved]);

  const swapAndAnnounce = (from: number, to: number) => {
    if (complete) return;
    setBoard((current) => {
      const next = swapTiles(current, from, to);
      if (next === current) {
        return current;
      }

      [from, to].forEach((position) => {
        if (next[position] === position) {
          const { row, column } = getTileCoordinates(position, columns);
          announce(`Tile ${next[position] + 1} locked at row ${row + 1}, column ${column + 1}.`);
        }
      });

      return next;
    });
  };

  const handleTileClick = (index: number) => {
    if (complete) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }
    swapAndAnnounce(selectedIndex, index);
    setSelectedIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTileClick(index);
    }
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData('text/puzzle-index', String(index));
    event.dataTransfer.effectAllowed = 'move';
    setDraggedIndex(index);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/puzzle-index');
    const parsed = Number.parseInt(data, 10);
    const source = Number.isInteger(parsed) ? parsed : draggedIndex ?? index;
    swapAndAnnounce(source, index);
    setDraggedIndex(null);
    setSelectedIndex(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
        <span>Status</span>
        <span className="font-semibold text-slate-700">
          {correctCount}/{totalTiles}
        </span>
      </div>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        role="group"
        aria-label="Puzzle grid with numbered tiles"
      >
        {board.map((tileId, index) => {
          const isActive = selectedIndex === index;
          const isCorrect = tileId === index;
          const { row, column } = getTileCoordinates(index, columns);
          const backgroundColor = COLORS[tileId % COLORS.length];
          const positionLabel = `Tile ${tileId + 1}, row ${row + 1}, column ${column + 1}`;

          return (
            <div
              key={`${tileId}-${index}`}
              role="button"
              tabIndex={0}
              aria-label={positionLabel}
              aria-pressed={isActive}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => handleTileClick(index)}
              className={`relative flex aspect-square items-center justify-center rounded-2xl border border-slate-200 text-2xl font-semibold text-slate-900 shadow-sm transition-all duration-150 ease-out ${
                isActive ? 'ring-4 ring-brand-subtle' : ''
              } ${isCorrect ? 'border-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.25)]' : ''} focus-visible-ring`}
              style={{ backgroundColor }}
              data-correct={isCorrect}
            >
              <span>{tileId + 1}</span>
              <span className="sr-only">
                {isCorrect ? 'Placed correctly' : 'Not yet placed'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleGrid;
