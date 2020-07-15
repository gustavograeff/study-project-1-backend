module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@schemas': './src/schemas',
          '@controllers': './src/controllers'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
