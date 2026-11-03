import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    /** 英文名 / 副标题，卡片上小字显示 */
    latin: z.string().optional(),
    tagline: z.string(),
    /** 一句话：解决谁的什么问题 */
    summary: z.string(),
    date: z.coerce.date(),
    status: z.enum(['已上线', '实验中', '已归档']),
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    cover: z.enum(['film', 'idphoto']),
    screenshot: z.string().optional(),
    screenshotNote: z.string().optional(),
    /** 排序：数字越大越靠前 */
    order: z.number().default(0),
  }),
});

export const collections = { works };
