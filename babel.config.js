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
          '@controllers': './src/controllers',
          '@models': './src/shared/models',
          '@interfaces': './src/shared/interfaces',
          '@middleware': './src/middleware'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
