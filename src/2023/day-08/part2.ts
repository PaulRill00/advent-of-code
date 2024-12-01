import { DayFunction } from '../../DayFunction';

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function leastCommonMultiple(values: number[]): number {
    let result = 1;

    for (const num of values) {
        result = Math.floor((num * result) / gcd(num, result));
        console.log(result);
    }

    return result;
}

const dayFn: DayFunction = (input) => {
    const [sequence, , ..._maps] = input;

    const maps = new Map<string, { L: string; R: string }>();

    _maps.forEach(map => {
        const [start, _lr] = map.split(' = ');
        const lr = _lr.replaceAll('(', '').replaceAll(')', '').split(', ');

        maps.set(start, {
            L: lr[0],
            R: lr[1] 
        })
    })

    let current = [...maps.keys()].filter(x => x.endsWith('A'));
    let stepCount = 0;
    const timeSteps = new Map<number, number>();

    let result = 0;

    outer: while (true) {
        current = current.map(x => {
            const directions = maps.get(x)!;
            const direction = sequence[stepCount % sequence.length] as 'L'|'R';
            return directions[direction];
        })

        for (let i = 0; i < current.length; i++) {
            if (current[i].endsWith('Z')) {
                timeSteps.set(i, stepCount + 1);

                if (timeSteps.size === current.length) {
                    console.log(timeSteps);
                    result = leastCommonMultiple([...timeSteps.values()]);
                    break outer;
                }
            }
        }

        stepCount++;
    }

    return `Amount of steps: ${result}`;
}

export default dayFn;