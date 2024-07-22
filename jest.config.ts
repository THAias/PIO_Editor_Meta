import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: "./",
    verbose: false,
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
    transformIgnorePatterns: ["/node_modules/(?!(@tp3_care_regio)/)"],
    testPathIgnorePatterns: ["node_modules", "\\.cache"],
    collectCoverage: true,
    coverageReporters: ["text", "json", "html", ["lcov", { projectRoot: "." }], "cobertura"],
    reporters: ["default", "jest-junit"],
    testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    testResultsProcessor: "jest-sonar-reporter",
};

export default config;
