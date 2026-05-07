"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const API_BASE = "https://api.vicinae.com";

type Granularity = "daily" | "weekly" | "monthly" | "yearly";

interface PeriodData {
	period: string;
	activeUsers: number;
	architectures: Record<string, number>;
	displayProtocols: Record<string, number>;
	chassisTypes: Record<string, number>;
	productIds: Record<string, number>;
	desktops: Record<string, number>;
	buildProvenances: Record<string, number>;
	versions: Record<string, number>;
	locales: Record<string, number>;
	screenBuckets: Record<string, number>;
}

interface StatsResponse {
	data: PeriodData[];
	granularity: Granularity;
	periods: number;
	filters?: Record<string, string>;
}

const BREAKDOWNS = [
	{ key: "activeUsers", label: "Active users" },
	{ key: "productIds", label: "Distribution" },
	{ key: "desktops", label: "Desktop" },
	{ key: "architectures", label: "Architecture" },
	{ key: "displayProtocols", label: "Display server" },
	{ key: "chassisTypes", label: "Form factor" },
	{ key: "versions", label: "Vicinae version" },
	{ key: "buildProvenances", label: "Provenance" },
	{ key: "locales", label: "Locale" },
	{ key: "screenBuckets", label: "Resolution" },
] as const;

type BreakdownKey = (typeof BREAKDOWNS)[number]["key"];

const FILTERS = [
	{ param: "desktop", label: "Desktop", breakdownKey: "desktops" },
	{ param: "arch", label: "Architecture", breakdownKey: "architectures" },
	{ param: "display", label: "Display server", breakdownKey: "displayProtocols" },
	{ param: "chassis", label: "Form factor", breakdownKey: "chassisTypes" },
	{ param: "version", label: "Vicinae version", breakdownKey: "versions" },
	{ param: "build", label: "Provenance", breakdownKey: "buildProvenances" },
	{ param: "locale", label: "Locale", breakdownKey: "locales" },
	{ param: "screen", label: "Resolution", breakdownKey: "screenBuckets" },
] as const;

const BREAKDOWN_TO_FILTER: Partial<Record<BreakdownKey, string>> = {
	desktops: "desktop",
	architectures: "arch",
	displayProtocols: "display",
	chassisTypes: "chassis",
	versions: "version",
	buildProvenances: "build",
	locales: "locale",
	screenBuckets: "screen",
};

const GRANULARITIES: Granularity[] = ["daily", "weekly", "monthly", "yearly"];

const PRESETS: { label: string; days: number }[] = [
	{ label: "2w", days: 14 },
	{ label: "1m", days: 30 },
	{ label: "3m", days: 90 },
	{ label: "6m", days: 180 },
	{ label: "All", days: 9999 },
];

const PALETTE = [
	"#c9a76e",
	"#6a8a7c",
	"#e8d5b8",
	"#567a6c",
	"#d4b88e",
	"#8aaa9c",
	"#b8944e",
	"#354d46",
	"#9a7b3f",
	"#44635a",
	"#7a6132",
	"#a4c4b4",
	"#f0e0c8",
	"#2a3d38",
];

