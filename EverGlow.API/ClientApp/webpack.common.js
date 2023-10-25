import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const common = {
    entry: {
      app: "./src/components/common/index.tsx",
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          resolve: {
            extensions: ['.tsx', '.ts', '.js'],
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
          }
      ],
    },
    output: {
        path: __dirname + "/dist/",
        publicPath: "/",
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
        new MiniCssExtractPlugin(),
      ],
};
export default common;