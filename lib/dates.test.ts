import { getMondayFromDate } from './dates';

const oneDay = 86400000;

describe('getMondayFromDate', () => {
    it('should return Monday midnight if today is Monday', () => {
        const mondayMorning = new Date('2020-03-02T09:15:30');
        const mondayMidnight = Math.floor(mondayMorning.getTime() / oneDay);

        const mondayEvening = new Date('2020-03-02T19:25:00');
        const got = getMondayFromDate(mondayEvening);
        expect(got).toBe(mondayMidnight);
    });

    it('should return Monday midnight today is some other day', () => {
        const mondayMorning = new Date('2020-03-02T09:15:30');
        const mondayMidnight = Math.floor(mondayMorning.getTime() / oneDay);

        const fridayAfternoon = new Date('2020-03-06T16:35:00');
        const got = getMondayFromDate(fridayAfternoon);
        expect(got).toBe(mondayMidnight);
    });
});
