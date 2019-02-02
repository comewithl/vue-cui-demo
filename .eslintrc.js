module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "parser": 'babel-eslint'
    },
    "plugins": ["html", "vue"],
    "rules": {
        'vue/no-parsing-error': [2, {
            "x-invalid-end-tag": false
        }],
        "no-undef": [
            "warn"
        ],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        // tab和space混用，webStorm中设置
        "no-mixed-spaces-and-tabs": ["warn"]
    }
};