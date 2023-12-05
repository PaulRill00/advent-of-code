import { DayFunction } from '../DayFunction';

const dayFn: DayFunction = (input) => {
    const seeds = input[0].replaceAll('seeds: ', '').split(' ').map(Number) ?? [];

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

    let mapName: undefined|string = undefined;

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

    
    const locations = new Map<number, number>();
    // Iterate all seeds
    for (const seed of seeds) {
        let value = seed;
        for (const _map of mapNames) {
            const map = maps.get(_map) ?? [];
            
            const values = map.find(([_, start, length]) => value >= start && value < start + length);

            if (!values) continue;

            const [destinationStart, rangeStart] = values;
            const offset = value - rangeStart;
            value = destinationStart + offset;
        }

        locations.set(seed, value);
    }

    const [lowestItem] = [...locations.entries()].sort(([ ,v1], [ ,v2]) => v1 - v2);
    return `Lowest location is: ${lowestItem[1]}`;
}

export default dayFn;