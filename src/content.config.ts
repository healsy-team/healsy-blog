import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 글쓴이 (예: 'Frontend', 'Android', 홍길동)
			author: z.string().optional(),
			// 글쓴이 GitHub 아이디 (있으면 글 하단에 프로필 카드 + 프로필 링크)
			authorGithub: z.string().optional(),
		}),
});

export const collections = { blog };
