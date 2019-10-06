const path = require('path');

module.exports = {
  // 輸入的檔案
  entry: './src/index.ts',
  module: {
    rules: [
      // 使用 ts-loader 負責處理 .ts 相關的檔案
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    // 輸出的檔案名稱為 bundle.js
    filename: 'bundle.js',

    // 輸出的檔案會放置在 ./dist/ 這個資料夾裡
    path: path.resolve(__dirname, 'dist'),
  },
};
