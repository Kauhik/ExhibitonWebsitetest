import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';
import { shows } from '@/data/shows';

const REGISTRATION_FLAG = 'attendee_registered';

const Hub = () => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasRegistered = window.localStorage.getItem(REGISTRATION_FLAG) === 'true';

    if (!hasRegistered) {
      navigate('/', { replace: true });
      return;
    }

    setIsAllowed(true);
  }, [navigate]);

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white px-6 pb-24 pt-14 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />

      <BrandHeader compact />

      <p className="mt-10 text-center text-sm text-slate-500">
        Tap a pin to open each project showcase.
      </p>

      <PuzzleBackdrop
        pieceIds={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        shows={shows}
        scale={0.9}
        className="mt-12"
      />
    </div>
  );
};

export default Hub;
