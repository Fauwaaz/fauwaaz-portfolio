export function formatDate(date: string, includeRelative = false): string {
  const target = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  const fullDate = target.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) return fullDate;

  const days = Math.floor((Date.now() - target.getTime()) / 86_400_000);
  const relative =
    days >= 365
      ? `${Math.floor(days / 365)}y ago`
      : days >= 30
        ? `${Math.floor(days / 30)}mo ago`
        : days > 0
          ? `${days}d ago`
          : "today";

  return `${fullDate} (${relative})`;
}
