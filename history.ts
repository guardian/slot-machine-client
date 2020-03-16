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
    const weeklyArticleHistory = getItem(historyWeeklyKey) || [];
    console.log('incrementWeeklyArticleCount');

    if (
        weeklyArticleHistory[0] &&
        weeklyArticleHistory[0].week &&
        weeklyArticleHistory[0].week === mondayThisWeek
    ) {
        // Increment this week's counter & save updated array
        weeklyArticleHistory[0].count += 1;
        setItem(historyWeeklyKey, weeklyArticleHistory);
    } else {
        // Create new counter for this week
        weeklyArticleHistory.unshift({
            week: mondayThisWeek,
            count: 1,
        });

        // Keep only weeks newer than 1 year
        const oneYearAgo = mondayThisWeek - 365;
        const weeksNewerThanOneYear = weeklyArticleHistory.filter(
            (weeklyArticleLog: WeeklyArticleLog) => weeklyArticleLog.week >= oneYearAgo,
        );

        // Save new array
        setItem(historyWeeklyKey, weeksNewerThanOneYear);
    }
};
