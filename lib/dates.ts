// Helper function to handle history related Date objects.
// See original code in Frontend:
// https://github.com/guardian/frontend/blob/ded42f7d574cd76090f1cab939ca62a9daf6ca98/static/src/javascripts/projects/common/modules/onward/history.js#L57
export const getMondayFromDate = (date: Date): number => {
    const day = date.getDay() || 7;
    // Do not set date to Monday if it is already Monday
    if (day !== 1) {
        date.setHours(-24 * (day - 1));
    }
    return Math.floor(date.getTime() / 86400000);
};
