"use client";

import { useMemo, useState } from "react";
import type { Insight } from "@/types";
import { demoInsights, deviceById } from "@/lib/demo-data";
import { Icon } from "@/components/shared/icon";
import { useDemoPreferences } from "@/components/shared/demo-provider";

type InsightFilter = "all" | Insight["category"];

const filters: Array<{ id: InsightFilter; label: string }> = [
  { id: "all", label: "All insights" },
  { id: "unusual-consumption", label: "Unusual consumption" },
  { id: "efficiency", label: "Efficiency" },
  { id: "usage-pattern", label: "Usage patterns" },
  { id: "recommendation", label: "Recommendations" },
];

const categoryLabel: Record<Insight["category"], string> = {
  "unusual-consumption": "Unusual consumption",
  efficiency: "Efficiency opportunity",
  "usage-pattern": "Usage pattern",
  recommendation: "Recommendation",
};

function getInsightTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(value)) + " WIB";
}

export function InsightsView() {
  const [filter, setFilter] = useState<InsightFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(demoInsights[0]?.id ?? null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const { showInsights } = useDemoPreferences();

  const filtered = useMemo(() => filter === "all" ? demoInsights : demoInsights.filter((insight) => insight.category === filter), [filter]);

  return (
    <div className="dashboard-page insights-page">
      <div className="page-heading">
        <div><h1>Insights</h1><p>Review simulated indicators and practical questions for your coffee shop.</p></div>
        <span className="demo-note demo-note-amber"><i /> PRELIMINARY <span>Requires verification</span></span>
      </div>
      <div className="insight-honesty"><Icon name="info" size={17} /><p><strong>These are not verified anomalies.</strong> The examples use simulated readings and an unvalidated analytical model. Treat them as prompts for review, not as findings.</p></div>
      {!showInsights ? (
        <div className="empty-state insight-disabled"><span className="empty-state-icon"><Icon name="insights" size={20} /></span><h2>Preliminary examples are hidden</h2><p>Enable “Show preliminary insight examples” in Settings to view the simulated indicators.</p></div>
      ) : <>
      <div className="insight-filters" role="group" aria-label="Filter insights">
        {filters.map((item) => <button type="button" key={item.id} className={filter === item.id ? "is-selected" : ""} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setExpandedId(null); }}>{item.label}<span>{item.id === "all" ? demoInsights.length : demoInsights.filter((insight) => insight.category === item.id).length}</span></button>)}
      </div>
      <div className="insight-list">
        {filtered.map((insight) => {
          const expanded = expandedId === insight.id;
          const device = insight.relatedDeviceId ? deviceById(insight.relatedDeviceId) : undefined;
          const reviewed = reviewedIds.includes(insight.id);
          return (
            <article className={`insight-item${expanded ? " is-expanded" : ""}`} key={insight.id}>
              <button className="insight-summary" type="button" aria-expanded={expanded} onClick={() => setExpandedId(expanded ? null : insight.id)}>
                <span className={`insight-severity severity-${insight.severity}`}><Icon name={insight.severity === "warning" ? "activity" : insight.severity === "opportunity" ? "insights" : "info"} size={18} /></span>
                <span className="insight-summary-copy"><span className="insight-tags"><i>{categoryLabel[insight.category]}</i><i>SIMULATED INSIGHT</i></span><strong>{insight.title}</strong><small>{device ? `${device.name} · ` : "Shop-wide · "}{getInsightTime(insight.createdAt)}</small></span>
                <Icon name="chevron-down" size={18} className="insight-chevron" />
              </button>
              {expanded && (
                <div className="insight-detail">
                  <div><span className="detail-label">WHAT THE SAMPLE SHOWS</span><p>{insight.description}</p></div>
                  <div><span className="detail-label">A PRACTICAL NEXT STEP</span><p>{insight.suggestedAction}</p></div>
                  {device && <div className="related-device-row"><span>Related device</span><strong>{device.name}</strong><span>{device.dailyEnergyKwh.toFixed(1)} kWh · simulated</span></div>}
                  <div className="insight-detail-footer"><span><Icon name="info" size={14} /> Preliminary indicator · Requires verification</span><button type="button" className={reviewed ? "reviewed-button" : "button button-secondary"} onClick={() => setReviewedIds((current) => reviewed ? current.filter((id) => id !== insight.id) : [...current, insight.id])}>{reviewed ? <><Icon name="check" size={14} /> Reviewed for demo</> : "Mark reviewed"}</button></div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <p className="sample-footnote"><Icon name="clock" size={14} /> Insights shown here are static examples from the simulated dataset.</p>
      </>}
    </div>
  );
}
