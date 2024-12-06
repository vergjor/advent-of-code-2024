import { readFileSync } from "fs";

const isSafeReport = (levels: number[]) => {
    if (levels[0] < levels[1]) levels.reverse();

    for (let index = 0; index + 1 < levels.length; index++) {
        const levelDecreaseDiff = levels[index] - levels[index + 1];
        if (levelDecreaseDiff === 0 || levelDecreaseDiff > 3 || levels[index] < levels[index + 1]) {
            return false;
        };
    }
    return true;
}

const reports = readFileSync('02-red-nosed-reports/input.txt').toString().split('\n');

const safeReports = reports.reduce((accumulator, report) => {
    const levels = report.split(' ').map((level) => Number(level));
    if (isSafeReport(levels)) return accumulator + 1;
    return accumulator;
}, 0);

console.log('Total safe reports: ', safeReports);