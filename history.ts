import { get as getItem, set as setItem } from './lib/localStorage';
import { getMondayFromDate } from './lib/dates';

const historyWeeklyKey = 'gu.history.weeklyArticleCount';
const mondayThisWeek = getMondayFromDate(new Date());

type WeeklyLog = {
    week: number;
    count: number;
};

export const incrementWeeklyArticleCount = (): void => {
    const weeklyArticleCount = getItem(historyWeeklyKey) || [];

    // Check if we have an entry for this week already
    if (
        weeklyArticleCount[0] &&
        weeklyArticleCount[0].week &&
        weeklyArticleCount[0].week === mondayThisWeek
    ) {
        // Increment counter for this week
        weeklyArticleCount[0].count += 1;
    } else {
        // Create new entry for this week
        weeklyArticleCount.unshift({
            week: mondayThisWeek,
            count: 1,
        });

        // Remove any weeks older than a year
        const cutOff = mondayThisWeek - 365;
        const firstOldWeekIndex = weeklyArticleCount.findIndex(
            (c: WeeklyLog) => c.week && c.week < cutOff,
        );
        if (firstOldWeekIndex > 0) {
            weeklyArticleCount.splice(firstOldWeekIndex);
        }
    }

    setItem(historyWeeklyKey, weeklyArticleCount);
};

export const getArticleViewCountForWeeks = (weeks: number): number => {
    const weeklyArticleCount = getItem(historyWeeklyKey) || [];
    const cutOff = mondayThisWeek - weeks * 7;

    const firstOldWeekIndex = weeklyArticleCount.findIndex(
        (c: WeeklyLog) => c.week && c.week <= cutOff,
    );
    const weeklyArticleCountWindow =
        firstOldWeekIndex >= 0
            ? weeklyArticleCount.slice(0, firstOldWeekIndex)
            : weeklyArticleCount;

    return weeklyArticleCountWindow.reduce(
        (acc: string, current: WeeklyLog) => current.count + acc,
        0,
    );
};
