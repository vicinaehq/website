import { NextResponse } from 'next/server'
import { getLatestReleaseTag, GITHUB_RAW_URL } from '@/lib/github'

// The script content is fetched per-tag (immutable), so it can be cached
// long; only the tag lookup and the CDN response need to stay fresh.
const SCRIPT_CACHE_DURATION = 3600;

export async function GET() {
	try {
		const tag = await getLatestReleaseTag()

		if (!tag) {
			console.error('Failed to resolve latest release tag')
			return new NextResponse('Install script not found', {
				status: 404,
				headers: {
					'Content-Type': 'text/plain',
				},
			})
		}

		const res = await fetch(
			`${GITHUB_RAW_URL}/refs/tags/${tag}/scripts/install.sh`,
			{
				headers: {
					'User-Agent': 'Vicinae-Proxy/1.0',
				},
				next: { revalidate: SCRIPT_CACHE_DURATION },
			},
		)

		if (!res.ok) {
			console.error(
				`Failed to fetch install script at ${tag}: ${res.status} ${res.statusText}`,
			)
			return new NextResponse('Install script not found', {
				status: 404,
				headers: {
					'Content-Type': 'text/plain',
				},
			})
		}

		const text = await res.text()

		return new NextResponse(text, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'public, max-age=60, s-maxage=60',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY',
			},
		})
	} catch (error) {
		console.error('Error fetching install script:', error)
		return new NextResponse('Internal server error', {
			status: 500,
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}
}
