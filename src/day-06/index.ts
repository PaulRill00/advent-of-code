import { DayFunction } from '../DayFunction';


const dayFn: DayFunction = (input) => {
    const raceTime = Number(input[0].split(':')[1].replaceAll(' ', ''))
    const raceDistance = Number(input[1].split(':')[1].replaceAll(' ', ''))

    function countRanges(time: number, distance: number) {
        let low = 0;
        let high = Math.floor(time / 2);

        if (high * (time - high) < distance)
            return 0;

        function dt(x: number) {
            return (time - x) * x;
        }

        // Find valid ranges with binary search
        while (low + 1 < high) {
            const mid = Math.floor((low + high) / 2);
            const distanceTravelled = dt(mid);

            if (distanceTravelled >= distance) {
                high = mid;
            } else {
                low = mid;
            }
        }

        const first = high;

        // dt(x) === dt(time - x), so the middlepoint has symmetry, therefore we can use it to get the upper bound
        const last = Math.floor((time / 2) + (time / 2 - first));

        return last - first + 1;
    }

    const score = countRanges(raceTime, raceDistance);

    return `Racing score: ${score}`;
}

export default dayFn;