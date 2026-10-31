import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { EnergyChart } from "@/components/dashboard/energy-chart";
import { ApplianceRanking } from "@/components/dashboard/appliance-ranking";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Icon } from "@/components/shared/icon";

export function DashboardOverview() {
  return (
    <div className="dashboard-page overview-page">
      <div className="page-heading page-heading-overview">
        <div><h1>Energy Overview</h1><p>Monitor your coffee shop’s electricity use and understand where your energy goes.</p></div>
        <span className="demo-note"><i /> DEMO DATA <span>All readings are simulated</span></span>
      </div>
      <div className="data-notice"><Icon name="info" size={16} /><p><strong>Prototype workspace</strong> Values demonstrate the interface only. Hardware, IoT readings, and anomaly analysis are not yet validated.</p></div>
      <KpiStrip />
      <div className="overview-grid">
        <EnergyChart />
        <ApplianceRanking />
      </div>
      <ActivityFeed />
      <p className="sample-footnote"><Icon name="clock" size={14} /> Sample period: 31 Oct 2026 · Figures are illustrative, not live measurements.</p>
    </div>
  );
}
