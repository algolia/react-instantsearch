const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  'babel-plugin-lodash',
];

if (process.env.BABEL_ENV !== 'rollup') {
  plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 9'],
        },
        modules:
          process.env.BABEL_ENV !== 'es' && process.env.BABEL_ENV !== 'rollup'
            ? 'commonjs'
            : false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins,
};
