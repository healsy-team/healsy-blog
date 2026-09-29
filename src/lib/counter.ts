/**
 * 방문자 카운터 — Upstash Redis(REST) 기반.
 *
 * 저장 키
 *   v:total          누적 방문자 (일별 유니크의 합)
 *   v:day:<날짜>     그날 유니크 방문자
 *   v:seen:<날짜>    그날 이미 센 방문자 지문 SET (TTL 48h)
 *   pv:total         누적 페이지뷰
 *   pv:day:<날짜>    그날 페이지뷰
 *
 * 날짜는 항상 KST(Asia/Seoul) 기준. UTC 기준으로 자르면 한국 새벽 트래픽이 전날로 붙는다.
 * 지문은 (IP + UA + 날짜 + salt) 를 SHA-256 해싱한 값이라 IP 원본은 어디에도 남지 않고,
 * 날짜가 섞여 있어 하루 지나면 같은 사람도 다른 값이 된다.
 */
import { Redis } from '@upstash/redis';

// Vercel 의 Upstash 통합은 KV_* 로, Upstash 콘솔에서 직접 만들면 UPSTASH_* 로 환경변수가 들어온다.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

/** 환경변수가 없으면(로컬 dev 등) 카운터를 조용히 끈다. */
export const counterEnabled = Boolean(url && token);

export const redis = counterEnabled ? new Redis({ url: url!, token: token! }) : null;

const SALT = process.env.COUNTER_SALT ?? 'healsy-blog';
const SEEN_TTL = 60 * 60 * 48; // 48시간

/** Date → KST 기준 'YYYY-MM-DD'. */
export function kstDate(date: Date = new Date()): string {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(date);
	const at = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
	return `${at('year')}-${at('month')}-${at('day')}`;
}

/** 오늘부터 거꾸로 n일치 날짜 배열 (오래된 날 → 오늘). */
export function recentDates(n: number): string[] {
	const now = Date.now();
	return Array.from({ length: n }, (_, i) => kstDate(new Date(now - (n - 1 - i) * 86400000)));
}

/** 검색엔진·프리뷰 봇은 방문자로 세지 않는다. */
export function isBot(ua: string): boolean {
	return /bot|crawler|spider|crawl|slurp|headless|lighthouse|preview|facebookexternalhit|monitor|curl|wget|python-requests/i.test(
		ua,
	);
}

/** IP + UA + 날짜 + salt → 되돌릴 수 없는 짧은 지문. */
export async function fingerprint(ip: string, ua: string, date: string): Promise<string> {
	const buf = new TextEncoder().encode(`${ip}|${ua}|${date}|${SALT}`);
	const digest = await crypto.subtle.digest('SHA-256', buf);
	return Array.from(new Uint8Array(digest).slice(0, 12))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

export const seenKey = (date: string) => `v:seen:${date}`;
export const dayKey = (date: string) => `v:day:${date}`;
export const viewDayKey = (date: string) => `pv:day:${date}`;
export const TOTAL_KEY = 'v:total';
export const VIEW_TOTAL_KEY = 'pv:total';
export { SEEN_TTL };

/** Redis 가 돌려주는 값(숫자·문자열·null)을 숫자로 정리. */
export function num(value: unknown): number {
	if (typeof value === 'number') return value;
	if (typeof value === 'string') {
		const n = Number(value);
		return Number.isFinite(n) ? n : 0;
	}
	return 0;
}

export const noStore = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, max-age=0',
};

/**
 * 로컬 dev 전용 데모 데이터.
 *
 * Upstash 환경변수 없이 `npm run dev` 만 띄워도 /stats 화면을 볼 수 있게 만든 가짜 값이다.
 * `import.meta.env.DEV` 로만 열리므로 프로덕션에서는 절대 나오지 않는다 (환경변수가 없으면
 * 프로덕션은 그냥 `enabled: false` 로 응답하고 화면은 카운터를 숨긴다).
 * 날짜 문자열에서 값을 만들어내므로 새로고침해도 숫자가 튀지 않는다.
 */
export function demoDay(date: string): { visitors: number; views: number } {
	let h = 0;
	for (const ch of date) h = (h * 31 + ch.charCodeAt(0)) % 100000;
	const visitors = 4 + (h % 23);
	return { visitors, views: visitors * (2 + (h % 3)) + (h % 5) };
}
