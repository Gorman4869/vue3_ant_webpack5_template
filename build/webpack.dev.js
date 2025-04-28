const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');

// import { merge } from "webpack-merge";
// import common from "./webpack.common.js";
// import path from "path";
// import ESLintPlugin from "eslint-webpack-plugin";

module.exports = merge(common, {
  mode: 'development',
  // 启用源码映射
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    host: '0.0.0.0', // 允许外部访问
    port: 8080,
    hot: true,
    compress: true, // 启用gzip压缩
    historyApiFallback: true, // SPA路由支持
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    ],
  },
  // 开发环境特定插件
  plugins: [
    // ESLint
    // new ESLintPlugin({
    //   extensions: ["js", "vue", "ts"],
    //   fix: true,
    //   emitWarning: true,
    // }),
  ],

  // 开发环境优化
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: true,
    minimize: false,
  },

  // 统计信息配置
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    errors: true,
    warnings: true,
  },
});
