// This is a set of helper functions to manage the Epic View Log on the client.
// The view log is an object persisted in localStorage which contains an array
// of objects with each entry containing the test ID and the timestamp each Epic
// view, so that Slot Machine knows which Epics a user has seen and can then
// integrate this data back in the targeting logic.
// As a minimum, we expect the platform to call:
// - getViewLog when building the payload to call the Contributions service.
// - logView when rendering the Epic that has been fetched from the
// Contributions service.
// NOTE: this is a short term approach to ensure backwards compatibility with
// the Frontend view log. As Slot Machine grows, we'll move towards a more
// centralised way of managing the slot state from an upper level.
import { ViewLog } from '../types';
import { get as getItem, set as setItem } from '../lib/localStorage';

// The key must be backwards compatible with Frontend.
const viewKey = 'gu.contributions.views';
const viewLog = getItem(viewKey) || [];

// interface ViewLog {
//   date: number;
//   testId: string;
// }

// Hard limit on the number of entries to keep in the viewLog.
const maxLogEntries = 50;

/**
 * Return the entire viewLog.
 */
export const getViewLog = (): ViewLog | void => {
  // Return undefined instead of null if view log does not exist
  // Needed because the localStorage API returns null for non-existing keys
  // but Contributions API expects a view log or undefined.
  return getItem(viewKey) || undefined;
};

/**
 * Add a new entry to the viewLog.
 * The number of entries is limited to the number in maxLogEntries.
 */
export const logView = (testId: string): void => {
  viewLog.push({
    date: new Date().getTime(),
    testId
  });

  setItem(viewKey, viewLog.slice(-maxLogEntries));
};

/**
 * Get the number of views in the previous number of days.
 * Optionally filters by test ID.
 */
export const getNumViewsInPreviousDays = (
  days: number,
  testId?: string
): number => {
  const ms = days * 1000 * 60 * 60 * 24;
  const now = new Date().getTime();

  return viewLog.filter(
    (view: { testId: string; date: number }) =>
      (testId ? view.testId === testId : true) && view.date > now - ms
  ).length;
};
