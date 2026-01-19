import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginCypress from "eslint-plugin-cypress";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "client/build/**",
            "**/*.dump",
            "readme-imgs/**",
        ],
    },
    // BACKEND CONFIG (CommonJS)
    {
        files: ["api/**/*.js", "db/**/*.js", "util/**/*.js", "server.js"],
        languageOptions: {
            sourceType: "commonjs", // Tells ESLint to expect 'require' and 'module.exports'
            globals: {
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
        },
    },
    // (React Client)
    {
        files: ["client/src/**/*.{js,jsx}"],
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
        },
    },
    {
        files: ["cypress/**/*.{js,jsx}"],
        plugins: {
            cypress: pluginCypress,
        },
        languageOptions: {
            globals: {
                ...pluginCypress.configs.globals.globals,
            },
        },
        rules: {
            ...pluginCypress.configs.recommended.rules,
        },
    },
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
]);
