# huozhiyan · 作品集

用 Astro 搭的作品集站。极简编辑风 + 终端点缀，纯静态，部署在 GitHub Pages。

线上地址：<https://huozhiyan.github.io/>

---

## 本地跑起来

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # 产物在 dist/
pnpm preview    # 本地预览构建产物
```

## 加一个新作品（3 步，5 分钟）

1. 新建 `src/content/works/<slug>.md`，slug 会变成 URL：`/works/<slug>/`
2. 把封面截图放进 `public/shots/`（建议 1440×640，WebP）
3. commit & push，GitHub Actions 自动构建上线

front-matter 字段：

```yaml
---
title: 作品名                 # 必填
latin: 英文名                 # 可选，卡片上小字
tagline: 一句话说清它是什么     # 必填，卡片主文案
summary: 稍长一点的介绍         # 必填，用于 SEO / meta description
date: 2026-11-01              # 必填，上线时间
status: 已上线                # 已上线 / 实验中 / 已归档
live: https://...             # 在线地址（可选）
repo: https://github.com/...  # 源码（可选）
stack: ['Vue 3', 'Vite']      # 技术栈
tags: ['效率工具']             # 分类标签
cover: film                   # 卡片封面样式：film | idphoto
screenshot: /shots/xxx.webp   # 详情页截图，路径以 / 开头，相对 public/
screenshotNote: 一句图注        # 可选
order: 3                      # 数字越大越靠前
---
```

正文用 Markdown 写，建议按这个结构（详情页的排版就是照这个设计的）：

```
## 它解决什么
## 现在能做什么
## 怎么做的      ← 可以放 ``` 代码块，会渲染成终端样式
## 踩过的坑
## 下一步
```

## 部署

推送到 `main` 分支即可。首次部署需要在仓库里设一次：

**Settings → Pages → Source → 选 "GitHub Actions"**

### 换一个仓库地址

- 部署在 `huozhiyan.github.io`（根路径）：现在就是，`astro.config.mjs` 里 `base` 保持 `'/'`
- 部署在 `huozhiyan.github.io/works` 这类子路径：把 `base` 改成 `'/works'`，并且把 `site` 改成 `https://huozhiyan.github.io`

## 目录结构

```
src/
  content/works/*.md      ← 作品数据，加新作品只动这里
  components/
    CoverArt.astro        ← 卡片封面（手绘 SVG，不依赖图片）
    WorkCard.astro        ← 作品卡片
    Header.astro / Footer.astro
  layouts/Base.astro      ← 全站 head、主题、OG 标签
  pages/
    index.astro           ← 首页（Hero / 作品 / 偏好 / 日志）
    works/[slug].astro    ← 作品详情模板
    about.astro
    404.astro
  styles/global.css       ← 设计变量（改配色只改这一个文件顶部）
```

## 改配色

`src/styles/global.css` 顶部的 CSS 变量：`--paper` `--ink` `--accent` `--line`。
深色模式在 `:root[data-theme='dark']` 和 `prefers-color-scheme` 两处，改的时候两边都要动。

## 待办

- [ ] 详情页里「怎么做的 / 踩过的坑」是按两个项目的 README 和代码推断写的初稿，**建议换成你真实的过程**（这是全站最值得写的地方）
- [ ] 如果要挂自定义域名，加 `CNAME` 文件到 `public/`
- [x] OG 分享图 `public/og.png`（1200×630，已接入 `og:image`）

## 关于仓库

这个仓库原来放的是 2024 年的一个笔记页面（`前端杂货铺_CSDN`），已经整体替换成本站点。
旧内容保留在 `legacy` 分支，需要的话：`git checkout legacy`。
