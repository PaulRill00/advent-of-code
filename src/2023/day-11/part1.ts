import { DayFunction } from '../../DayFunction';

function getExpandedImage (image: string[]): string[] {
    for (let row = image.length - 1; row >= 0; row--) {
        if (!image[row].includes('#'))
            image = [
                ...image.slice(0, row),
                Array(image[0].length).fill('.').join(''),
                ...image.slice(row),
            ]
    }

    for (let col = image[0].length - 1; col >= 0; col--) {
        const values = image.map(row => row[col]);

        if (!values.includes('#'))
            image = image.map(row => 
                row = row.slice(0, col) + '.' + row.slice(col)
            )
    }

    return image;
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

    const image = getExpandedImage(input)
    const galaxies = getGalaxies(image);
    const pairs = getGalaxyPairs(galaxies);

    let distanceSum = 0;

    for (const [pair1, pair2] of pairs) {
        const [x1,y1] = pair1;
        const [x2,y2] = pair2;

        const dx = Math.abs(x2-x1);
        const dy = Math.abs(y2-y1);

        distanceSum += dx + dy;
    }

    return `Distance sum: ${distanceSum}`;
}

export default dayFn;