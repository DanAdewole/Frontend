const path = require("path");

module.exports = {
  entry: {
    firebase: './firebase.js',
    profile: './profile.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // mode: {
  //   type: "production",
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
//   resolve: {
//     fallback: {
//       fs: false,
//       path: require.resolve("path-browserify"),
//       // Other polyfills for node.js core modules as needed
//     },
//   },
};
