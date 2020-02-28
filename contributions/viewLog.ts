import {
  get as getItem,
  set as setItem,
  remove as removeItem
} from '../lib/localStorage';

// The key must be backwards compatible with Frontend.
const viewKey = 'gu.contributions.views';
const viewLog = getItem(viewKey) || [];

// Hard limit on the number of entries to keep in the viewLog.
const maxLogEntries = 50;

/**
 * Return the entire viewLog.
 */
export const getViewLog = () => {
  return getItem(viewKey);
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

/**
 * Get the total number of views.
 */
export const getTotalNumViews = (): number => viewLog.length;

/**
 * Clear the viewLog entirely.
 */
export const clearViewLog = (): void => removeItem(viewKey);