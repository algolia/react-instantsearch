const plugins = [
  '@babel/plugin-proposal-class-properties',
  'babel-plugin-lodash',
  'babel-plugin-inline-json-import',
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push('react-hot-loader/babel');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 9'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins,
};
