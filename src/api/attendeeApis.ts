import { supabase } from '@/lib/supabaseClient';

/**
 * Registration / attendee API
 *
 * This module exposes a small, UI-agnostic API for
 * registering visitors and keeping track of the current
 * attendee in `localStorage`. It allows any UI surface
 * (mobile / desktop / kiosk) to reuse the same behaviour.
 */

/**
 * Local storage key that marks whether the visitor has
 * completed the entrance registration form.
 */
export const REGISTRATION_FLAG = 'attendee_registered' as const;

/**
 * Local storage key used to remember the Supabase `id`
 * of the attendee row that represents the current visitor.
 */
export const ATTENDEE_ID_KEY = 'attendee_id' as const;

/**
 * Shape of the payload required to register a new attendee.
 */
export type AttendeeRegistrationInput = {
  name: string;
  occupation: string;
};

/**
 * Minimal fields we care about from the `attendees` table.
 */
export type AttendeeRecord = {
  id: string;
  name: string;
  occupation: string;
};

/**
 * Registers a new attendee in Supabase and returns the
 * inserted row (including the generated `id`).
 *
 * This function does not touch localStorage, allowing
 * calling code to decide how to persist the result.
 */
export const registerAttendee = async (
  input: AttendeeRegistrationInput,
): Promise<AttendeeRecord> => {
  const { data, error } = await supabase
    .from('attendees')
    .insert({
      name: input.name,
      occupation: input.occupation,
    })
    .select('id, name, occupation')
    .single();

  if (error || !data) {
    throw error ?? new Error('Unable to register attendee.');
  }

  return data as AttendeeRecord;
};

/**
 * Returns the attendee id that was previously stored in
 * localStorage, or `null` if none exists / localStorage
 * is not available (for example during SSR).
 */
export const getStoredAttendeeId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(ATTENDEE_ID_KEY);
};

/**
 * Persists the registration flag and attendee id in
 * localStorage so that other parts of the UI (such as
 * the hub and feedback screens) can recognise the same
 * visitor.
 */
export const storeAttendeeInLocalStorage = (attendee: AttendeeRecord): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(REGISTRATION_FLAG, 'true');
  window.localStorage.setItem(ATTENDEE_ID_KEY, attendee.id);
};

/**
 * Indicates whether the current browser session has
 * previously completed registration.
 */
export const hasRegisteredAttendee = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(REGISTRATION_FLAG) === 'true';
};

