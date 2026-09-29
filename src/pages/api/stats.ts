/**
 * GET /api/stats?days=30 — 최근 n일 일별 방문자/페이지뷰 + 누적치. 읽기만 한다.
 */
import type { APIRoute } from 'astro';
import {
	TOTAL_KEY,
	VIEW_TOTAL_KEY,
	counterEnabled,
	dayKey,
	demoDay,
	kstDate,
	noStore,
	num,
	recentDates,
	redis,
	viewDayKey,
} from '../../lib/counter';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const requested = Number(url.searchParams.get('days'));
	const days = Number.isFinite(requested) ? Math.min(Math.max(Math.trunc(requested), 1), 90) : 30;

	if (!counterEnabled || !redis) {
		// 로컬 dev 는 데모 데이터로 화면을 볼 수 있게, 프로덕션은 그냥 꺼진 상태로 응답.
		if (!import.meta.env.DEV) {
			return new Response(JSON.stringify({ enabled: false }), { status: 200, headers: noStore });
		}
		const series = recentDates(days).map((date) => ({ date, ...demoDay(date) }));
		return new Response(
			JSON.stringify({
				enabled: true,
				demo: true,
				today: kstDate(),
				total: series.reduce((sum, p) => sum + p.visitors, 0),
				viewsTotal: series.reduce((sum, p) => sum + p.views, 0),
				series,
			}),
			{ status: 200, headers: noStore },
		);
	}

	const dates = recentDates(days);
	const [visitors, views, totals] = await Promise.all([
		redis.mget<unknown[]>(...dates.map(dayKey)),
		redis.mget<unknown[]>(...dates.map(viewDayKey)),
		redis.mget<unknown[]>(TOTAL_KEY, VIEW_TOTAL_KEY),
	]);

	const series = dates.map((date, i) => ({
		date,
		visitors: num(visitors?.[i]),
		views: num(views?.[i]),
	}));

	return new Response(
		JSON.stringify({
			enabled: true,
			today: kstDate(),
			total: num(totals?.[0]),
			viewsTotal: num(totals?.[1]),
			series,
		}),
		{ status: 200, headers: noStore },
	);
};
