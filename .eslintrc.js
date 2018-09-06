module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
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
