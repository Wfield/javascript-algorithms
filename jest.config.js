module.exports = {
  // The bail config option can be used here to have Jest stop running tests after
  // the first failure.
  bail: false,

  // Indicates whether each individual test should be reported during the run.
  verbose: false,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files.
  coverageDirectory: './coverage/',

  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],

  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],

  transform: {
    // 使用 ts-jest 转换 ts 代码。 ts 文件路径匹配 "^.+\\.tsx?$" 的，才会被转换。
    '^.+\\.tsx?$': 'ts-jest',
    // 使用 babel-jest 转换 js 代码。 js 文件路径匹配 "^.+\\.jsx?$" 的，才会被转换
    '^.+\\.jsx?$': 'babel-jest',
  },

  // The pattern Jest uses to detect test files.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // This option sets the URL for the jsdom environment.
  // It is reflected in properties such as location.href.
  // @see: https://github.com/facebook/jest/issues/6769
  testURL: 'http://localhost/',
};
