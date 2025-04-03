module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screen': './src/screen',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
  ],
};
