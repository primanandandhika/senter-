"use client";

import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon, type IconName } from "@/components/shared/icon";
import { calculateCost, formatRupiah } from "@/lib/energy";
import { demoDevices, totalCurrentPowerKw, totalDemoEnergyKwh } from "@/lib/demo-data";

const metrics: Array<{ label: string; value: (tariff: number) => string; detail: string; icon: IconName; tone: string }> = [
  { label: "Total energy", value: () => `${totalDemoEnergyKwh.toFixed(1)} kWh`, detail: "Illustrative daily use", icon: "activity", tone: "violet" },
  { label: "Estimated cost", value: (tariff) => formatRupiah(calculateCost(totalDemoEnergyKwh, tariff)), detail: "Based on demo tariff", icon: "analytics", tone: "amber" },
  { label: "Active devices", value: () => `${demoDevices.length.toString().padStart(2, "0")} devices`, detail: "Illustrative sample count", icon: "devices", tone: "teal" },
  { label: "Current power", value: () => `${totalCurrentPowerKw.toFixed(2)} kW`, detail: "Simulated reading", icon: "bolt", tone: "violet" },
];

export function KpiStrip() {
  const { tariff } = useDemoPreferences();

  return (
    <section className="kpi-strip" aria-label="Simulated energy summary">
      {metrics.map((metric) => (
        <div className="kpi-item" key={metric.label}>
          <div className="kpi-topline"><span>{metric.label}</span><Icon name={metric.icon} size={16} className={`metric-icon tone-${metric.tone}`} /></div>
          <strong>{metric.value(tariff)}</strong>
          <small>{metric.detail}</small>
        </div>
      ))}
    </section>
  );
}
