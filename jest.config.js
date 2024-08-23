/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "_/(.*)": "<rootDir>/$1"
  },
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

// "@/*": ["./src/*"],
// "_/*": ["./*"]