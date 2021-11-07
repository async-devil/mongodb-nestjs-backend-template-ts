/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	clearMocks: true,
	roots: ["./src"],
	testEnvironment: "node",
	preset: "ts-jest",
	coverageDirectory: "../coverage",
};
