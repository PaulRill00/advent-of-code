import { DayFunction } from '../../DayFunction';

function countPaths(arrangement: string, blocks: number[], dotIndex = 0, blockIndex = 0, blockLength = 0, cache: Map<string, number> = new Map<string,number>()): number {
    const key = `${dotIndex},${blockIndex},${blockLength}`;

    if (cache.has(key)) return cache.get(key)!;

    if (dotIndex === arrangement.length) {
        if (blockIndex === blocks.length && blockLength === 0) 
            return 1;

        if (blockIndex === blocks.length - 1 && blocks[blockIndex] === blockLength) 
            return 1;

        return 0;
    }

    let ans = 0;

    for (const char of ['.', '#']) {
        if (arrangement[dotIndex] !== char && arrangement[dotIndex] !== '?')
            continue;

        if (char === '.' && blockLength === 0)
            ans += countPaths(arrangement, blocks, dotIndex + 1, blockIndex, 0, cache);
    
        if (char === '.' && blockLength > 0 && blockIndex < blocks.length && blocks[blockIndex] === blockLength)
            ans += countPaths(arrangement, blocks, dotIndex + 1, blockIndex + 1, 0, cache);
    
        if (char === '#')
            ans += countPaths(arrangement, blocks, dotIndex + 1, blockIndex, blockLength + 1, cache);
    }

    cache.set(key, ans);
    return ans;
}

const dayFn: DayFunction = (input) => {
    let total = 0;

    for (const record of input) {
        let [arrangement, _blocks] = record.split(' ');
        let blocks = _blocks.split(',').map(Number);

        arrangement = Array(5).fill(arrangement).join('?');
        blocks = Array(5).fill(blocks.join(',')).join(',').split(',').map(Number);

        total += countPaths(arrangement, blocks);
    }

    return `Total of sums: ${total}`;
}

export default dayFn;