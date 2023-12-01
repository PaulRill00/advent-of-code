module.exports = {
    scripts: {
        dev: {
            _default: `ts-node-dev --respawn ./src/runner.ts`,
            new: 'ts-node-dev ./src/scripts/create-day.ts'
        }
    }
}