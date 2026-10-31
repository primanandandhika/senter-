"use client";

import { useEffect, useRef } from "react";
import type { Device } from "@/types";
import { demoMeasurements } from "@/lib/demo-data";
import { calculateCost, formatKwh, formatRupiah, getDeviceCategoryLabel } from "@/lib/energy";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon } from "@/components/shared/icon";

export function DeviceDetailDialog({ device, onClose }: { device: Device | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { tariff } = useDemoPreferences();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (device && !dialog.open) dialog.showModal();
    if (!device && dialog.open) dialog.close();
  }, [device]);

  if (!device) return null;
  const samples = demoMeasurements.filter((measurement) => measurement.deviceId === device.id).slice(0, 7).reverse();
  const highest = Math.max(...samples.map((sample) => sample.energy), 0.1);
  const isPreliminary = device.id === "air-conditioner" || device.id === "ice-maker";

  return (
    <dialog
      className="device-dialog"
      ref={dialogRef}
      aria-labelledby="device-dialog-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <div>
            <span className="dialog-eyebrow">{getDeviceCategoryLabel(device.category)} · SIMULATED</span>
            <h2 id="device-dialog-title">{device.name}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close device details" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button>
        </div>
        <div className="dialog-status-row">
          <span className={`status-dot status-${device.status}`} />
          <span>{device.status === "warning" ? "Sample status: review" : "Sample status: connected"}</span>
          <span className="dialog-updated">Last sample {device.lastUpdated}</span>
        </div>
        <div className="device-parameter-grid">
          <div><small>Current power</small><strong>{device.currentPowerW} <em>W</em></strong></div>
          <div><small>Daily energy</small><strong>{formatKwh(device.dailyEnergyKwh)}</strong></div>
          <div><small>Voltage</small><strong>{device.voltage.toFixed(1)} <em>V</em></strong></div>
          <div><small>Current</small><strong>{device.current.toFixed(2)} <em>A</em></strong></div>
          <div><small>Power factor</small><strong>{device.powerFactor.toFixed(2)}</strong></div>
          <div><small>Estimated daily cost</small><strong>{formatRupiah(calculateCost(device.dailyEnergyKwh, tariff))}</strong></div>
        </div>
        <div className="device-trend">
          <div className="dialog-section-title"><div><h3>Recent sample energy</h3><p>Illustrative readings from the demo dataset</p></div><span>kWh</span></div>
          <div className="device-trend-bars" role="img" aria-label={`Seven simulated sample readings for ${device.name}`}>
            {samples.map((sample) => <span key={sample.id} style={{ height: `${Math.max(10, (sample.energy / highest) * 100)}%` }} title={`${sample.energy.toFixed(2)} kWh`} aria-label={`${sample.energy.toFixed(2)} kWh`}><i /></span>)}
          </div>
          <div className="trend-time-labels"><span>Earlier</span><span>Most recent</span></div>
        </div>
        {isPreliminary && (
          <div className="preliminary-note"><Icon name="info" size={16} /><span><strong>Preliminary indicator</strong>This demo may show a simulated usage pattern for this device. It is not a verified anomaly.</span></div>
        )}
        <div className="dialog-footer"><span><i /> Demo readings only</span><button className="button button-secondary" type="button" onClick={() => dialogRef.current?.close()}>Close details</button></div>
      </div>
    </dialog>
  );
}
