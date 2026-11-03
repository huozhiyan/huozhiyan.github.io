import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署在 username.github.io（根路径）时 base 保持 '/'
// 如果换成一个普通仓库（username.github.io/works），改成 '/works'
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: 'https://huozhiyan.github.io',
  base,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
