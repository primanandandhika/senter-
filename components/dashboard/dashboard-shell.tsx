"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon, type IconName } from "@/components/shared/icon";
import { Logo } from "@/components/shared/logo";
import { recentDemoEvents } from "@/lib/demo-data";

const navItems: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/dashboard", label: "Overview", icon: "overview" },
  { href: "/dashboard/devices", label: "Devices", icon: "devices" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "analytics" },
  { href: "/dashboard/insights", label: "Insights", icon: "insights" },
  { href: "/dashboard/history", label: "History", icon: "history" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav" aria-label="Dashboard">
      <span className="sidebar-section-label">WORKSPACE</span>
      {navItems.map((item) => {
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            className={`dashboard-nav-link${active ? " is-active" : ""}`}
            href={item.href}
            key={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
            {item.label === "Insights" && <i className="nav-status-dot" />}
          </Link>
        );
      })}
    </nav>
  );
}

function Notifications({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="notification-wrap">
      <button
        className={`icon-button notification-button${open ? " is-active" : ""}`}
        type="button"
        aria-label={open ? "Close sample activity" : "Open sample activity"}
        aria-expanded={open}
        aria-controls="notification-panel"
        onClick={onToggle}
      >
        <Icon name="bell" size={18} /><i />
      </button>
      {open && (
        <div className="notification-panel" id="notification-panel" role="region" aria-label="Recent demo activity">
          <div className="notification-heading"><strong>Recent activity</strong><span>SIMULATED</span></div>
          {recentDemoEvents.slice(0, 2).map((event) => (
            <div className="notification-item" key={event.id}><span className={`activity-icon tone-${event.tone}`}><Icon name={event.icon} size={15} /></span><div><b>{event.title}</b><small>{event.time} · {event.description}</small></div></div>
          ))}
          <Link href="/dashboard" onClick={onToggle}>View dashboard activity <Icon name="arrow-right" size={14} /></Link>
        </div>
      )}
    </div>
  );
}

export function DashboardShell({ children }: { children: import("react").ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { shopName, showActivity } = useDemoPreferences();

  return (
    <div className="dashboard-frame">
      {mobileOpen && <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`dashboard-sidebar${mobileOpen ? " mobile-open" : ""}`} aria-label="SENTER workspace navigation">
        <div className="sidebar-brand-row"><Logo /><button type="button" className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><Icon name="close" /></button></div>
        <div className="sidebar-workspace"><span className="workspace-avatar"><Icon name="shop" size={18} /></span><span><b>{shopName}</b><small>DEMO WORKSPACE</small></span><Icon name="chevron-down" size={15} className="muted-icon" /></div>
        <SidebarLinks onNavigate={() => setMobileOpen(false)} />
        <div className="sidebar-bottom">
          <div className="sidebar-plan"><span className="plan-orbit"><Icon name="bolt" size={15} /></span><span><b>Prototype workspace</b><small>Simulated measurements</small></span></div>
          <div className="profile-row"><span className="profile-avatar">KD</span><span className="profile-copy"><b>Demo owner</b><small>{shopName}</small></span><Link className="icon-button profile-settings" href="/dashboard/settings" aria-label="Open account settings"><Icon name="settings" size={16} /></Link></div>
          <Link className="logout-link" href="/"><Icon name="logout" size={17} /><span>Exit demo</span></Link>
        </div>
      </aside>

      <div className="dashboard-workspace">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-nav-trigger" type="button" aria-label="Open dashboard navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Icon name="menu" size={19} /></button>
            <span className="topbar-shop"><span className="topbar-shop-icon"><Icon name="shop" size={16} /></span><b>{shopName}</b><span className="topbar-divider" /><span className="topbar-period">Sample period · 31 Oct 2026</span></span>
          </div>
          <div className="topbar-right"><span className="demo-pill"><i /> DEMO DATA</span>{showActivity && <Notifications open={notificationsOpen && showActivity} onToggle={() => setNotificationsOpen((value) => !value)} />}</div>
        </header>
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
