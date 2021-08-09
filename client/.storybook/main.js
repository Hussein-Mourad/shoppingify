const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../src/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  // webpackFinal: async (config) => {
  //   config.resolve.alias['~'] = path.resolve(__dirname, '../src/');
  //   // config.resolve.alias['components'] = path.resolve(__dirname, '../src/components')
  //   config.resolve.alias['public'] = path.resolve(__dirname, '../public/')
  //   return config;
  // },

  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },

  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\,css&/,
  //     use: [
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           ident: 'postcss',
  //           plugins: [
  //             require('tailwindcss'),
  //             require('autoprefixer'),
  //             require('cssnano')
  //           ]
  //         }
  //       }
  //     ],
  //     include: path.resolve(__dirname, '../'),
  //   })
  //   return config
  // }
};
