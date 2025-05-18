module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@models/(.*)$': '<rootDir>/api/models/$1',
    '^@controllers/(.*)$': '<rootDir>/api/controllers/$1'
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/config/'
  ]
};