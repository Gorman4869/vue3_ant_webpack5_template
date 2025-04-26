const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { DefinePlugin } = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const threadLoader = require("thread-loader");
const child_process = require("child_process");

// import path from "path";
// import webpack from "webpack";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import { VueLoaderPlugin } from "vue-loader";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// import TerserPlugin from "terser-webpack-plugin";
// // import { DefinePlugin } from "webpack";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// import CompressionPlugin from "compression-webpack-plugin";
// import { WebpackManifestPlugin } from "webpack-manifest-plugin";
// import threadLoader from "thread-loader";
// import { exec } from "child_process";
// const DefinePlugin = webpack.DefinePlugin;
const commitid = child_process
  .execSync("git show -s --format=%H")
  .toString()
  .trim();
//预热线程池
threadLoader.warmup(
  {
    workers: 4,
    workerParallelJobs: 50,
    poolRespawn: false,
    poolTimeout: 2000,
    name: "js-pool",
  },
  ["babel-loader", "vue-loader"],
);

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
let processEnv = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  BASE_URL: JSON.stringify("/"),
};
if (isProd) {
  processEnv.COMMITID = JSON.stringify(commitid);
}
module.exports = {
  //入口
  entry: {
    app: path.resolve(__dirname, "../src/main.js"),
  },
  //出口
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].js",
    chunkFilename: isProd
      ? "js/chunk-[name].[contenthash:8].js"
      : "js/chunk-[name].js",
    assetModuleFilename: "assets/[name].[contenthash:8].[ext]",
    clean: true, //每次构建前清理输出目录
    publicPath: "/", //静态资源路径，打包后html中引用的静态资源路径
  },
  //解析配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      vue: "@vue/runtime-dom",
    },
    extensions: [".js", ".vue", ".json"], //todo jsx
    //优化模块查找路径
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  //模块配置
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      //处理vue
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 4,
              workerParallelJobs: 50,
              poolRespawn: false,
              poolTimeout: 2000,
              name: "vue-pool",
            },
          },
          "vue-loader",
        ],
      },
      //处理js
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 4,
              workerParallelJobs: 50,
              poolRespawn: false,
              poolTimeout: 2000,
              name: "js-pool",
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    modules: false, // 保持ESM语法以便tree shaking
                  },
                ],
                //   '@babel/preset-typescript' //todo
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        ],
      },
      //处理css
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: isDev
                  ? "[path][name]__[local]"
                  : "[hash:base64]",
              },
            },
          },
          "postcss-loader",
        ],
      },
      //处理less
      {
        test: /\.less$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                auto: true,
                localIdentName: isDev
                  ? "[path][name]__[local]"
                  : "[hash:base64]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 处理sass|scss
      {
        test: /\.(sass|scss)$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                auto: true,
                localIdentName: isDev
                  ? "[path][name]__[local]"
                  : "[hash:base64]",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      //图片资源处理
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, //小于10kb的图片转base64
          },
        },
        generator: {
          filename: "assets/images/[name].[contenthash:8].[ext]",
        },
      },
      //处理svg
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "assets/icons/[name].[contenthash:8][ext]",
        },
      },
      //处理字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash:8][ext]",
        },
      },
      //处理媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/media/[name].[contenthash:8][ext]",
        },
      },
    ],
  },
  //优化配置
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_props: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            // 生产环境特定压缩配置
            drop_console: isProd,
            drop_debugger: isProd,
            pure_funcs: isProd ? ["console.log"] : [],
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false, // 移除注释
            beautify: false, // 不美化输出
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    //代码分割配置
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        //分离vue相关库
        vue: {
          name: "chunk-vue",
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|@vue)[\\/]/,
          priority: 20,
          chunks: "all",
        },
        //ui库
        ui: {
          name: "chunk-ui",
          test: /[\\/]node_modules[\\/](element-plus|ant-design-vue|@vant)[\\/]/,
          priority: 15,
          chunks: "all",
        },
        //分离大型库
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "all",
          minSize: 100 * 1024, // 100kb
          maxSize: 250 * 1024, // 250kb
        },
        // 共用组件
        commons: {
          name: "chunk-commons",
          test: path.resolve(__dirname, "../src/components"),
          minChunks: 2, // 至少被2个入口引用
          priority: 5,
          reuseExistingChunk: true,
        },
        // 异步加载模块
        async: {
          name: "chunk-async",
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          priority: 0,
          reuseExistingChunk: true,
          minChunks: 2,
        },
      },
    },
    // 运行时代码抽离
    runtimeChunk: "single",

    // 确保启用tree shaking
    usedExports: true,
    moduleIds: isProd ? "deterministic" : "named",
    chunkIds: isProd ? "deterministic" : "named",
  },
  //插件配置
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "Vue3 Application",
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#4285f4",
      },
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeAttributeQuotes: true,
            minifyCSS: true,
            minifyJS: true,
          }
        : false,
    }),
    new DefinePlugin({
      "process.env": processEnv,
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(!isProd),
    }),

    // CSS提取（仅在生产环境启用）
    isProd &&
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/chunk-[name].[contenthash:8].css",
        ignoreOrder: true,
      }),

    // Gzip压缩（仅在生产环境启用）
    isProd &&
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // 只处理大于10kb的资源
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      }),

    // 资源清单
    isProd &&
      new WebpackManifestPlugin({
        fileName: "asset-manifest.json",
      }),
    // 模块联邦支持（如果需要的话）
    // new webpack.container.ModuleFederationPlugin({
    //   name: 'app',
    //   remotes: {},
    //   shared: {
    //     vue: { singleton: true, requiredVersion: '^3.0.0' }
    //   }
    // }),

    // 避免在生产环境打包第三方的扩展
    isProd &&
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),

    // 构建进度条
    new webpack.ProgressPlugin(),

    // 包分析（可选，通过环境变量控制是否启用）
    process.env.ANALYZE === "true" &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
  ].filter(Boolean),
  // 缓存配置
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"),
    name: `${isProd ? "prod" : "dev"}-cache`,
    compression: "gzip",
  },

  // 性能提示设置
  performance: {
    hints: isProd ? "warning" : false,
    maxEntrypointSize: 512 * 1024, // 512KB
    maxAssetSize: 512 * 1024, // 512KB
  },
};
