import { DayFunction } from '../../DayFunction';

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

    let current = 'AAA';
    let currentSeqIndex = 0;
    let stepCount = 0;

    while (current !== 'ZZZ') {
        const directions = maps.get(current)!;
        const direction = sequence[currentSeqIndex] as 'L'|'R';

        current = directions[direction];

        currentSeqIndex = (currentSeqIndex + 1) % sequence.length;
        stepCount++;

    }


    return `Amount of steps: ${stepCount}`;
}

export default dayFn;