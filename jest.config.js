module.exports = {
    testEnvironment: 'jsdom',
    testEnvironment: 'jest-environment-jsdom-fifteen',
    moduleNameMapper: {
        '^react$': 'preact/compat',
        '^react-dom/test-utils$': 'preact/test-utils',
        '^react-dom$': 'preact/compat',
    },
};
