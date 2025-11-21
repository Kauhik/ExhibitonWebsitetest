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
 * Payload required to record a single feedback entry.
 */
export type FeedbackSubmitInput = {
  attendeeId: string;
  rating: FeedbackRating;
};

/**
 * Minimal representation of a feedback record. This is
 * mostly useful for admin tooling or future visualisations.
 */
export type FeedbackRecord = {
  id: string;
  attendee_id: string;
  rating: FeedbackRating;
  created_at: string;
};

/**
 * Persists an overall event rating for a given attendee.
 *
 * The caller is responsible for ensuring that the attendee
 * id refers to a valid row in `public.attendees`.
 */
export const submitFeedback = async (
  input: FeedbackSubmitInput,
): Promise<FeedbackRecord> => {
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      attendee_id: input.attendeeId,
      rating: input.rating,
    })
    .select('id, attendee_id, rating, created_at')
    .single();

  if (error || !data) {
    throw error ?? new Error('Unable to submit feedback.');
  }

  return data as FeedbackRecord;
};

