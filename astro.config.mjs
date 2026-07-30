// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: 실제 배포 도메인으로 교체 (Vercel 배포 후 도메인, 예: https://blog.healsy.io)
	//        RSS·사이트맵·canonical·og:image URL 이 이 값 기준으로 생성됨.
	site: 'https://healsy-blog.vercel.app',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			// 다크 브랜드 톤에 맞는 코드 하이라이팅
			theme: 'github-dark',
			wrap: true,
		},
	},
	fonts: [
		{
			// 영문 제목/라벨 — 기하학적이고 테크한 개성
			provider: fontProviders.google(),
			name: 'Space Grotesk',
			cssVariable: '--font-display',
			weights: [500, 600, 700],
			fallbacks: ['sans-serif'],
		},
		{
			// 코드 블록 — Vercel/Geist
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			weights: [400, 500, 600],
			fallbacks: ['monospace'],
		},
		{
			// 브랜드 라벨(Engineering / ENGINEERING BLOG) — Montserrat (OFL, 상업용 자유)
			provider: fontProviders.google(),
			name: 'Montserrat',
			cssVariable: '--font-brand',
			weights: [600, 700],
			fallbacks: ['sans-serif'],
		},
	],
});
