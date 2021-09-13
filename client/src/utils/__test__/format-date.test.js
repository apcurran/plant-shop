import { formatDate } from "../format-date";

describe("formatDate function", () => {
    test("formats the date in a full month, day, year style", () => {
        const myDateStr = "Mon Sep 13 2021 09:14:07 GMT-0500 (Central Daylight Time)";
        const formattedDate = formatDate(myDateStr);

        expect(formattedDate).toBe("September 13, 2021");
    });
});