const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function toDateStr(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

function parseDate(s: string): Date | null {
	if (!s) return null;
	const d = new Date(s + "T00:00:00");
	return isNaN(d.getTime()) ? null : d;
}

function isSameDay(a: Date, b: Date): boolean {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(d: Date, start: Date | null, end: Date | null): boolean {
	if (!start || !end) return false;
	const t = d.getTime();
	return t > start.getTime() && t < end.getTime();
}

function CalendarMonth({
	year,
	month,
	rangeStart,
	rangeEnd,
	hovered,
	onSelect,
	onHover,
}: {
	year: number;
	month: number;
	rangeStart: Date | null;
	rangeEnd: Date | null;
	hovered: Date | null;
	onSelect: (d: Date) => void;
	onHover: (d: Date | null) => void;
}) {
	const firstDay = new Date(year, month, 1);
	let startWeekday = firstDay.getDay() - 1;
	if (startWeekday < 0) startWeekday = 6;
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const today = new Date();

	const effectiveEnd = rangeEnd || hovered;

	const cells: (number | null)[] = [];
	for (let i = 0; i < startWeekday; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(d);

	return (
		<div className="w-[252px]">
			<div className="grid grid-cols-7 mb-1">
				{DAY_NAMES.map((d) => (
					<div key={d} className="text-[10px] text-stone-600 text-center py-1">
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7">
				{cells.map((day, i) => {
					if (day === null) return <div key={`e-${i}`} />;

					const date = new Date(year, month, day);
					const isToday = isSameDay(date, today);
					const isStart = rangeStart && isSameDay(date, rangeStart);
					const isEnd = effectiveEnd && isSameDay(date, effectiveEnd);
					const isInRange = isBetween(date, rangeStart, effectiveEnd);
					const isFuture = date > today;

					return (
						<button
							key={day}
							type="button"
							disabled={isFuture}
							onMouseEnter={() => onHover(date)}
							onMouseLeave={() => onHover(null)}
							onClick={() => onSelect(date)}
							className={`h-8 text-xs rounded-md transition-all relative ${isFuture
								? "text-stone-800 cursor-default"
								: isStart || isEnd
									? "bg-sand-600/30 text-sand-200 font-medium"
									: isInRange
										? "bg-sand-600/10 text-stone-300"
										: isToday
											? "text-sand-400 font-medium hover:bg-ink-700/60"
											: "text-stone-400 hover:bg-ink-700/60"
								}`}
						>
							{day}
						</button>
					);
				})}
			</div>
		</div>
	);
}

function DateRangePicker({
	since,
	until,
	onApply,
}: {
	since: string;
	until: string;
	onApply: (since: string | null, until: string | null) => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const [picking, setPicking] = useState<"start" | "end">("start");
	const [tempStart, setTempStart] = useState<Date | null>(parseDate(since));
	const [tempEnd, setTempEnd] = useState<Date | null>(parseDate(until));
	const [hovered, setHovered] = useState<Date | null>(null);

	const today = new Date();
	const [viewDate, setViewDate] = useState(
		parseDate(until) || parseDate(since) || today,
	);
	const leftMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
	const rightMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	useEffect(() => {
		setTempStart(parseDate(since));
		setTempEnd(parseDate(until));
	}, [since, until]);

	function handleSelect(d: Date) {
		if (picking === "start") {
			setTempStart(d);
			setTempEnd(null);
			setPicking("end");
		} else {
			if (tempStart && d < tempStart) {
				setTempStart(d);
				setTempEnd(tempStart);
			} else {
				setTempEnd(d);
			}
			setPicking("start");
		}
	}

	function apply() {
		onApply(
			tempStart ? toDateStr(tempStart) : null,
			tempEnd ? toDateStr(tempEnd) : null,
		);
		setOpen(false);
	}

	function clear() {
		setTempStart(null);
		setTempEnd(null);
		setPicking("start");
		onApply(null, null);
		setOpen(false);
	}

	function prevMonth() {
		setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
	}

	function nextMonth() {
		setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
	}

	const hasRange = since || until;

	const label = hasRange
		? `${since || "..."} — ${until || "..."}`
		: "Custom range";

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={`px-3 py-1.5 text-xs rounded-lg border transition-all inline-flex items-center gap-2 ${hasRange
					? "bg-sand-600/15 border-sand-600/30 text-sand-300"
					: "bg-ink-800 border-sand-700/10 text-stone-500 hover:text-stone-300"
					}`}
			>
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
					<rect x="1" y="2.5" width="14" height="12" rx="2" />
					<path d="M1 6.5h14M5 1v3M11 1v3" />
				</svg>
				{label}
			</button>

			{open && (
				<div className="absolute top-full left-0 mt-2 z-50 bg-ink-800 border border-sand-700/15 rounded-xl shadow-2xl p-4 animate-fade-in">
					<div className="flex items-center justify-between mb-3">
						<button
							type="button"
							onClick={prevMonth}
							className="p-1 text-stone-500 hover:text-stone-300 transition-colors rounded-md hover:bg-ink-700/50"
						>
							<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
								<path d="M9.78 3.22a.75.75 0 010 1.06L6.56 7.5l3.22 3.22a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" />
							</svg>
						</button>
						<div className="flex gap-8 text-xs text-stone-300 font-medium">
							<span>
								{MONTH_NAMES[leftMonth.getMonth()]} {leftMonth.getFullYear()}
							</span>
							<span>
								{MONTH_NAMES[rightMonth.getMonth()]} {rightMonth.getFullYear()}
							</span>
						</div>
						<button
							type="button"
							onClick={nextMonth}
							className="p-1 text-stone-500 hover:text-stone-300 transition-colors rounded-md hover:bg-ink-700/50"
						>
							<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
								<path d="M6.22 3.22a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 01-1.06-1.06L9.44 7.5 6.22 4.28a.75.75 0 010-1.06z" />
							</svg>
						</button>
					</div>

					<div className="flex gap-4">
						<CalendarMonth
							year={leftMonth.getFullYear()}
							month={leftMonth.getMonth()}
							rangeStart={tempStart}
							rangeEnd={tempEnd}
							hovered={picking === "end" ? hovered : null}
							onSelect={handleSelect}
							onHover={setHovered}
						/>
						<div className="w-px bg-sand-700/10" />
						<CalendarMonth
							year={rightMonth.getFullYear()}
							month={rightMonth.getMonth()}
							rangeStart={tempStart}
							rangeEnd={tempEnd}
							hovered={picking === "end" ? hovered : null}
							onSelect={handleSelect}
							onHover={setHovered}
						/>
					</div>

					<div className="flex items-center justify-between mt-3 pt-3 border-t border-sand-700/10">
						<div className="text-[11px] text-stone-600">
							{picking === "start" ? "Select start date" : "Select end date"}
						</div>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={clear}
								className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors rounded-md"
							>
								Clear
							</button>
							<button
								type="button"
								onClick={apply}
								disabled={!tempStart}
								className="px-3 py-1.5 text-xs rounded-md bg-sand-600/20 text-sand-300 hover:bg-sand-600/30 transition-all disabled:opacity-40 disabled:cursor-default"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function formatPeriod(period: string, granularity: Granularity): string {
	const d = new Date(period + "T00:00:00");
	if (granularity === "yearly") return d.getFullYear().toString();
	if (granularity === "monthly")
		return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
	return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CustomTooltip({
	active,
	payload,
	label,
	granularity,
	normalized,
}: {
	active?: boolean;
	payload?: { name: string; value: number; color: string }[];
	label?: string;
	granularity: Granularity;
	normalized: boolean;
}) {
	if (!active || !payload?.length || !label) return null;

	const sorted = [...payload]
		.filter((p) => p.value > 0)
		.sort((a, b) => b.value - a.value);
	const total = sorted.reduce((s, p) => s + p.value, 0);

	return (
		<div className="bg-ink-800 border border-sand-700/20 rounded-lg px-3 py-2 shadow-xl text-xs">
			<p className="text-stone-400 mb-1.5 font-medium">
				{formatPeriod(label, granularity)}
			</p>
			{sorted.slice(0, 8).map((entry) => (
				<div key={entry.name} className="flex items-center gap-2 py-0.5">
					<span
						className="w-2 h-2 rounded-full shrink-0"
						style={{ backgroundColor: entry.color }}
					/>
					<span className="text-stone-300 truncate max-w-[120px]">
						{entry.name}
					</span>
					<span className="text-stone-500 ml-auto pl-3 tabular-nums">
						{normalized ? `${entry.value < 1 ? entry.value.toFixed(2) : entry.value.toFixed(1)}%` : entry.value}
					</span>
				</div>
			))}
			{sorted.length > 8 && (
				<p className="text-stone-600 mt-1">+{sorted.length - 8} more</p>
			)}
			{!normalized && (
				<div className="border-t border-sand-700/10 mt-1.5 pt-1.5 text-stone-400">
					Total: {total}
				</div>
			)}
		</div>
	);
}

export function AnalyticsDashboard() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const granularity =
		(searchParams.get("granularity") as Granularity) || "daily";
	const periods = parseInt(searchParams.get("periods") || "30", 10);
	const breakdown =
		(searchParams.get("breakdown") as BreakdownKey) || "activeUsers";
	const normalized = searchParams.get("normalized") === "true";
	const since = searchParams.get("since") || "";
	const until = searchParams.get("until") || "";

	const activeFilters = useMemo(() => {
		const f: Record<string, string> = {};
		for (const { param } of FILTERS) {
			const val = searchParams.get(param);
			if (val) f[param] = val;
		}
		return f;
	}, [searchParams]);

	const hasDateRange = !!(since || until);

	const [data, setData] = useState<PeriodData[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const updateParams = useCallback(
		(updates: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams.toString());
			for (const [key, val] of Object.entries(updates)) {
				if (val === null || val === "") params.delete(key);
				else params.set(key, val);
			}
			router.replace(`/open-data?${params.toString()}`, { scroll: false });
		},
		[router, searchParams],
	);

	useEffect(() => {
		const controller = new AbortController();
		setLoading(true);
		setError(null);

		const params = new URLSearchParams();
		params.set("granularity", granularity);
		params.set("periods", periods.toString());
		if (since) params.set("since", since);
		if (until) params.set("until", until);
		for (const [k, v] of Object.entries(activeFilters)) {
			params.set(k, v);
		}

		fetch(`${API_BASE}/v1/telemetry/analytics?${params}`, {
			signal: controller.signal,
		})
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((json: StatsResponse) => {
				const sorted = [...json.data].sort((a, b) =>
					a.period.localeCompare(b.period),
				);
				const now = new Date();
				if (sorted.length > 0) {
					const last = sorted[sorted.length - 1];
					const lastDate = new Date(last.period + "T00:00:00");
					let isIncomplete = false;
					if (granularity === "daily") {
						isIncomplete = lastDate.toDateString() === now.toDateString();
					} else if (granularity === "weekly") {
						const diff = now.getTime() - lastDate.getTime();
						isIncomplete = diff < 7 * 24 * 60 * 60 * 1000;
					} else if (granularity === "monthly") {
						isIncomplete =
							lastDate.getMonth() === now.getMonth() &&
							lastDate.getFullYear() === now.getFullYear();
					} else if (granularity === "yearly") {
						isIncomplete = lastDate.getFullYear() === now.getFullYear();
					}
					if (isIncomplete) sorted.pop();
				}
				setData(sorted);
				setLoading(false);
			})
			.catch((err) => {
				if (err.name !== "AbortError") {
					setError(err.message);
					setLoading(false);
				}
			});

		return () => controller.abort();
	}, [granularity, periods, since, until, activeFilters]);

	const isTotal = breakdown === "activeUsers";

	const allDimsSorted = useMemo(() => {
		if (!data || isTotal) return [];
		const dimCounts: Record<string, number> = {};
		for (const period of data) {
			const bd = period[breakdown] || {};
			for (const [key, count] of Object.entries(bd)) {
				dimCounts[key] = (dimCounts[key] || 0) + (count as number);
			}
		}
		return Object.entries(dimCounts)
			.sort((a, b) => b[1] - a[1])
			.map(([key]) => key);
	}, [data, breakdown, isTotal]);

	const MAX_CHART_DIMS = 12;

	const { chartData, dimensions } = useMemo(() => {
		if (!data) return { chartData: [], dimensions: [] };

		if (isTotal) {
			const chart = data.map((period) => ({
				period: period.period,
				"Active users": period.activeUsers,
			}));
			return { chartData: chart, dimensions: ["Active users"] };
		}

		const dims = allDimsSorted.slice(0, MAX_CHART_DIMS);

		const chart = data.map((period) => {
			const breakdownData = period[breakdown] || {};
			const row: Record<string, number | string> = { period: period.period };

			if (normalized) {
				const total = Object.values(breakdownData).reduce(
					(s, v) => s + (v as number),
					0,
				);
				for (const dim of dims) {
					row[dim] =
						total > 0
							? (((breakdownData[dim] || 0) as number) / total) * 100
							: 0;
				}
			} else {
				for (const dim of dims) {
					row[dim] = (breakdownData[dim] || 0) as number;
				}
			}
			return row;
		});

		return { chartData: chart, dimensions: dims };
	}, [data, breakdown, normalized, isTotal, allDimsSorted]);

	const aggregates = useMemo(() => {
		if (!data || isTotal) return [];
		const totals: Record<string, number> = {};
		for (const period of data) {
			const bd = period[breakdown] || {};
			for (const [key, count] of Object.entries(bd)) {
				totals[key] = (totals[key] || 0) + (count as number);
			}
		}
		const grand = Object.values(totals).reduce((s, v) => s + v, 0);
		return allDimsSorted.map((dim, i) => ({
			dim,
			count: totals[dim] || 0,
			pct: grand > 0 ? ((totals[dim] || 0) / grand) * 100 : 0,
			color: PALETTE[i % PALETTE.length],
		}));
	}, [data, breakdown, allDimsSorted, isTotal]);

	const handleLegendClick = useCallback(
		(dim: string) => {
			const fp = BREAKDOWN_TO_FILTER[breakdown];
			if (!fp) return;
			if (activeFilters[fp] === dim) {
				updateParams({ [fp]: null });
			} else {
				updateParams({ [fp]: dim });
			}
		},
		[breakdown, activeFilters, updateParams],
	);

	const filterParam = BREAKDOWN_TO_FILTER[breakdown];

	return (
		<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-stone-100 mb-2">
					Open Data
				</h1>
				<p className="text-stone-500 text-sm">
					Anonymous, aggregated usage data from Vicinae users.{' '}
					<a
						href="https://docs.vicinae.com/telemetry"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sand-400 hover:text-sand-200 transition-colors"
					>
						Learn more.
					</a>
				</p>
			</div>

			{/* Controls — single row */}
			<div className="flex flex-wrap items-center gap-2 mb-5">
				<div className="flex items-center bg-ink-800 rounded-lg p-1 border border-sand-700/10">
					{GRANULARITIES.map((g) => (
						<button
							key={g}
							onClick={() => updateParams({ granularity: g })}
							className={`px-2.5 py-1.5 text-xs rounded-md transition-all ${granularity === g
								? "bg-sand-600/20 text-sand-300 font-medium"
								: "text-stone-500 hover:text-stone-300"
								}`}
						>
							{g.charAt(0).toUpperCase() + g.slice(1)}
						</button>
					))}
				</div>

				<div className="w-px h-5 bg-sand-700/10" />

				<div className="flex items-center bg-ink-800 rounded-lg p-1 border border-sand-700/10">
					{PRESETS.map((p) => (
						<button
							key={p.days}
							onClick={() =>
								updateParams({
									periods: p.days.toString(),
									since: null,
									until: null,
								})
							}
							className={`px-2.5 py-1.5 text-xs rounded-md transition-all ${periods === p.days && !hasDateRange
								? "bg-sand-600/20 text-sand-300 font-medium"
								: "text-stone-500 hover:text-stone-300"
								}`}
						>
							{p.label}
						</button>
					))}
				</div>

				<DateRangePicker
					since={since}
					until={until}
					onApply={(s, u) => updateParams({ since: s, until: u })}
				/>

				<div className="w-px h-5 bg-sand-700/10" />

				<button
					onClick={() =>
						updateParams({ normalized: normalized ? null : "true" })
					}
					className={`px-2.5 py-1.5 text-xs rounded-lg border transition-all ${normalized
						? "bg-sand-600/15 border-sand-600/30 text-sand-300"
						: "bg-ink-800 border-sand-700/10 text-stone-500 hover:text-stone-300"
						}`}
				>
					100%
				</button>
			</div>

			{/* Breakdown selector */}
			<div className="flex flex-wrap gap-1.5 mb-5">
				{BREAKDOWNS.map((b) => (
					<button
						key={b.key}
						onClick={() => updateParams({ breakdown: b.key })}
						className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${breakdown === b.key
							? "bg-sage-600/20 border-sage-600/30 text-sage-300 font-medium"
							: "bg-ink-800 border-sand-700/10 text-stone-500 hover:text-stone-300"
							}`}
					>
						{b.label}
					</button>
				))}
			</div>

			{/* Active filters */}
			{Object.keys(activeFilters).length > 0 && (
				<div className="flex flex-wrap items-center gap-2 mb-4">
					<span className="text-[11px] text-stone-600">Filtered by:</span>
					{Object.entries(activeFilters).map(([param, value]) => {
						const filter = FILTERS.find((f) => f.param === param);
						return (
							<button
								key={param}
								onClick={() => updateParams({ [param]: null })}
								className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-sand-600/15 border border-sand-600/25 text-sand-300 hover:bg-sand-600/25 transition-all group"
							>
								<span className="text-stone-500">{filter?.label}:</span>
								{value}
								<svg
									width="10"
									height="10"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="opacity-50 group-hover:opacity-100 transition-opacity"
								>
									<path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
								</svg>
							</button>
						);
					})}
					<button
						onClick={() => {
							const clear: Record<string, null> = {};
							for (const { param } of FILTERS) clear[param] = null;
							updateParams(clear);
						}}
						className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors"
					>
						Clear all
					</button>
				</div>
			)}

			{/* Chart */}
			<div className="bg-ink-800/50 border border-sand-700/10 rounded-xl p-4 sm:p-6 mb-4">
				{loading ? (
					<div className="h-[350px] flex items-center justify-center">
						<div className="flex items-center gap-3 text-stone-500 text-sm">
							<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								/>
							</svg>
							Loading data...
						</div>
					</div>
				) : error ? (
					<div className="h-[350px] flex items-center justify-center">
						<div className="text-center">
							<p className="text-red-400/80 text-sm mb-1">
								Failed to load data
							</p>
							<p className="text-stone-600 text-xs">{error}</p>
						</div>
					</div>
				) : chartData.length === 0 ? (
					<div className="h-[350px] flex items-center justify-center">
						<p className="text-stone-600 text-sm">
							No data available for this range.
						</p>
					</div>
				) : (
					<ResponsiveContainer width="100%" height={350}>
						<AreaChart
							data={chartData}
							margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
						>
							<defs>
								{dimensions.map((dim, i) => (
									<linearGradient
										key={dim}
										id={`grad-${i}`}
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="0%"
											stopColor={PALETTE[i % PALETTE.length]}
											stopOpacity={0.6}
										/>
										<stop
											offset="100%"
											stopColor={PALETTE[i % PALETTE.length]}
											stopOpacity={0.1}
										/>
									</linearGradient>
								))}
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(154,123,63,0.06)"
								vertical={false}
							/>
							<XAxis
								dataKey="period"
								tickFormatter={(v) => formatPeriod(v, granularity)}
								tick={{ fill: "#6b6560", fontSize: 11 }}
								axisLine={{ stroke: "rgba(154,123,63,0.1)" }}
								tickLine={false}
								interval="preserveStartEnd"
							/>
							<YAxis
								tick={{ fill: "#6b6560", fontSize: 11 }}
								axisLine={false}
								tickLine={false}
								width={40}
								domain={normalized ? [0, 100] : ["auto", "auto"]}
								tickFormatter={(v) =>
									normalized
										? `${v}%`
										: v >= 1000
											? `${(v / 1000).toFixed(1)}k`
											: v
								}
							/>
							<Tooltip
								content={
									<CustomTooltip
										granularity={granularity}
										normalized={normalized}
									/>
								}
							/>
							{dimensions.map((dim, i) => (
								<Area
									key={dim}
									type="monotone"
									dataKey={dim}
									stackId="1"
									stroke={PALETTE[i % PALETTE.length]}
									strokeWidth={1.5}
									fill={`url(#grad-${i})`}
								/>
							))}
						</AreaChart>
					</ResponsiveContainer>
				)}
			</div>

			{/* Aggregate bar + legend */}
			{!isTotal && aggregates.length > 0 && !loading && (
				<div className="mb-8">
					<div className="flex h-3 rounded-full overflow-hidden mb-3">
						{aggregates.filter((s) => s.pct >= 0.01).map((seg) => (
							<div
								key={seg.dim}
								className={`transition-all ${filterParam ? "cursor-pointer hover:brightness-125" : ""}`}
								style={{
									width: `${seg.pct}%`,
									backgroundColor: seg.color,
									opacity:
										filterParam && activeFilters[filterParam] && activeFilters[filterParam] !== seg.dim
											? 0.25
											: 1,
								}}
								title={`${seg.dim}: ${seg.pct < 1 ? seg.pct.toFixed(2) : seg.pct.toFixed(1)}%`}
								onClick={() => filterParam && handleLegendClick(seg.dim)}
							/>
						))}
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-1.5 px-1">
						{aggregates.filter((s) => s.pct >= 0.01).map((seg) => {
							const isActive = filterParam
								? activeFilters[filterParam] === seg.dim
								: false;

							return filterParam ? (
								<button
									key={seg.dim}
									type="button"
									onClick={() => handleLegendClick(seg.dim)}
									className={`inline-flex items-center gap-1.5 text-xs transition-all ${isActive
										? "text-sand-300"
										: activeFilters[filterParam!]
											? "text-stone-700 hover:text-stone-400"
											: "text-stone-500 hover:text-stone-300"
										}`}
								>
									<span
										className="w-2 h-2 rounded-sm shrink-0"
										style={{ backgroundColor: seg.color }}
									/>
									{seg.dim}
									<span className="text-stone-600 tabular-nums">
										{seg.pct < 1 ? seg.pct.toFixed(2) : seg.pct.toFixed(1)}%
									</span>
								</button>
							) : (
								<span
									key={seg.dim}
									className="inline-flex items-center gap-1.5 text-xs text-stone-500"
								>
									<span
										className="w-2 h-2 rounded-sm shrink-0"
										style={{ backgroundColor: seg.color }}
									/>
									{seg.dim}
									<span className="text-stone-600 tabular-nums">
										{seg.pct < 1 ? seg.pct.toFixed(2) : seg.pct.toFixed(1)}%
									</span>
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* Footer */}
			<div className="mt-6 flex items-center justify-between">
				<p className="text-[11px] text-stone-700">
					Data is anonymized and deduplicated by unique user ID.
				</p>
				<button
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						setCopied(true);
						setTimeout(() => setCopied(false), 2000);
					}}
					className="text-xs text-stone-600 hover:text-stone-400 transition-colors flex items-center gap-1.5"
				>
					<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
						<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
						<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
					</svg>
					{copied ? "Copied!" : "Copy link"}
				</button>
			</div>
		</div>
	);
}
