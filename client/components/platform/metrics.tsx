import { useId } from "react";
export function MetricCard({
  label,
  value,
  detail,
  points,
}: {
  label: string;
  value: string;
  detail: string;
  points: number[];
}) {
  const id = useId();
  const minimum = Math.min(...points, 0),
    maximum = Math.max(...points, 1);
  const coordinates = points
    .map(
      (point, index) =>
        `${8 + (index / Math.max(points.length - 1, 1)) * 264},${72 - ((point - minimum) / (maximum - minimum)) * 56}`,
    )
    .join(" ");
  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="text-sm text-muted-foreground">{label}</h3>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      <svg
        viewBox="0 0 280 88"
        role="img"
        aria-labelledby={id}
        className={"mt-4 w-full text-(--info)"}
      >
        <title id={id}>{`${label} trend, oldest to newest: ${points.join(", ")}`}</title>
        <line x1="8" y1="80" x2="272" y2="80" stroke="var(--border)" />
        <polyline
          points={coordinates}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </article>
  );
}
