"use client";

import { useState } from "react";
import { EnergyChart } from "@/components/dashboard/energy-chart";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon } from "@/components/shared/icon";
import { calculateCost, formatKwh, formatRupiah } from "@/lib/energy";
import { demoDevices, totalDemoEnergyKwh } from "@/lib/demo-data";

const comparisonData = {
  daily: [
    { name: "Previous sample day", energy: 22.4 },
    { name: "Current sample day", energy: 24.8 },
  ],
  weekly: [
    { name: "Previous sample week", energy: 168.1 },
    { name: "Current sample week", energy: 173.6 },
  ],
};

export function AnalyticsView() {
  const [comparisonRange, setComparisonRange] = useState<"daily" | "weekly">("daily");
  const [analysisWindow, setAnalysisWindow] = useState<"7d" | "30d">("7d");
  const { tariff } = useDemoPreferences();
  const max = Math.max(...demoDevices.map((device) => device.dailyEnergyKwh));
  const difference = comparisonData[comparisonRange][1].energy - comparisonData[comparisonRange][0].energy;

  return (
    <div className="dashboard-page analytics-page">
      <div className="page-heading analytics-page-heading">
        <div><h1>Analytics</h1><p>Compare sample periods and see how device use contributes to the total.</p></div>
        <div className="analytics-heading-actions"><label className="select-field analysis-window-select"><Icon name="calendar" size={15} /><span className="sr-only">Choose analysis date range</span><select value={analysisWindow} onChange={(event) => { const value = event.target.value as "7d" | "30d"; setAnalysisWindow(value); setComparisonRange(value === "7d" ? "daily" : "weekly"); }}><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option></select><Icon name="chevron-down" size={14} /></label><span className="demo-note"><i /> SIMULATED <span>Illustrative comparisons</span></span></div>
      </div>
      <div className="analytics-main-chart"><EnergyChart key={analysisWindow} initialRange={analysisWindow === "7d" ? "daily" : "weekly"} /></div>
      <div className="analytics-grid">
        <section className="analytics-panel device-distribution" aria-labelledby="distribution-title">
          <div className="section-panel-heading"><div><h2 id="distribution-title">Energy by appliance</h2><p>Share of the 24.8 kWh sample day</p></div><span className="small-tag">SIMULATED</span></div>
          <div className="distribution-list">
            {demoDevices.slice().sort((a, b) => b.dailyEnergyKwh - a.dailyEnergyKwh).map((device) => (
              <div className="distribution-row" key={device.id}>
                <span className="distribution-name">{device.name}</span><span className="distribution-bar"><i style={{ width: `${(device.dailyEnergyKwh / max) * 100}%` }} /></span><b>{formatKwh(device.dailyEnergyKwh)}</b>
              </div>
            ))}
          </div>
          <div className="distribution-total"><span>Sample total</span><strong>{formatKwh(totalDemoEnergyKwh)}</strong></div>
        </section>
        <section className="analytics-panel period-comparison" aria-labelledby="comparison-title">
          <div className="section-panel-heading"><div><h2 id="comparison-title">Period comparison</h2><p>Simulated energy, previous vs current</p></div><label className="select-field compact-select"><span className="sr-only">Choose comparison period</span><select value={comparisonRange} onChange={(event) => setComparisonRange(event.target.value as "daily" | "weekly")}><option value="daily">Daily</option><option value="weekly">Weekly</option></select><Icon name="chevron-down" size={14} /></label></div>
          <div className="compare-summary"><strong>{difference > 0 ? "+" : ""}{difference.toFixed(1)} <small>kWh</small></strong><span>difference in this illustrative sample</span></div>
          <div className="compare-bars">
            {comparisonData[comparisonRange].map((item, index) => (
              <div className="compare-row" key={item.name}><div><span>{item.name}</span><b>{formatKwh(item.energy)}</b></div><i><span className={index === 1 ? "current-period" : "previous-period"} style={{ width: `${(item.energy / Math.max(...comparisonData[comparisonRange].map((entry) => entry.energy))) * 100}%` }} /></i></div>
            ))}
          </div>
        </section>
        <section className="analytics-panel cost-analysis" aria-labelledby="cost-analysis-title">
          <div className="section-panel-heading"><div><h2 id="cost-analysis-title">Estimated electricity cost</h2><p>Calculated from energy × the saved demo tariff</p></div><span className="small-tag">ESTIMATE</span></div>
          <div className="cost-analysis-main"><strong>{formatRupiah(calculateCost(totalDemoEnergyKwh, tariff))}</strong><span>for the 24.8 kWh sample day</span></div>
          <div className="cost-analysis-equation"><span>{formatKwh(totalDemoEnergyKwh)}</span><Icon name="close" size={14} /><span>{formatRupiah(tariff)} / kWh</span><Icon name="arrow-right" size={14} /><b>{formatRupiah(calculateCost(totalDemoEnergyKwh, tariff))}</b></div>
          <p className="cost-analysis-note"><Icon name="info" size={14} /> The tariff is configurable in Settings. This estimate is illustrative and not a utility bill.</p>
        </section>
        <section className="analytics-panel reading-guide" aria-labelledby="reading-guide-title">
          <span className="guide-symbol"><Icon name="info" size={17} /></span><div><h2 id="reading-guide-title">How to read these charts</h2><p>Each chart uses a simulated dataset to demonstrate the intended analysis. Device-level comparisons can help prioritize a closer look; they do not establish equipment performance or verified savings.</p></div>
        </section>
      </div>
    </div>
  );
}
