module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "src.+\.test\.ts",
  "modulePathIgnorePatterns": [
    "platforms/.+"
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
