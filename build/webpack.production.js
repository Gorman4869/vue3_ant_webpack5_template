// webpack.prod.js - 生产环境配置
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleStatsWebpackPlugin } = require("bundle-stats-webpack-plugin");
const webpack = require("webpack");

// 是否需要性能分析
const isAnalyze = process.env.ANALYZE === "true";
const smp = new SpeedMeasurePlugin();

// 基础配置
const config = merge(common, {
  mode: "production",

  // 生产环境不需要source map或使用更轻量的版本
  devtool: false, // 可以设置为'source-map'来启用源码映射

  // 生产环境特定插件
  plugins: [
    // 复制静态资源
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
          globOptions: {
            ignore: ["**/index.html", "**/favicon.ico"], // 这些文件由HtmlWebpackPlugin处理
          },
        },
      ],
    }),

    // 图片优化
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [
                              { xmlns: "http://www.w3.org/2000/svg" },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),

    // PWA支持（可选）
    // new GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    //       handler: "CacheFirst",
    //       options: {
    //         cacheName: "images",
    //         expiration: {
    //           maxEntries: 60,
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //         },
    //       },
    //     },
    //     {
    //       urlPattern: /\.(?:js|css)$/,
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "static-resources",
    //       },
    //     },
    //     {
    //       urlPattern: /^https:\/\/api\//,
    //       handler: "NetworkFirst",
    //       options: {
    //         cacheName: "api-cache",
    //         networkTimeoutSeconds: 10,
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 5 * 60, // 5 minutes
    //         },
    //       },
    //     },
    //   ],
    // }),

    // 定义环境变量
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false,
    }),

    // 捆绑包统计（可选）
    isAnalyze && new BundleStatsWebpackPlugin(),
  ].filter(Boolean),

  // 优化配置
  optimization: {
    // 确保最大限度地进行tree shaking
    sideEffects: true,
    providedExports: true,
    usedExports: true,
  },
});

// 导出配置，包装性能分析工具（如果启用）
module.exports = isAnalyze ? smp.wrap(config) : config;
