import {
  get as getItem,
  set as setItem,
  remove as removeItem,
} from './localStorage';

const viewKey = 'gu.contributions.views';
const viewLog = getItem(viewKey) || [];
const maxLogEntries = 50;

/**
* Log that the user has seen an Epic test so we can limit how many times they see it.
* The number of entries is limited to the number in maxLogEntries.
*
* @param testId
*/
export const getViewLog = () => {
  return getItem(viewKey);
};

export const logView = (testId: string): void => {
  viewLog.push({
      date: new Date().getTime(),
      testId,
  });

  setItem(viewKey, viewLog.slice(-maxLogEntries));
};

export const viewsInPreviousDays = (days: number, testId?: string): number => {
  const ms = days * 1000 * 60 * 60 * 24;
  const now = new Date().getTime();

  return viewLog.filter(
      (view: { testId: string; date: number }) =>
          (testId ? view.testId === testId : true) && view.date > now - ms,
  ).length;
};

export const clearViewLog = (): void => {
  removeItem(viewKey);
};

export const overallNumberOfViews = () => viewLog.length;
