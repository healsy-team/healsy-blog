// 사이트 전역 상수. 어디서든 `import` 로 가져다 쓴다.

export const SITE_TITLE = 'Healsy Engineering';
export const SITE_DESCRIPTION =
	'Healsy 팀이 제품을 만들며 배운 것들 — 프론트엔드 · 백엔드 · 모바일 · ML 개발 경험을 기록합니다.';

// 헤더/푸터의 회사 링크
export const WALTERWALKER_URL = 'https://walterwalker.kr/'; // 월터워커 — 회사(시다스 한국 공식 수입원)
export const SIDAS_STORE_URL = 'https://smartstore.naver.com/walterwalker'; // Sidas 인솔 — 월터워커 스마트스토어
export const REPORT_URL = 'https://report.healsy.io/'; // 측정 리포트 웹
export const WANTED_URL = 'https://www.wanted.co.kr/company/17877'; // 채용 — 원티드

// About 페이지에서 GitHub API 로 프로필을 불러올 기여자들 (github 아이디)
export const GITHUB_CONTRIBUTORS = ['Arc-Jung', 'corgi93'];

/**
 * giscus 댓글 설정 (https://giscus.app 에서 값 생성).
 *
 * 사용법:
 * 1. 블로그를 올릴 GitHub 저장소를 public 으로 만들고 Discussions 를 켠다.
 * 2. https://github.com/apps/giscus 에서 giscus 앱을 그 저장소에 설치한다.
 * 3. https://giscus.app 에 저장소를 입력해 repo/repoId/category/categoryId 를 받아 아래에 채운다.
 * 4. enabled 를 true 로 바꾼다.
 */
export const GISCUS = {
	enabled: false,
	repo: 'healsy/healsy-blog', // 예: 'healsy/healsy-blog'
	repoId: '', // giscus.app 이 알려주는 값
	category: 'Comments',
	categoryId: '', // giscus.app 이 알려주는 값
	mapping: 'pathname',
	reactionsEnabled: '1',
	// 다크 브랜드 톤에 맞는 테마
	theme: 'dark_dimmed',
	lang: 'ko',
} as const;
