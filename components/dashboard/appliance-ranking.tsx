"use client";

import { useState } from "react";
import type { Device } from "@/types";
import { demoDevices } from "@/lib/demo-data";
import { formatKwh } from "@/lib/energy";
import { Icon, type IconName } from "@/components/shared/icon";
import { DeviceDetailDialog } from "@/components/dashboard/device-detail-dialog";

const deviceIcons: Record<Device["category"], IconName> = {
  appliance: "plug",
  hvac: "wind",
  refrigeration: "snowflake",
  "food-prep": "coffee",
  lighting: "activity",
};

export function ApplianceRanking({ compact = false }: { compact?: boolean }) {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const maxEnergy = Math.max(...demoDevices.map((device) => device.dailyEnergyKwh));

  return (
    <section className={`appliance-ranking${compact ? " appliance-ranking-compact" : ""}`} aria-labelledby="ranking-title">
      <div className="ranking-header">
        <div><h2 id="ranking-title">Appliance ranking</h2><p>Daily energy use by device</p></div>
        {!compact && <span className="small-tag">SIMULATED</span>}
      </div>
      <div className="ranking-list">
        {demoDevices.slice().sort((a, b) => b.dailyEnergyKwh - a.dailyEnergyKwh).map((device, index) => (
          <button className="ranking-item" key={device.id} type="button" onClick={() => setSelectedDevice(device)} aria-haspopup="dialog">
            <span className="ranking-item-number">0{index + 1}</span>
            <span className="ranking-item-main">
              <span className="ranking-item-name"><Icon name={deviceIcons[device.category]} size={16} /> {device.name}</span>
              <span className="ranking-bar"><i style={{ width: `${(device.dailyEnergyKwh / maxEnergy) * 100}%` }} /></span>
            </span>
            <span className="ranking-item-value">{formatKwh(device.dailyEnergyKwh)}</span>
            <Icon name="chevron-right" size={15} className="muted-icon ranking-chevron" />
          </button>
        ))}
      </div>
      <div className="ranking-footnote"><span>Illustrative daily total</span><strong>24.8 kWh</strong></div>
      <DeviceDetailDialog device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </section>
  );
}
