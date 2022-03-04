module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // dont look for test files inside this paths
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  'collectCoverageFrom': [
    "src/**/*.{tsx}",
    "!src/**/*.spec.{tsx}", // exclude this files of coverage
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"]
}