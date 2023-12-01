import { DayFunction } from './DayFunction';
import { getInput } from './util';

(async () => {
    const day = process.argv.slice(2)[0].padStart(2, '0');

    const dayFn = await import(`./day-${day}/index.ts`).then(x => x.default) as DayFunction;

    const input = getInput(day);

    const result = dayFn(input);

    console.log(`Day ${day} result: \n\n${result}`)
})()