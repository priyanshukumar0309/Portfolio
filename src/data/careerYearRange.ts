/**
 * For History / career graph nodes only: reduce `period` to **start year – end year** (or Present).
 * Ignores subtitles and other copy — only 4-digit years (and Present) are surfaced.
 */
export function formatCareerYearRange(period: string | undefined | null): string | null {
  if (period == null || typeof period !== "string") return null;
  const raw = period.replace(/\s+/g, " ").trim();
  if (!raw) return null;

  const present = /\bpresent\b/i.test(raw);
  const years = raw.match(/\b(19|20)\d{2}\b/g);
  if (!years?.length) return present ? "Present" : null;

  const start = years[0];
  if (present) return `${start} – Present`;

  const end = years.length > 1 ? years[years.length - 1] : start;
  if (start === end) return start;
  return `${start} – ${end}`;
}

/** True for nodes under the space career tree (`id` prefix from `portfolioData`). */
export function isCareerGraphNode(id: string | undefined | null): boolean {
  return typeof id === "string" && id.startsWith("career-");
}
