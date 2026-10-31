"use client";

import { useMemo, useState } from "react";
import { demoDevices, demoMeasurements } from "@/lib/demo-data";
import { calculateCost, formatRupiah } from "@/lib/energy";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon } from "@/components/shared/icon";

const pageSize = 8;
const initialStartDate = "2026-10-25";
const initialEndDate = "2026-10-31";

function formatSampleDate(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta",
  }).format(new Date(timestamp));
}

function csvValue(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function HistoryView() {
  const [query, setQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [page, setPage] = useState(1);
  const { tariff } = useDemoPreferences();

  const filtered = useMemo(() => demoMeasurements.filter((measurement) => {
    const device = demoDevices.find((item) => item.id === measurement.deviceId);
    const date = measurement.timestamp.slice(0, 10);
    const matchesQuery = device?.name.toLowerCase().includes(query.trim().toLowerCase()) ?? false;
    const matchesDevice = deviceFilter === "all" || measurement.deviceId === deviceFilter;
    const matchesDates = (!startDate || date >= startDate) && (!endDate || date <= endDate);
    return matchesQuery && matchesDevice && matchesDates;
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp)), [query, deviceFilter, startDate, endDate]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const exportCsv = () => {
    const headings = ["Timestamp (Asia/Jakarta)", "Device", "Voltage (V)", "Current (A)", "Power (W)", "Energy (kWh)", "Estimated cost (IDR)"];
    const rows = filtered.map((measurement) => {
      const device = demoDevices.find((item) => item.id === measurement.deviceId);
      return [formatSampleDate(measurement.timestamp), device?.name ?? "Unknown device", measurement.voltage, measurement.current, measurement.power, measurement.energy.toFixed(2), calculateCost(measurement.energy, tariff)];
    });
    const content = [headings, ...rows].map((row) => row.map(csvValue).join(",")).join("\r\n");
    const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "senter-simulated-history.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const clearFilters = () => { setQuery(""); setDeviceFilter("all"); setStartDate(""); setEndDate(""); setPage(1); };

  return (
    <div className="dashboard-page history-page">
      <div className="page-heading">
        <div><h1>History</h1><p>Filter simulated measurements and export the current result set.</p></div>
        <span className="demo-note"><i /> DEMO DATA <span>Illustrative measurement log</span></span>
      </div>
      <div className="history-toolbar">
        <label className="search-field"><Icon name="search" size={17} /><span className="sr-only">Search by device</span><input type="search" placeholder="Search by device" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></label>
        <label className="select-field history-device-filter"><Icon name="filter" size={16} /><span className="sr-only">Filter history by device</span><select value={deviceFilter} onChange={(event) => { setDeviceFilter(event.target.value); setPage(1); }}><option value="all">All devices</option>{demoDevices.map((device) => <option value={device.id} key={device.id}>{device.name}</option>)}</select><Icon name="chevron-down" size={14} /></label>
        <div className="date-filter"><Icon name="calendar" size={16} /><label><span className="sr-only">Start date</span><input type="date" value={startDate} max={endDate || undefined} onChange={(event) => { setStartDate(event.target.value); setPage(1); }} /></label><span>to</span><label><span className="sr-only">End date</span><input type="date" value={endDate} min={startDate || undefined} onChange={(event) => { setEndDate(event.target.value); setPage(1); }} /></label></div>
        <button className="button button-secondary export-button" type="button" onClick={exportCsv} disabled={!filtered.length}><Icon name="download" size={16} /> Export CSV</button>
      </div>
      <section className="history-table-panel" aria-label="Historical energy measurements">
        <div className="history-table-heading"><span>MEASUREMENTS <i /> SIMULATED</span><span>{filtered.length} records</span></div>
        {pageRows.length ? (
          <div className="history-table-scroll"><table className="history-table"><thead><tr><th scope="col">Date & time</th><th scope="col">Device</th><th scope="col">Voltage</th><th scope="col">Current</th><th scope="col">Power</th><th scope="col">Energy</th><th scope="col">Est. cost</th></tr></thead><tbody>
            {pageRows.map((measurement) => {
              const device = demoDevices.find((item) => item.id === measurement.deviceId);
              return <tr key={measurement.id}><td>{formatSampleDate(measurement.timestamp)} WIB</td><td><b>{device?.name ?? "Unknown device"}</b></td><td>{measurement.voltage.toFixed(1)} V</td><td>{measurement.current.toFixed(2)} A</td><td>{measurement.power} W</td><td>{measurement.energy.toFixed(2)} kWh</td><td>{formatRupiah(calculateCost(measurement.energy, tariff))}</td></tr>;
            })}
          </tbody></table></div>
        ) : (
          <div className="empty-state history-empty"><span className="empty-state-icon"><Icon name="history" size={20} /></span><h2>No sample records in this range</h2><p>Adjust the dates or remove a device filter to see more simulated measurements.</p><button className="button button-secondary" type="button" onClick={clearFilters}>Clear filters</button></div>
        )}
        <div className="pagination-row"><span>Showing {filtered.length ? (safePage - 1) * pageSize + 1 : 0}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length}</span><div><button type="button" className="pagination-button" aria-label="Previous page" disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><Icon name="chevron-right" size={15} className="rotate-180" /></button><span>Page {safePage} of {pageCount}</span><button type="button" className="pagination-button" aria-label="Next page" disabled={safePage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><Icon name="chevron-right" size={15} /></button></div></div>
      </section>
      <div className="table-footnote"><Icon name="info" size={14} /><span>Exported costs are calculated using the current demo tariff. Values do not represent live meter records.</span></div>
    </div>
  );
}
