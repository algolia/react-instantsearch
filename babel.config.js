/* eslint-disable import/no-commonjs */

const isProduction = process.env.BABEL_ENV === 'production';

const clean = x => x.filter(Boolean);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 9'],
        },
        modules: 'commonjs',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-lodash'],
  overrides: [
    {
      test: 'docgen',
      plugins: clean([
        'babel-plugin-inline-json-import',
        !isProduction && 'react-hot-loader/babel',
      ]),
    },
  ],
};
