# Healsy Engineering Blog

Healsy 팀 기술블로그. [Astro](https://astro.build) 기반 정적 사이트이며 Vercel 로 배포합니다.

- 글은 `src/content/blog/` 의 Markdown/MDX 파일입니다.
- **글 발행 = Git 워크플로우.** 브랜치 → PR → 리뷰 → `main` 머지 → 자동 배포.

## 새 글 쓰기

1. `src/content/blog/` 에 `내-글-슬러그.md` 파일을 만듭니다. 파일명이 URL 이 됩니다 (`/blog/내-글-슬러그/`).
2. 맨 위에 frontmatter 를 넣습니다.

```markdown
---
title: '글 제목'
description: '목록·검색·SNS 공유에 쓰이는 한 줄 요약'
pubDate: 'Jul 29 2026'
author: 'Frontend' # 또는 'Backend' / 'Android' / 이름
# updatedDate: 'Aug 01 2026'   # (선택) 수정일
# heroImage: '../../assets/thumb.jpg'  # (선택) 대표 이미지
---

본문은 여기서부터. 마크다운 그대로 쓰면 됩니다.
```

3. 로컬에서 `npm run dev` 로 확인한 뒤, 브랜치를 만들어 PR 을 올립니다.
4. 팀원 리뷰 후 `main` 에 머지하면 Vercel 이 자동 배포합니다. (PR 마다 프리뷰 URL 이 생겨 머지 전 확인 가능)

## 로컬 실행

```sh
npm install       # 최초 1회
npm run dev       # http://localhost:4321
npm run build     # 프로덕션 빌드 → ./dist/
npm run preview   # 빌드 결과 로컬 미리보기
```

## 브랜딩 / 커스터마이징

| 무엇을 | 어디서 |
| :-- | :-- |
| 사이트 제목·설명, 링크 | `src/consts.ts` |
| 색상 (브랜드 오렌지 · 다크 팔레트) | `src/styles/global.css` 의 `:root` |
| 로고 | `src/components/Logo.astro` |
| 헤더 / 푸터 | `src/components/Header.astro` · `Footer.astro` |
| 코드 하이라이팅 테마 | `astro.config.mjs` 의 `shikiConfig.theme` |

색 팔레트는 키오스크 앱 `design-system` 및 healsy-report 홈과 톤앤매너를 맞췄습니다 (블랙 배경 + `#FF7A00` 오렌지 + near-white 텍스트).

## 댓글 (giscus)

GitHub Discussions 기반의 무료 댓글. 기본은 **꺼져 있습니다**. 켜려면:

1. 이 블로그 저장소를 **public** 으로 두고 **Discussions** 를 켭니다.
2. [giscus 앱](https://github.com/apps/giscus)을 저장소에 설치합니다.
3. [giscus.app](https://giscus.app) 에서 저장소를 입력해 `repoId` / `categoryId` 를 받습니다.
4. `src/consts.ts` 의 `GISCUS` 에 값을 채우고 `enabled: true` 로 바꿉니다.

## 배포 (Vercel)

1. 이 폴더를 GitHub 저장소로 올립니다.
2. Vercel 에서 **New Project → 저장소 선택**. 프레임워크는 Astro 로 자동 인식됩니다.
3. 배포 후 나온 도메인(또는 커스텀 도메인)을 `astro.config.mjs` 의 `site` 에 반영합니다. (RSS·사이트맵·OG 이미지 URL 이 이 값 기준으로 생성됨)

> 참고: Vercel **무료(Hobby) 플랜은 상업적 사용이 제한**됩니다. 회사 블로그는 Pro/Enterprise(현재 회사 팀) 로 배포하세요.

---

기반 테마: [Bear Blog](https://github.com/HermanMartinus/bearblog/) / [Astro Blog starter](https://github.com/withastro/astro/tree/main/examples/blog).
