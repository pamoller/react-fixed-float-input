import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "./src/index.ts",
    output: [
        {
            file: 'dist/index.js',
            format: "cjs",
            sourcemap: true,
        },
        {
            file: 'dist/index.es.js',
            format: "esm",
            sourcemap: true,
        }
    ],
    plugins: [
        commonjs({
            include: /node_modules/,
            namedExports: {
              // node_modules/prop-types/factoryWithTypeCheckers.js#L115
              'prop-types': [
                'array',
                'bool',
                'func',
                'number',
                'object',
                'string',
                'symbol',
                'any',
                'arrayOf',
                'element',
                'elementType',
                'instanceOf',
                'node',
                'objectOf',
                'oneOf',
                'oneOfType',
                'shape',
                'exact',
              ]
            }
        }),
        external(),
        resolve(),
        postcss({
            plugins: [],
            minimize: true
        }),
        terser(),
        typescript()
    ]
}