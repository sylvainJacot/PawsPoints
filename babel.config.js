module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            'components': './src/components',
            'context': './src/context',
            'screens': './src/screens',
            'types': './src/types',
            'utils': './src/utils'
          },
        },
      ],
    ],
  };
};
