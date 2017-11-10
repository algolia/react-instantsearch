/* eslint-disable import/no-extraneous-dependencies */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
/* eslint-enable import/no-extraneous-dependencies */

const clear = x => x.filter(Boolean);

const version = process.env.VERSION || 'UNRELEASED';
const algolia = '© Algolia, inc.';
const link = 'https://community.algolia.com/react-instantsearch';
const license = `/*! ReactInstantSearch ${version} | ${algolia} | ${link} */`;

const plugins = [
  babel({
    exclude: 'node_modules/**',
    // see: https://github.com/rollup/rollup-plugin-babel#helpers
    plugins: ['external-helpers'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs({
    // Rollup only support ES modules so we need to transform commonjs modules
    // to ES one. Can be magically done sometimes, but sometimes Rollup needs
    // a bit of help
    // see doc: https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
    // see API: https://github.com/algolia/algoliasearch-helper-js/blob/develop/index.js
    namedExports: {
      'algoliasearch-helper': [
        'version',
        'AlgoliaSearchHelper',
        'SearchParameters',
        'SearchResults',
        'url',
      ],
    },
  }),
  filesize(),
];

const configuration = ({ input, name, minify = false } = {}) => ({
  input,
  external: ['react', 'react-dom'],
  output: {
    file: `dist/umd/${name}${minify ? '.min' : ''}.js`,
    name: `ReactInstantSearch.${name}`,
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    banner: license,
    sourcemap: true,
  },
  plugins: plugins.concat(
    clear([
      minify &&
        uglify({
          output: {
            preamble: license,
          },
        }),
    ])
  ),
});

export default [
  // Core
  configuration({
    input: 'index.js',
    name: 'Core',
  }),
  configuration({
    input: 'index.js',
    name: 'Core',
    minify: true,
  }),

  // Dom
  configuration({
    input: 'dom.js',
    name: 'Dom',
  }),
  configuration({
    input: 'dom.js',
    name: 'Dom',
    minify: true,
  }),

  // Connectors
  configuration({
    input: 'connectors.js',
    name: 'Connectors',
  }),
  configuration({
    input: 'connectors.js',
    name: 'Connectors',
    minify: true,
  }),
];
