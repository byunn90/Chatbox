const path = require("path");

module.exports = {
  // Your other configuration settings...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Other rules...
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  // Your other configuration settings...
};
