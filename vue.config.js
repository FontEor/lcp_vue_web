/* eslint-disable no-param-reassign */
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const resolve = (dir) => path.join(__dirname, dir);
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const os = require("os");

let [currentCommand] = process.env.npm_lifecycle_event.split(":").slice(-1);
[currentCommand] = currentCommand.split("-").slice(0);
console.log("currentCommand", currentCommand);

const pagesHashMap = {
  national: {
    index: {
      entry: "pages/national/main.ts",
      template: "pages/national/index.html",
      filename: "index.html",
    },
  },
  international: {
    index: {
      entry: "pages/international/main.ts",
      template: "pages/international/index.html",
      filename: "index.html",
    },
  },
  download: {
    index: {
      entry: "pages/download/main.ts",
      template: "pages/download/index.html",
      filename: "index.html",
    },
  },
};

const pages = pagesHashMap[currentCommand] || pagesHashMap.national;
module.exports = {
  pages,
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir:
    currentCommand === "download"
      ? "dist/download"
      : currentCommand === "international"
      ? "dist/international"
      : "dist/lcp_vue_web",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  runtimeCompiler: false, // 关键点在这
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    config.resolve.alias
      .set("public", resolve("public"))
      .set("pages", resolve("pages"));

    config.plugin("fork-ts-checker").tap((args) => {
      let totalmem = Math.floor(os.totalmem() / 1024 / 1024); //get OS mem size
      let allowUseMem = totalmem > 2048 ? 2048 : 1024;
      // in vue-cli should args[0]['typescript'].memoryLimit
      args[0]["typescript"].memoryLimit = allowUseMem;
      return args;
    });

    // config.optimization.splitChunks({
    //   chunks: "all",
    //   cacheGroups: {
    //     libs: {
    //       name: "chunk-libs",
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: 10,
    //       chunks: "initial", // only package third parties that are initially dependent,
    //       minSize: 0,
    //       maxSize: 1024 * 1024,
    //     },
    //     // elementUI: {
    //     //   name: "chunk-elementUI", // split elementUI into a single package
    //     //   priority: 1, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //     //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
    //     //   minSize: 0,
    //     //   maxSize: 1024 * 1024
    //     // },
    //     LUI: {
    //       name: "chunk-LUI", // split elementUI into a single package
    //       priority: 1, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //       test: /[\\/]node_modules[\\/]@lui[\\/]lui-ui/, // in order to adapt to cnpm
    //       minSize: 0,
    //       maxSize: 1024 * 1024,
    //     },
    //     commons: {
    //       name: "chunk-commons",
    //       test: resolve("src/components"), // can customize your rules
    //       minChunks: 3, //  minimum common number
    //       priority: 5,
    //       reuseExistingChunk: true,
    //       minSize: 0,
    //       maxSize: 1024 * 1024,
    //     },
    //     // UmyUI: {
    //     //   name: "chunk-UmyUI", // split elementUI into a single package
    //     //   priority: 15, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //     //   test: /[\\/]node_modules[\\/]umy-ui/, // in order to adapt to cnpm
    //     //   minSize: 0,
    //     //   maxSize: 1024 * 1024,
    //     // },
    //   },
    // });
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode:
          // process.env.NODE_ENV === "development" ? "disabled" : "static",
          "disabled",
      }),
    ],
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    optimization: {
      minimize: process.env.NODE_ENV === "production",
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.debug"],
            },
          },
        }),
      ],
    },
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, // 注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      // "/lcp-rest/mock": {
      //   target: "http://11.51.194.248:3000",
      //   changeOrigin: true,
      //   pathRewrite: { "/lcp-rest": "" },
      // },
      "/lcp-rest": {
        target: "http://lcp-server-rest-devtest.jdl-wly.svc.wlzyxtest.n.jd.local",
        changeOrigin: true,
        pathRewrite: { "/lcp-rest": "" },
      },
    },
  },
  // 第三方插件配置
  pluginOptions: {},
};
