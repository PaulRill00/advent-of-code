import { DayFunction } from './DayFunction';
import { getInput } from './util';

export const year = 2024;

(async () => {
    const day = process.argv.slice(2)[0].padStart(2, '0');

    const dayFn1 = await import(`./${year}/day-${day}/part1.ts`).then(x => x.default) as DayFunction;
    const dayFn2 = await import(`./${year}/day-${day}/part2.ts`).then(x => x.default) as DayFunction;

    const input = getInput(day);

    const result1 = dayFn1(input);
    const result2 = dayFn2(input);

    console.log(`Day ${day} - Part One result: \n${result1}\n`);
    console.log(`Day ${day} - Part Two result: \n${result2}`);
})()