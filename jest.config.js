module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.js",
        "src/**/*.ts",
        "src/**/*.vue",
        "!**/node_modules/**",
        "!dist/**"
    ],
    coverageReporters: [
        "html", "text", "text-summary"
    ]
}
