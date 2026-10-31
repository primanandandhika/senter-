"use client";

import { useId, useState } from "react";
import { getEnergySeries, type ChartRange } from "@/lib/demo-data";
import { formatKwh } from "@/lib/energy";

const rangeOptions: Array<{ id: ChartRange; label: string }> = [
  { id: "hourly", label: "Hourly" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
];

type Point = { x: number; y: number; value: number; label: string };

function chartScale(values: number[]) {
  const maximum = Math.max(...values, 1);
  const step = maximum <= 2 ? 0.5 : maximum <= 8 ? 2 : 10;
  const max = Math.ceil(maximum / step) * step;
  return { max, ticks: [max, max * 0.66, max * 0.33, 0] };
}

export function EnergyChart({ compact = false, initialRange = "daily" }: { compact?: boolean; initialRange?: ChartRange }) {
  const [range, setRange] = useState<ChartRange>(initialRange);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const clipId = useId().replaceAll(":", "");
  const series = getEnergySeries(range);
  const values = series.map((point) => point.energyKwh);
  const scale = chartScale(values);
  const plot = { left: 46, right: 692, top: 17, bottom: 204 };
  const points: Point[] = series.map((point, index) => ({
    x: plot.left + (index / Math.max(series.length - 1, 1)) * (plot.right - plot.left),
    y: plot.bottom - (point.energyKwh / scale.max) * (plot.bottom - plot.top),
    value: point.energyKwh,
    label: point.label,
  }));
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const fillPath = `${linePath} L ${plot.right} ${plot.bottom} L ${plot.left} ${plot.bottom} Z`;
  const selectedPoint = activeIndex === null ? null : points[activeIndex];
  const rangeDescription = range === "hourly" ? "Hourly energy consumption" : range === "daily" ? "Daily energy consumption" : "Weekly energy consumption";

  return (
    <section className={`energy-chart${compact ? " energy-chart-compact" : ""}`} aria-labelledby={`chart-title-${clipId}`}>
      <div className="chart-header">
        <div>
          <h2 id={`chart-title-${clipId}`}>Energy consumption</h2>
          <p>Electricity use across all monitored devices</p>
        </div>
        <div className="range-control" role="group" aria-label="Choose chart interval">
          {rangeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={range === option.id ? "is-selected" : ""}
              aria-pressed={range === option.id}
              onClick={() => { setRange(option.id); setActiveIndex(null); }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-plot-wrap">
        <svg className="energy-chart-svg" viewBox="0 0 720 252" role="img" aria-labelledby={`plot-title-${clipId} plot-desc-${clipId}`}>
          <title id={`plot-title-${clipId}`}>{rangeDescription}</title>
          <desc id={`plot-desc-${clipId}`}>Simulated energy use over the selected time range. Use the range controls to switch between hourly, daily, and weekly views; focus a plotted point for its value.</desc>
          <defs>
            <linearGradient id={`chart-fill-${clipId}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8052ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#8052ff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`chart-clip-${clipId}`}>
              <rect x={plot.left} y={plot.top - 3} width={plot.right - plot.left} height={plot.bottom - plot.top + 7} />
            </clipPath>
          </defs>
          {scale.ticks.map((tick, index) => {
            const y = plot.top + (index / (scale.ticks.length - 1)) * (plot.bottom - plot.top);
            return (
              <g key={`${tick}-${index}`}>
                <line x1={plot.left} x2={plot.right} y1={y} y2={y} className="chart-grid-line" />
                <text x="2" y={y + 4} className="chart-axis-label">{tick.toFixed(scale.max < 5 ? 1 : 0)}</text>
              </g>
            );
          })}
          <g clipPath={`url(#chart-clip-${clipId})`}>
            <path d={fillPath} className="chart-area" fill={`url(#chart-fill-${clipId})`} />
            <path d={linePath} className="chart-line" />
            {points.map((point, index) => (
              <g key={`${point.label}-${index}`}>
                <circle
                  className={`chart-point${activeIndex === index ? " is-active" : ""}`}
                  cx={point.x}
                  cy={point.y}
                  r={activeIndex === index ? 5.5 : 3.5}
                  tabIndex={0}
                  role="button"
                  aria-label={`${point.label}: ${formatKwh(point.value)}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveIndex(index); } }}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerLeave={() => setActiveIndex(null)}
                />
              </g>
            ))}
          </g>
          {points.map((point, index) => (range === "hourly" && index % 4 !== 0 && index !== points.length - 1 ? null : (
            <text className="chart-x-label" x={point.x} y="232" textAnchor="middle" key={`${point.label}-label-${index}`}>
              {range === "hourly" ? point.label.slice(0, 2) : point.label}
            </text>
          )))}
        </svg>
        {selectedPoint && (
          <div className="chart-tooltip" style={{ left: `${(selectedPoint.x / 720) * 100}%`, top: `${(selectedPoint.y / 252) * 100}%` }} role="status">
            <strong>{formatKwh(selectedPoint.value)}</strong><span>{selectedPoint.label}</span>
          </div>
        )}
      </div>
      <div className="chart-footer"><span><i /> Simulated energy use</span><span>kWh <span className="chart-footer-dot">·</span> Sample period</span></div>
    </section>
  );
}
