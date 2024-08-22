export default {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@debank|@rabby-wallet|p-|@vespaiach)',
  ],
  resetMocks: false,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(svg|png|jpg)$': '<rootDir>/svgTransform.js',
  },
};
