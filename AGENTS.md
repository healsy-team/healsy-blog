# CLAUDE.md

Healsy Engineering — 발 건강 헬스케어 플랫폼 **Healsy** 의 기술블로그. Astro + MDX 정적 사이트, Vercel 배포.
(이 파일은 `AGENTS.md` 이며 `CLAUDE.md` 가 여기로 심링크되어 있다 — 한 곳만 고치면 된다.)

## 정체성 (중요)

- **회사 = 월터워커(Walter Walker)** — 프랑스 프리미엄 인솔 브랜드 **시다스(Sidas)** 의 한국 공식 수입원.
- **Healsy** = 월터워커가 만드는 발 건강/헬스케어 **플랫폼**. 이 블로그는 그 개발팀(Healsy Engineering)의 기록이다.
- 우리는 **AX 팀** — AI 를 개발에 적극 도입해 생산성을 높이고, 사람이 **하네스(harness)로 검수**하는 방식으로 일한다.
- ⚠️ "우리 회사" 같은 밋밋한 표현 대신 "월터워커", "월터워커 & 시다스" 처럼 구체적인 워딩을 쓴다.

## 글·콘텐츠 방향

- 지엽적 기술 트릭(raw 데이터 정규화·카메라 좌표·JSON 파싱 요령 등)이 **아니라**, "발 건강을 소프트웨어로 어떻게 푸는가", "깔창 회사가 AI 를 어떻게 도입하는가" 같은 **문제 중심** 이야기를 다룬다.
- 말투는 자연스럽고 딱딱하지 않게 (`~예요` / `~어요` 섞기). 제품(인솔·발 건강)과 기술을 엮는다.
- 나열할 때 가운뎃점(`·`)을 남발하지 말고 **개행/리스트**로 깔끔하게 정리한다.
- **문장부호를 아낀다.** em dash(`—`)로 여러 절을 잇지 말고, 문장을 짧게 끊어 문단·개행(`<br>`)으로 나눈다. 한 문단이 3줄을 넘기면 쪼갤 수 있는지 본다.

## 디자인 / 브랜딩

- 다크 테마: 배경 `#060606`, 브랜드 오렌지 `#FF7A00`, near-white 텍스트. (healsy-report·키오스크 톤 통일)
- 폰트 — **Space Grotesk**(영문 제목/라벨) · **Pretendard**(본문 한/영, CDN) · **Geist Mono**(라벨·코드). → `src/styles/global.css`, `astro.config.mjs`
- 로고는 SVG (`src/components/Logo.astro`) — 유지한다.
- ⚠️ **사진/일러스트("그림")는 넣지 않는다.** 텍스트 + 로고 중심. (GitHub 아바타 같은 정보성 이미지는 예외)

## 링크 정책 (중요)

링크는 `src/consts.ts` 에서 관리한다. **아래 유효 링크만 사용:**

| 용도 | URL |
| :-- | :-- |
| 월터워커(회사) | `https://walterwalker.kr/` |
| 측정 리포트 | `https://report.healsy.io/` |
| 시다스 인솔 스토어 | `https://smartstore.naver.com/walterwalker` |
| 채용 (원티드) | `https://www.wanted.co.kr/company/17877` |

⛔ **쓰면 안 되는 링크:**

- `github.com/healsy` — 우리 팀 조직이 아님
- `healsy.io` — 존재하지 않는 사이트

## 사실관계 (About)

- 시다스: 1975년~, 발 건강 전문 글로벌 No.1 인솔. 50개국 1.5만 매장, 매일 150만 명 사용, 5개 국제 어워드 · 15건 특허. 맨시티·리버풀 선수 착용, 국내 SSG 랜더스·수원 삼성·LX 사이클팀 지정 인솔.
- 월터워커 오프라인: **전국 11개 직영점**(일원·논현·여의도/더현대서울·판교·남양주/스페이스원·송도·고양·수원·하남·운정·안성). 매장 변동 시 [store.php](https://walterwalker.kr/shop/store.php) 확인 후 갱신.

## 글 쓰기

`src/content/blog/*.md`(또는 `.mdx`). frontmatter:

```
---
title: '제목'
description: '한 줄 요약 (목록·검색·공유용)'
pubDate: 'Aug 05 2026'
author: 'Frontend' # 또는 Backend / 이름
---
```

발행 = 브랜치 → PR → 동료 리뷰 → `main` 머지 → Vercel 자동 배포. (heroImage 등 이미지 필드는 위 "그림 없음" 원칙에 따라 쓰지 않는다.)

## Contributors

About 페이지가 **GitHub API 를 빌드타임에 fetch** 해 프로필 카드를 렌더한다. 팀원 추가는 `src/consts.ts` 의 `GITHUB_CONTRIBUTORS` 배열에 GitHub 아이디만 넣으면 된다. (현재 `Arc-Jung`, `corgi93`) — 비인증 호출이라 rate limit 60/hr, 실패 시 기본 아바타로 폴백.

## SEO

- 메타 · Open Graph · Twitter · JSON-LD 는 `src/components/BaseHead.astro` 에서 일괄 관리한다. 모든 페이지는 `<BaseHead>` 를 거친다. 글은 `type="article"` + `publishedDate` + `author` 를 넘긴다.
- OG 이미지: `public/og-image.png`(로고 기반). `public/robots.txt` + `@astrojs/sitemap` 사용.
- ⚠️ `astro.config.mjs` 의 `site` 가 배포 도메인의 source of truth (canonical·sitemap·OG URL 이 여기서 생성됨). **배포 도메인이 정해지면 반드시 교체하고 `robots.txt` 의 Sitemap URL 도 함께 수정.**

## 빌드 & 검증

```bash
npm run dev      # http://localhost:4321
npm run build    # 정적 빌드 — 기본 검증 수단
```

CLI 로 dev 서버를 직접 띄울 땐 background 모드를 쓴다: `astro dev --background` (관리: `astro dev stop` / `status` / `logs`). 문서: https://docs.astro.build

## npm 주의

`~/.npm` 캐시에 과거 버그로 root 소유 파일이 있으면 `npm install` 이 EACCES 로 실패한다. `npm install --cache <임시경로>` 로 우회하거나, 한 번 `sudo chown -R 501:20 ~/.npm` 로 근본 해결.
