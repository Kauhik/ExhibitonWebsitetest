import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '@/components/BrandHeader';
import { getStoredAttendeeId } from '@/api/attendeeApis';
import {
  submitFeedback,
  type FeedbackRating,
} from '@/api/feedbackApis';

const MAX_RATING: FeedbackRating = 5;

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating == null) {
      setError('Please select a rating before submitting.');
      return;
    }

    if (typeof window === 'undefined') {
      setError('Feedback can only be submitted from a browser.');
      return;
    }

    const attendeeId = getStoredAttendeeId();

    if (!attendeeId) {
      setError(
        'We could not find your registration details. Please return to the entrance screen, enter your name, and try again.',
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitFeedback({ attendeeId, rating });
      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError('Unable to save your feedback right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white px-6 pb-16 pt-14 text-slate-900">
      <BrandHeader compact />

      <main className="mx-auto mt-10 flex w-full max-w-md flex-1 flex-col items-center gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-lg font-semibold">
            How satisfied were you with the overall event experience of ExhibitionDay?
          </h1>
          <p className="text-sm text-slate-600">
            Seberapa puas Anda dengan pengalaman menghadiri ExhibitionDay hari ini?
          </p>
        </section>

        <section className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: MAX_RATING }, (_, index) => {
              const value = index + 1;
              const valueAsRating = value as FeedbackRating;
              const isActive = rating != null && valueAsRating <= rating;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(valueAsRating)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-yellow-400 shadow-sm transition-transform active:scale-95 focus-visible-ring"
                  aria-label={`Rate ${value} out of ${MAX_RATING}`}
                >
                  {isActive ? '★' : '☆'}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500">
            {rating == null ? 'Tap a star to select your rating.' : `You selected ${rating} out of ${MAX_RATING}.`}
          </p>
        </section>

        {error && (
          <p className="text-sm font-medium text-rose-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        {submitted && !error && (
          <p className="text-sm font-medium text-emerald-600" aria-live="polite">
            Thank you for your feedback!
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible-ring"
        >
          {isSubmitting ? 'Submitting…' : 'Submit feedback'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-transform active:scale-95 focus-visible-ring"
        >
          Back to hub
        </button>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default Feedback;
