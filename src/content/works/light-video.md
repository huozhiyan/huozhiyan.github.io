---
title: LightVideo
latin: LightVideo
tagline: 在浏览器里转码、压图、剪片，文件一次都不离开本机。
summary: 一个不用上传就能用的视频 / 图片处理台，替掉那些"先注册、再上传、然后排队"的在线工具。
date: 2026-05-26
status: 已上线
live: https://huozhiyan.github.io/light-video/
repo: https://github.com/huozhiyan/light-video
stack: ['React 19', 'TypeScript', 'Vite 5', 'Tailwind CSS 4', 'Zustand', 'FFmpeg.wasm']
tags: ['视频处理', '图片压缩', '纯本地']
cover: film
screenshot: /shots/light-video.webp
screenshotNote: 打开就是一个拖拽区，没有任何注册与引导。
order: 1
---

## 它解决什么

处理一个 20MB 的视频，最省事的办法居然是打开一个在线工具、注册、上传、等待转码、再下载。文件要在一台陌生服务器上停留几分钟，而你只是想把它的分辨率调小一点。

LightVideo 的判断是：**这件事本来就不需要服务器**。现代浏览器的 WebAssembly 已经能跑完整的 FFmpeg，那把它塞进 Worker 里，就是一个随开随用、断网也能用的转码台。

## 现在能做什么

- **图片**：JPG / PNG / WebP / AVIF 互转，调质量、调分辨率，前后拖拽对比效果
- **视频**：MP4 / WebM / MOV / AVI / MKV 等格式互转
- **预设**：Web Ready、Max Crush、视频转 GIF、抽取音轨，四个一键组合
- **批量**：多文件一起跑，可以单个下载，也可以打包成 ZIP
- **界面**：深色 / 浅色两套主题，中英文完整切换

## 怎么做的

整个应用的骨架其实很朴素：一个文件进入队列，一个任务描述它要变成什么，然后交给 Worker。真正花时间的是那条队列。

```bash
# 一次处理的抽象大概长这样
file ──▶ probe (时长/编码/尺寸) ──▶ task { preset, format, quality }
                                       │
                    ┌──────────────────┴──────────────────┐
                 image                                video
        browser-image-compression              ffmpeg.wasm (Worker)
                    └──────────────────┬──────────────────┘
                                  result ──▶ 预览 / ZIP
```

**为什么 FFmpeg 一定要在 Worker 里。** 转码是纯 CPU 密集型任务，放在主线程上，转一个视频能让整个页面卡到点不动。把 FFmpeg 的实例放进 Worker，再用 Comlink 把 `postMessage` 包成普通的 async 函数调用，主线程就只剩更新进度条。

**为什么前端也要管预检。** 用户拖进来一个 4K 视频，大概率是手机拍的、竖屏、HEVC 编码。直接丢给 FFmpeg 大概率会失败或者慢到离谱。所以进队列之前先用 `exifr` 和浏览器自带的元数据接口读一遍，把朝向、编码、时长、体积都摸清楚，再决定用哪条处理路径。

## 踩过的坑

**2GB 的上限不是随便定的。** FFmpeg.wasm 把整个文件读进 wasm 的堆内存，一个文件进来基本等于占掉三到四倍体积的内存。真拿去跑大文件，页面会先被浏览器自己干掉，而不是报一个体面的错误。所以入口处直接拦住，并且把"最大 2GB"写在拖拽区上——说清楚边界，比假装没有边界要好。

**进度条是最容易骗人的地方。** 一开始直接拿 FFmpeg 的 progress 回调渲染，结果它在不同编码下频率差得离谱，进度条一会儿跳 40%，一会儿卡住三十秒。后来改成按已处理时长占总时长的比例算，再给 UI 加一个最小步进，才看起来像在正常工作。

**AVIF 编码在 Safari 上是薛定谔的。** 同一份代码，Chrome 里一切正常，Safari 里要么很慢要么直接报不支持。最后是运行时探测一下 `canvas.toBlob('image/avif')` 是否真的产出 AVIF，不支持就把这个格式从选项里藏起来。

## 下一步

- 队列持久化：关掉页面再回来，任务还在
- 简单的裁切与拼接，把"视频处理"补完整
