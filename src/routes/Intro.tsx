import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import PuzzleBackdrop from '@/components/PuzzleBackdrop';
import { useShows } from '@/hooks/useShows';
import {
  registerAttendee,
  storeAttendeeInLocalStorage,
} from '@/api/attendeeApis';

const Intro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { shows } = useShows();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !occupation.trim()) {
      setError('Please enter both your name and occupation.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const attendee = await registerAttendee({
        name: name.trim(),
        occupation: occupation.trim(),
      });

      storeAttendeeInLocalStorage(attendee);

      navigate('/hub', { replace: true });
    } catch (submitError) {
      console.error(submitError);
      setError('Unable to save your details right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white px-6 pb-16 pt-20 text-slate-900">
      <BrandHeader />

      <PuzzleBackdrop
        pieceIds={[1, 2, 3, 4, 5]}
        shows={shows}
        scale={0.85}
        className="mt-12"
        showPieceIcons
        showPins={false}
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full max-w-md flex-col gap-5 rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 backdrop-blur"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-600">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ada Lovelace"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-shadow focus-visible-ring"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="text-sm font-medium text-slate-600">
            Occupation
          </label>
          <input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
            placeholder="Creative Technologist"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-shadow focus-visible-ring"
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible-ring"
        >
          {isSubmitting ? 'Saving...' : 'Enter'}
        </button>
      </form>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Intro;
