module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 9'],
        },
        modules: process.env.BABEL_ENV !== 'es' ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-lodash'],
};
