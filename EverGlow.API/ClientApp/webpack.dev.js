import Dotenv from "dotenv-webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const config = merge(common, {
    mode: "development",
    // devtool: "source-map",
    output: {
      //publicPath: "/",
    },
    devServer: {
      port: 6955,
      open: true,
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://localhost:7035",
          secure: false,
          changeOrigin: true,
        }
      },
      server: {
        type: "http",
      },
    },
    plugins: [
        new Dotenv({
          path: "./.env", // Path to .env file (this is the default)
          //safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
          //defaults: true,
        }),
      ],
  });
  export default config;