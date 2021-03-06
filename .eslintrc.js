module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": [
            "warn", 
            { "vars": "all", "args": "after-used" }
        ],
        
        "no-console": [
            "warn",
             { allow: ["warn", "error"] }
        ],
        "semi": [
            "warn",
            "always"
        ]
    }
};
