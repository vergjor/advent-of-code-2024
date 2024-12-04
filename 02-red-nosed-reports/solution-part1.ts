import { readFileSync } from "fs";

const isSafeReport = (levels: number[]) => {
    if (levels[0] < levels[1]) levels.reverse();

    let isSafe = true;
    for (let index = 0; index + 1 < levels.length; index++) {
        const levelDecreaseDiff = levels[index] - levels[index + 1];
        if (levelDecreaseDiff === 0 || levelDecreaseDiff > 3 || levels[index] < levels[index + 1]) {
            isSafe = false;
            break;
        };
    }
    return isSafe;
}

const reports = readFileSync('02-red-nosed-reports/input.txt').toString().split('\n');

const safeReports = reports.reduce((accumulator, report) => {
    const levels = report.split(' ').map((level) => Number(level));
    if (isSafeReport(levels)) return accumulator + 1;
    return accumulator;
}, 0);

console.log('Total safe reports: ', safeReports);