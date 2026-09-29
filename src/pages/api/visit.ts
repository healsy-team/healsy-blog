/**
 * POST /api/visit — 방문 1건 기록하고 오늘/전체 방문자 수를 돌려준다.
 *
 * 하루에 같은 사람이 여러 번 와도 방문자는 1로 세고(지문 SET 으로 중복 제거),
 * 페이지뷰는 매번 올린다. 봇은 세지 않고 현재 값만 읽어서 돌려준다.
 */
import type { APIRoute } from 'astro';
import {
	TOTAL_KEY,
	VIEW_TOTAL_KEY,
	SEEN_TTL,
	counterEnabled,
	dayKey,
	demoDay,
	fingerprint,
	isBot,
	kstDate,
	noStore,
	num,
	recentDates,
	redis,
	seenKey,
	viewDayKey,
} from '../../lib/counter';

export const prerender = false;

const handle: APIRoute = async ({ request, clientAddress }) => {
	if (!counterEnabled || !redis) {
		if (!import.meta.env.DEV) {
			return new Response(JSON.stringify({ enabled: false }), { status: 200, headers: noStore });
		}
		const date = kstDate();
		return new Response(
			JSON.stringify({
				enabled: true,
				demo: true,
				date,
				today: demoDay(date).visitors,
				// /stats 의 데모 누적치와 같은 방식으로 맞춘다 (푸터에 0 이 뜨지 않게).
				total: recentDates(90).reduce((sum, d) => sum + demoDay(d).visitors, 0),
			}),
			{ status: 200, headers: noStore },
		);
	}

	const date = kstDate();
	const ua = request.headers.get('user-agent') ?? '';

	// 봇: 쓰지 않고 읽기만.
	if (isBot(ua)) {
		const [today, total] = await redis.mget<unknown[]>(dayKey(date), TOTAL_KEY);
		return new Response(
			JSON.stringify({ enabled: true, counted: false, today: num(today), total: num(total) }),
			{ status: 200, headers: noStore },
		);
	}

	let ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
	if (!ip) {
		try {
			ip = clientAddress;
		} catch {
			ip = 'unknown';
		}
	}

	const fp = await fingerprint(ip, ua, date);
	const isNewVisitor = (await redis.sadd(seenKey(date), fp)) === 1;

	const pipe = redis.pipeline();
	pipe.incr(viewDayKey(date));
	pipe.incr(VIEW_TOTAL_KEY);
	if (isNewVisitor) {
		pipe.expire(seenKey(date), SEEN_TTL);
		pipe.incr(dayKey(date));
		pipe.incr(TOTAL_KEY);
	} else {
		pipe.get(dayKey(date));
		pipe.get(TOTAL_KEY);
	}
	const res = (await pipe.exec()) as unknown[];
	const offset = isNewVisitor ? 3 : 2;

	return new Response(
		JSON.stringify({
			enabled: true,
			counted: isNewVisitor,
			date,
			today: num(res[offset]),
			total: num(res[offset + 1]),
			views: { today: num(res[0]), total: num(res[1]) },
		}),
		{ status: 200, headers: noStore },
	);
};

export const POST = handle;
export const GET = handle;
