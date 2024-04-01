const { resolve } = require('path');
const root = resolve(__dirname + '/../');
console.log(root)
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1'
  }
}