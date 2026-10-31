import Link from "next/link";
import { EnergyChart } from "@/components/dashboard/energy-chart";
import { ApplianceRanking } from "@/components/dashboard/appliance-ranking";
import { Icon } from "@/components/shared/icon";

export function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="Preview of the SENTER demo dashboard">
      <div className="preview-appbar">
        <div className="preview-app-brand"><span className="preview-mark"><Icon name="bolt" size={14} /></span><b>SENTER</b><span className="preview-slash">/</span><span>Kedai Kopi Demo</span></div>
        <div className="preview-app-meta"><span className="demo-pill"><i /> DEMO DATA</span><span>31 OCT 2026</span></div>
      </div>
      <div className="preview-body">
        <div className="preview-metrics">
          <div><span>Total energy</span><strong>24.8 <small>kWh</small></strong><em>Simulated daily use</em></div>
          <div><span>Estimated cost</span><strong>Rp36,580</strong><em>At demo tariff</em></div>
          <div><span>Monitoring points</span><strong>05 <small>devices</small></strong><em>Sample devices</em></div>
          <div><span>Current power</span><strong>1.42 <small>kW</small></strong><em>Simulated reading</em></div>
        </div>
        <div className="preview-content-grid">
          <EnergyChart compact />
          <ApplianceRanking compact />
        </div>
        <div className="preview-bottom-line"><span><i /> INTERFACE PREVIEW · ALL VALUES SIMULATED</span><Link href="/dashboard">Open full dashboard <Icon name="arrow-up-right" size={14} /></Link></div>
      </div>
    </div>
  );
}
