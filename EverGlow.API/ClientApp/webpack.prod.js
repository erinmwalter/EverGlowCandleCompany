import Dotenv from "dotenv-webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const config = (env) => {
  return merge(common, {
    mode: "production",
    //devtool: "source-map",
    plugins: [
      new Dotenv({
        path: "./.env", // Path to .env file (this is the default)
        path: `./.env.${env.ENVIRONMENT}`,
        //safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        //defaults: true,
      }),
    ],
  });
};

export default config;