import { supabase } from '@/lib/supabaseClient';

/**
 * Feedback / exit ticket API
 *
 * This module exposes the minimal surface required for
 * recording overall satisfaction ratings for ExhibitionDay.
 * It intentionally keeps the shape very small so that any
 * UI (web, native, kiosk) can call it in a consistent way.
 */

/**
 * Allowed rating values for the feedback form.
 * Each value corresponds to a "star" in the UI.
 */
export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

/**
 * Minimal representation of a feedback record. This is
 * mostly useful for admin tooling or future visualisations.
 */
export type FeedbackRecord = {
  id: string;
  rating: FeedbackRating;
  created_at: string;
};

/**
 * Payload required to record a single feedback entry. Since
 * the exhibition flow is anonymous, we only capture a rating.
 */
export type FeedbackSubmitInput = {
  rating: FeedbackRating;
};

/**
 * Persists an overall event rating. Feedback is stored
 * anonymously and not linked to an attendee record.
 */
export const submitFeedback = async (
  input: FeedbackSubmitInput,
): Promise<FeedbackRecord> => {
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      rating: input.rating,
    })
    .select('id, rating, created_at')
    .single();

  if (error || !data) {
    throw error ?? new Error('Unable to submit feedback.');
  }

  return data as FeedbackRecord;
};
