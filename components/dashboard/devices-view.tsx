"use client";

import { useMemo, useState } from "react";
import type { Device } from "@/types";
import { demoDevices, categoryLabels } from "@/lib/demo-data";
import { formatKwh } from "@/lib/energy";
import { calculateCost, formatRupiah } from "@/lib/energy";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { DeviceDetailDialog } from "@/components/dashboard/device-detail-dialog";
import { Icon, type IconName } from "@/components/shared/icon";

const deviceIcons: Record<Device["category"], IconName> = {
  appliance: "plug",
  hvac: "wind",
  refrigeration: "snowflake",
  "food-prep": "coffee",
  lighting: "activity",
};

export function DevicesView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const { tariff } = useDemoPreferences();

  const filteredDevices = useMemo(() => demoDevices.filter((device) => {
    const matchesQuery = device.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "all" || device.category === category;
    const matchesStatus = status === "all" || device.status === status;
    return matchesQuery && matchesCategory && matchesStatus;
  }), [query, category, status]);

  const clearFilters = () => { setQuery(""); setCategory("all"); setStatus("all"); };

  return (
    <div className="dashboard-page devices-page">
      <div className="page-heading">
        <div><h1>Devices</h1><p>Explore each appliance in the simulated coffee shop setup.</p></div>
        <span className="demo-note"><i /> DEMO DATA <span>{demoDevices.length} sample devices</span></span>
      </div>
      <div className="list-toolbar">
        <label className="search-field"><Icon name="search" size={17} /><span className="sr-only">Search devices</span><input type="search" placeholder="Search devices" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="select-field"><Icon name="filter" size={16} /><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><Icon name="chevron-down" size={14} /></label>
        <label className="select-field"><span className="sr-only">Filter by connection status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="online">Connected</option><option value="warning">Review</option><option value="offline">Offline</option></select><Icon name="chevron-down" size={14} /></label>
        <span className="filter-count">{filteredDevices.length} of {demoDevices.length}</span>
      </div>
      {filteredDevices.length ? (
        <div className="device-table-wrap">
          <table className="device-table">
            <thead><tr><th scope="col">Device</th><th scope="col">Status</th><th scope="col">Current power</th><th scope="col">Daily energy</th><th scope="col">Estimated cost</th><th scope="col">Sample time</th><th><span className="sr-only">Open details</span></th></tr></thead>
            <tbody>{filteredDevices.map((device) => (
              <tr key={device.id}>
                <td><button className="device-name-button" type="button" onClick={() => setSelectedDevice(device)} aria-haspopup="dialog"><span className="device-table-icon"><Icon name={deviceIcons[device.category]} size={17} /></span><span><b>{device.name}</b><small>{categoryLabels[device.category]}</small></span></button></td>
                <td><span className={`device-status status-${device.status}`}><i />{device.status === "warning" ? "Sample: review" : device.status === "offline" ? "Sample: offline" : "Sample: online"}</span></td>
                <td className="tabular-nums" data-label="Current power">{device.currentPowerW} W</td>
                <td className="tabular-nums" data-label="Daily energy">{formatKwh(device.dailyEnergyKwh)}</td>
                <td className="tabular-nums" data-label="Estimated cost">{formatRupiah(calculateCost(device.dailyEnergyKwh, tariff))}</td>
                <td className="last-updated" data-label="Last sample">{device.lastUpdated}</td>
                <td><button className="icon-button row-open" type="button" aria-label={`Open ${device.name} details`} onClick={() => setSelectedDevice(device)}><Icon name="arrow-up-right" size={16} /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state"><span className="empty-state-icon"><Icon name="search" size={20} /></span><h2>No devices match those filters</h2><p>Try a different name, category, or connection status.</p><button className="button button-secondary" type="button" onClick={clearFilters}>Clear filters</button></div>
      )}
      <div className="table-footnote"><Icon name="info" size={14} /><span>All equipment, status, readings, and costs on this page are simulated for the prototype.</span></div>
      <DeviceDetailDialog device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </div>
  );
}
