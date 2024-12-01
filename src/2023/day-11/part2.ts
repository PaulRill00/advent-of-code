import { DayFunction } from '../../DayFunction';

function getEmpties(image: string[]): [number[], number[]] {
    const emptyRows: number[] = [];
    const emptyCols: number[] = [];

    for (let row = 0; row < image.length; row++) {
        if (!image[row].includes('#'))
            emptyRows.push(row);
    }

    for (let col = 0; col < image[0].length; col++) {
        const values = image.map(row => row[col]);

        if (!values.includes('#'))
            emptyCols.push(col);
    }

    return [emptyCols, emptyRows];
}

/**
 * 
 * @returns [x, y][]
 */
function getGalaxies(image: string[]): [number, number][] {
    const galaxies: [number, number][] = [];

    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[y].length; x++) {
            if (image[y][x] === '#') galaxies.push([x,y]);
        }
    }

    return galaxies;
}

function getGalaxyPairs(galaxies: [number, number][]): [[number, number], [number, number]][] {
    const pairs: [[number, number], [number, number]][] = [];

    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i; j < galaxies.length; j++) {
            if (i === j) continue;
            pairs.push([galaxies[i], galaxies[j]]);
        }
    }

    return pairs;
}

const dayFn: DayFunction = (input) => {
    // Start here

    const [cols, rows] = getEmpties(input)
    const galaxies = getGalaxies(input);
    const pairs = getGalaxyPairs(galaxies);

    let distanceSum = 0;

    for (const [pair1, pair2] of pairs) {
        const [x1,y1] = pair1;
        const [x2,y2] = pair2;

        const [xs1,xs2] = [x1,x2].sort((a, b) => a-b)
        const [ys1,ys2] = [y1,y2].sort((a, b) => a-b)

        const crossedEmtpyRows = rows.filter(y => ys1 <= y && y <= ys2);
        const crossedEmtpyCols = cols.filter(x => xs1 <= x && x <= xs2);

        const mult = 1000000;

        const dx = Math.abs(x2-x1);
        const dy = Math.abs(y2-y1);
        const dx2 = crossedEmtpyCols.length * (mult - 1);
        const dy2 = crossedEmtpyRows.length * (mult - 1);

        distanceSum += dx + dy + dx2 + dy2;
    }

    return `Distance sum: ${distanceSum}`;
}

export default dayFn;