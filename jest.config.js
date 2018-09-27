module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "src.+\.test\.ts",
  "modulePathIgnorePatterns": [
    "platforms/.+"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!**/__tests__/**/*"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
