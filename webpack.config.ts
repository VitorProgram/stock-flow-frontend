import path from "path";
import { webpack } from "next/dist/compiled/webpack/webpack";

const config: webpack.Configuration = {
  mode: "development",
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".webpack-cache"), // Define onde armazenar o cache
    store: "pack", // Reduz serialização de strings grandes
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
