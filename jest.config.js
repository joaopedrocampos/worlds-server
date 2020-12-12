module.exports = {
    preset: '@shelf/jest-mongodb',
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['src/**/*.js', '!src/hooks/**/*.js'],
    roots: ['src'],
};
