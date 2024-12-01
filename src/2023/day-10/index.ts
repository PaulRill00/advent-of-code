import { DayFunction } from '../../DayFunction';

type Coordinate =  { x: number; y: number }
type Pipe = '|'|'-'|'L'|'J'|'7'|'F';

function getStartingPoint(grid: string[]): Coordinate {
    for (let y = 0; y < grid.length; y++) {
        const start = grid[y].indexOf('S');
        if (start >= 0) return { x: start, y };
    }

    return { x: 0, y: 0 };
}

function isValidGridCell(coordinate: Coordinate, grid: string[]): boolean {
    if (coordinate.y < 0 || coordinate.y > grid.length - 1) return false;
    if (coordinate.x < 0 || coordinate.x > grid[coordinate.y].length - 1) return false;
    return true;
}

function getStartDirection(start: Coordinate, grid: string[]): Coordinate|never {
    const up: Coordinate = { y: -1, x: 0 };
    const right: Coordinate = { y: 0, x: 1 };
    const down: Coordinate = { y: 1, x: 0 };
    const left: Coordinate = { y: 0, x: -1 };

    for (const dir of [up, right, down, left]) {
        const coordinate: Coordinate = {
            x: start.x + dir.x,
            y: start.y + dir.y
        };
        if (!isValidGridCell(coordinate, grid)) continue;

        if (getNextCoordinate(start, coordinate, grid) === null) continue;

        return dir;
    }

    throw new Error('Could not find a starting direction');
}

function getNextCoordinate(previous: Coordinate, current: Coordinate, grid: string[]): Coordinate|null|never {
    const diff: Coordinate = {
        x: previous.x - current.x,
        y: previous.y - current.y,
    };

    const pipe = grid[current.y][current.x] as Pipe;

    if ((pipe as string) === 'S') return null;
    if ((pipe as string) === '.') return null;

    switch (pipe) {
        case '|': {
            if (diff.y < 0 && diff.x === 0)
                return {
                    ...current,
                    y: current.y + 1
                };
            if (diff.y > 0 && diff.x === 0)
                return {
                    ...current,
                    y: current.y - 1
                };
            return null;
        }
        case '-': {
            if (diff.x < 0 && diff.y === 0)
                return {
                    ...current,
                    x: current.x + 1
                };
            if (diff.x > 0 && diff.y === 0)
                return {
                    ...current,
                    x: current.x - 1
                };
            return null;
        }
        case '7': {
            // Comes from west, should go south
            if (diff.x < 0 && diff.y === 0)
                return {
                    ...current,
                    y: current.y + 1
                }

            // Comes from south, should go west
            if (diff.y > 0 && diff.x === 0)
                return {
                    ...current,
                    x: current.x - 1
                }

            return null;
        }
        case 'F': {
            // Comes from south, should go east
            if (diff.y > 0 && diff.x === 0)
                return {
                    ...current,
                    x: current.x + 1
                }

            // Comes from east, should go south
            if (diff.x > 0 && diff.y === 0)
                return {
                    ...current,
                    y: current.y + 1
                }

            return null;
        }
        case 'J': {
            // Comes from north, should go west
            if (diff.y < 0 && diff.x === 0)
                return {
                    ...current,
                    x: current.x - 1
                }

            // Comes from west, should go north
            if (diff.x < 0 && diff.y === 0)
                return {
                    ...current,
                    y: current.y - 1
                }

            return null;
        }
        case 'L': {
            // Comes from north, should go east
            if (diff.y < 0 && diff.x === 0)
                return {
                    ...current,
                    x: current.x + 1
                }

            // Comes from east, should go north
            if (diff.x > 0 && diff.y === 0)
                return {
                    ...current,
                    y: current.y - 1
                }

            return null;
        }
    }

    throw new Error(`Unknown pipe: ${pipe}`);
}

function traverse(grid: string[]): Coordinate[] {
    const start = getStartingPoint(grid);
    const startingDirection = getStartDirection(start, grid);

    const map: Coordinate[] = [];

    let previous = start;
    let current: Coordinate = {
        x: start.x + startingDirection.x,
        y: start.y + startingDirection.y
    }    
    map.push(current);

    while(grid[current.y][current.x] !== 'S') {
        const next = getNextCoordinate(previous, current, grid)!;
        previous = current;
        current = next;

        map.push(current);
    }

    return map;
}

const dayFn: DayFunction = (grid) => {
    const pipe = traverse(grid);
    pipe.unshift(getStartingPoint(grid));    

    // TODO: WTF

    let enclosedCount = 0;

    return `Enclosed pipes: ${enclosedCount}`;
}

export default dayFn;