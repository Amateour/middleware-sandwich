module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "ignorePatterns": [".build/*"],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off"
    }
};