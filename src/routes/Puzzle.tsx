import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PuzzleGrid from '@/components/PuzzleGrid';

const Puzzle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completed, setCompleted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleSolved = useCallback(() => {
    setCompleted(true);
  }, []);

  useEffect(() => {
    if (!completed) return;
    timeoutRef.current = window.setTimeout(() => {
      navigate('/congrats', { state: location.state });
      timeoutRef.current = null;
    }, 950);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [completed, navigate, location.state]);

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white px-6 pb-12 pt-14 text-slate-900">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Arrange the tiles 1 – 5</h2>
        <p className="text-sm text-slate-500">
          Tap once to select a tile, then tap another tile to swap. Drag and drop works too.
        </p>
      </div>

      <PuzzleGrid tileCount={5} columns={3} onSolved={handleSolved} />

      <p className="mt-auto text-center text-xs uppercase tracking-[0.2em] text-slate-400">
        {completed ? 'Celebrating your win…' : 'Recreate the original artwork to continue'}
      </p>
    </div>
  );
};

export default Puzzle;
