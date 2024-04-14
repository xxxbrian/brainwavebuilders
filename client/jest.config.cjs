/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",

  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },

  moduleNameMapper: {
    // mocking assests and styling
    "^.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.ts",

    "(assets|models|services)": "<rootDir>/tests/mocks/fileMock.ts",
  },

  setupFilesAfterEnv: ["./tests/setupTests.ts"],

  moduleFileExtensions: ["js", "ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
};
