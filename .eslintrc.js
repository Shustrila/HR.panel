module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],
        "no-console": "off"
    },
    "env": {
        "es6": true,
        "node": true
    }
};
