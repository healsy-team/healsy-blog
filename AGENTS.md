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

## 방문자 통계

두 갈래로 본다.

**1. Vercel Web Analytics** — 유입경로 · 인기 글 · 기기 같은 상세 지표.
`astro.config.mjs` 의 `vercel({ webAnalytics: { enabled: true } })` 가 스크립트를 주입한다.
⚠️ **Vercel 대시보드에서 프로젝트 → Analytics 를 직접 켜야** 집계가 시작된다. 코드만으론 안 된다.

**2. 자체 카운터** — 블로그에 노출되는 "오늘 / 전체 방문자".
푸터 뱃지([Visitors.astro](src/components/Visitors.astro)) → 클릭하면 [/stats](src/pages/stats.astro) 로 간다.

| 파일 | 역할 |
| :-- | :-- |
| `src/lib/counter.ts` | Redis 키 설계 · KST 날짜 · 지문 해싱 · 봇 판별 |
| `src/pages/api/visit.ts` | POST 로 방문 1건 기록 → 오늘/전체 반환 |
| `src/pages/api/stats.ts` | 최근 n일(최대 90) 일별 방문자·페이지뷰 |

집계 규칙:

- 하루는 **KST 기준**으로 자른다. (UTC 로 자르면 한국 새벽 트래픽이 전날로 붙는다)
- 같은 사람이 하루에 여러 번 와도 **방문자는 1**, 페이지뷰는 매번 +1.
- 중복 판별은 `IP + UA + 날짜 + salt` 의 SHA-256 해시. **IP 원본은 저장하지 않고**, 날짜가 섞여 있어 하루 지나면 같은 사람도 다른 값이 된다.
- 검색엔진·프리뷰 봇은 UA 로 걸러 집계에서 뺀다. `robots.txt` 에서도 `/api/` 를 막아뒀다.

### 환경변수 (Vercel)

Upstash Redis 스토어를 하나 만들고 아래를 넣는다. Vercel 의 Upstash 통합을 쓰면 `KV_*` 로, Upstash 콘솔에서 직접 만들면 `UPSTASH_*` 로 들어오는데 **둘 다 읽는다.**

```
UPSTASH_REDIS_REST_URL=...      # 또는 KV_REST_API_URL
UPSTASH_REDIS_REST_TOKEN=...    # 또는 KV_REST_API_TOKEN
COUNTER_SALT=아무_긴_문자열       # 선택. 없으면 기본값 사용
```

환경변수가 없으면 — **프로덕션**은 `enabled: false` 로 응답하고 뱃지·차트를 조용히 숨긴다.
**로컬 dev** 는 `counter.ts` 의 `demoDay()` 가 만든 데모 데이터를 보여준다 (`import.meta.env.DEV` 로만 열림).

### 손볼 때 주의

- **Astro 어댑터가 붙었다.** 페이지는 그대로 정적이고, `prerender = false` 를 선언한 `/api/*` 만 서버리스로 돈다. `output: 'static'` 을 바꾸면 전체가 SSR 로 넘어간다.
- **`<style>` 스코프 함정** — Astro 의 scoped style 은 빌드 때 요소에 붙는 속성으로 동작한다. JS 가 `innerHTML` 로 만든 막대·눈금·표 행에는 그 속성이 없어서 스코프 규칙이 **적용되지 않는다.** 그래서 stats 페이지는 그 규칙들만 `<style is:global>` 에 두고 `.stats-chart` / `.stats-table` 루트로 범위를 좁혔다.
- **차트 색은 검증을 통과한 값이다.** `--chart-1` 은 라이트 `#d95e00` · 다크 `#e07000` (`src/styles/global.css`). 다크는 밝기 밴드가 달라서 브랜드 오렌지 `#FF7A00` 을 그대로 쓰면 밴드를 벗어난다. 표면색이나 이 값을 바꿀 땐 `dataviz` skill 의 `validate_palette.js` 로 다시 검증한다.
- POST `/api/visit` 은 Astro 의 CSRF 검사(`security.checkOrigin`)를 지난다. 브라우저는 same-origin POST 에도 `Origin` 을 붙이므로 통과하고, 혹시 막히면 클라이언트가 GET 으로 한 번 더 시도한다.

## 빌드 & 검증

```bash
npm run dev      # http://localhost:4321
npm run build    # 정적 빌드 — 기본 검증 수단
```

CLI 로 dev 서버를 직접 띄울 땐 background 모드를 쓴다: `astro dev --background` (관리: `astro dev stop` / `status` / `logs`). 문서: https://docs.astro.build

## npm 주의

`~/.npm` 캐시에 과거 버그로 root 소유 파일이 있으면 `npm install` 이 EACCES 로 실패한다. `npm install --cache <임시경로>` 로 우회하거나, 한 번 `sudo chown -R 501:20 ~/.npm` 로 근본 해결.
