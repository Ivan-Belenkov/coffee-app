/** @type {import('ts-jest').JestConfigWithTsJest} */
const { resolve } = require('path');

module.exports = {
  roots: [resolve(__dirname, 'src')],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  setupFiles: [resolve(__dirname, 'src', 'test_utils', 'testPreloader.ts')]
};
