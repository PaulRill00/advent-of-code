const fs = require('fs');

// Read the input file
const inputFile = process.argv[2];
const data = fs.readFileSync('./src/day-08/input.txt', 'utf8').trim();
const lines = data.split('\n');

// Euclidean algorithm to find the greatest common divisor
function gcd(x, y) {
    while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

// Function to calculate the least common multiple of an array of numbers
function lcm(nums) {
    let result = 1;
    for (const num of nums) {
        result = (num * result) / gcd(num, result);
    }
    return result;
}

// Object to store the rules
const rules = { 'left': {}, 'right': {} };
const [steps, rule] = data.split('\n\n');

// Parse the rules and store them in the 'rules' object
for (const line of rule.split('\n')) {
    const [currentState, transitions] = line.split('=');
    const state = currentState.trim();
    const [left, right] = transitions.split(',');
    const leftTrimmed = left.trim().slice(1).trim();
    const rightTrimmed = right.slice(0, -1).trim();
    rules['left'][state] = leftTrimmed;
    rules['right'][state] = rightTrimmed;
}

// Function to solve the problem
function solve(part2) {
    const possibleStates = [];
    for (const state in rules['left']) {
        const condition = part2 ? state.endsWith('A') : state.endsWith('AAA');
        if (condition) {
            possibleStates.push(state);
        }
    }

    const timeMap = {};
    let currentTime = 0;

    while (true) {
        const newPossibleStates = [];
        for (let i = 0; i < possibleStates.length; i++) {
            const nextState = rules[steps[currentTime % steps.length]][possibleStates[i]];
            if (nextState.endsWith('Z')) {
                timeMap[i] = currentTime + 1;
                if (Object.keys(timeMap).length === possibleStates.length) {
                    return lcm(Object.values(timeMap));
                }
            }
            newPossibleStates.push(nextState);
        }
        possibleStates.splice(0, possibleStates.length, ...newPossibleStates);
        currentTime++;
    }
}

// Output the results
console.log("Part 1:", solve(false));
console.log("Part 2:", solve(true));
