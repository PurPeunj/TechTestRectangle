module.exports = {
    "env": {
        "browser": true,
		"node": true,
		"es2024": true,
		"amd": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
				"browser": true,
                "node": true,
				"es2024": true,
				"amd": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "script"
    },
    "rules": {
		"no-unused-vars": "off",
    }
}
