import { WeeklyArticleLog, WeeklyArticleHistory } from './types';
import { get as getItem, set as setItem } from './lib/localStorage';
import { getMondayFromDate } from './lib/dates';

const historyWeeklyKey = 'gu.history.weeklyArticleCount';
const mondayThisWeek = getMondayFromDate(new Date());

/**
 * Return the weekly article history object
 */
export const getWeeklyArticleHistory = (): WeeklyArticleHistory | undefined => {
    return getItem(historyWeeklyKey) || undefined;
};

/**
 * Increment the weekly article counter
 * Checks whether an object already exists for the current week
 * If so, increment the value; otherwise, create new object and set counter to 1
 */
export const incrementWeeklyArticleCount = (): void => {
    const WeeklyArticleHistory = getItem(historyWeeklyKey) || [];

    if (
        WeeklyArticleHistory[0] &&
        WeeklyArticleHistory[0].week &&
        WeeklyArticleHistory[0].week === mondayThisWeek
    ) {
        // Increment this week's counter
        WeeklyArticleHistory[0].count += 1;
    } else {
        // Create new counter for this week
        WeeklyArticleHistory.unshift({
            week: mondayThisWeek,
            count: 1,
        });

        // Remove any weeks older than a year
        const oneYearAgo = mondayThisWeek - 365;
        const firstOldWeekIndex = WeeklyArticleHistory.findIndex(
            (c: WeeklyArticleLog) => c.week && c.week < oneYearAgo,
        );
        if (firstOldWeekIndex > 0) {
            WeeklyArticleHistory.splice(firstOldWeekIndex);
        }
    }

    setItem(historyWeeklyKey, WeeklyArticleHistory);
};
