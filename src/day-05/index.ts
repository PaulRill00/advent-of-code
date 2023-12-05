import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const seeds = input[0].replaceAll('seeds: ', '').split(' ').map(Number) ?? [];
    const pairs = seeds.reduce((acc, val, index) => {
        if (index % 2 === 0)
            acc.push([val, seeds[index + 1]])
        return acc;
    }, [] as [number, number][]);

    const mapNames = [
        'seed-to-soil',
        'soil-to-fertilizer',
        'fertilizer-to-water',
        'water-to-light',
        'light-to-temperature',
        'temperature-to-humidity',
        'humidity-to-location',
    ];
    const maps = new Map<string, [number, number, number][]>();

    let mapName: undefined | string = undefined;

    // Sort all data into the maps
    for (const row of input) {
        if (!row.length) continue;

        if (row.includes('map:')) {
            mapName = row.replace('map:', '').trim();
            maps.set(mapName, []);
            continue;
        }

        const values = row.split(' ').map(Number) as [number, number, number];
        maps.set(mapName ?? '', [...(maps.get(mapName ?? '') ?? []), values])
    }

    let lowestLocation = Infinity;

    for (const [start, size] of pairs) {
        let ranges: [number, number][] = [[start, start + size]];

        // for const func of functions
        for (const _map of mapNames) {
            const result: [number, number][] = [];
            const tuples = maps.get(_map) ?? [];

            for (const [destination, source, size] of tuples) {
                const sourceEnd = source + size;
                const newRanges: [number, number][] = [];

                while (ranges.length > 0) {
                    const [start, end] = ranges.pop()!;

                    const before: [number, number] = [start, Math.min(end, source)];
                    const inter: [number, number] = [Math.max(start, source), Math.min(sourceEnd, end)];
                    const after: [number, number] = [Math.max(sourceEnd, start), end];

                    if (before[1] > before[0])
                        newRanges.push(before);
                    if (inter[1] > inter[0])
                        result.push([inter[0] - source + destination, inter[1] - source + destination]);
                    if (after[1] > after[0])
                        newRanges.push(after)
                }

                ranges = newRanges;
            }

            ranges = result.concat(ranges);
        }

        const lowestValue = Math.min(...ranges.map(x => x[0]));
        if (lowestValue < lowestLocation)
            lowestLocation = lowestValue;
    }

    return `Lowest location is: ${lowestLocation}`;
}

export default dayFn;