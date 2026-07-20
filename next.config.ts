// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的HTML書き出しを有効化
  images: {
    unoptimized: true, // サーバー不要で画像を表示するための設定
  },
  basePath: "/sakura_demo", // ★重要：GitHub Pagesのリポジトリ名「/sakura_demo」を指定
};

export default nextConfig;