import fs from 'fs';
import pkg from "./package.json";
import { kebabCase } from 'lodash';
import { camelCase } from 'lodash';
import { upperFirst } from 'lodash';
import vue from 'rollup-plugin-vue';
import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';

//import postcss from 'rollup-plugin-postcss';
//import globals from 'rollup-plugin-node-globals';
//import builtins from 'rollup-plugin-node-builtins';

// The type of package Rollup should create
const PACKAGE_FORMAT = 'umd';

// The directory of the package source code files
const SRC = `${__dirname}/src/`;

// The directory to ouput the compiled files
const DIST = `${__dirname}/dist/`;

// The main.js or entry point of your package
const MAINJS = `${SRC}main.js`;

// The base filename of the compiled files (no ex)
const FILENAME = kebabCase(pkg.name);

// This is global variable used in UMD packages
const NAMESPACE = upperFirst(camelCase(pkg.name));

// The node_modules directory path
const NODE_MODULES = `${__dirname}/node_modules/**`;

// Define the plugins used for the rollup process
const plugins = [
    //globals(),
    //builtins(),
    json(),
    alias({
        resolve: ['.js', '.vue'],
        '@': `${__dirname}/src/`
    }),
    resolve({
        browser: true,
        extensions: [ '.js', '.vue']
    }),
    commonjs({
        include: NODE_MODULES
    }),
    vue({
        scss: {
            indentedSyntax: false
        },
        css: function(style, styles, compiler) {
            fs.writeFileSync(`${DIST}${FILENAME}.css`, style);
        }
    }),
    babel({
        exclude: NODE_MODULES
    })
];

/*
postcss({
    plugins: [],
    extensions: ['.scss', '.sass', '.css' ]
}),
*/

// Add the serve/livereload plugins if watch argument has been passed
if(process.env.ROLLUP_WATCH == 'true') {
    plugins.push([
        serve(),
        livereload()
    ]);
}

// Export the config object
export default {
    input: MAINJS,
    output: {
        name: NAMESPACE,
        format: PACKAGE_FORMAT,
        file: `${DIST}${FILENAME}.js`,
        sourcemap: (process.env.ROLLUP_WATCH ? 'inline' : true),
        globals: {
            'vue': 'Vue',
            'axios': 'axios',
            'moment': 'moment',
            'lodash-es': 'lodash'
        }
    },
    external: [
        'vue'
    ],
    watch: {
        include: `${SRC}**`
    },
    plugins: plugins
};
