import { recentDemoEvents } from "@/lib/demo-data";
import { Icon } from "@/components/shared/icon";

export function ActivityFeed() {
  return (
    <section className="activity-feed" aria-labelledby="activity-title">
      <div className="section-panel-heading"><div><h2 id="activity-title">Recent activity</h2><p>Events from the simulated workspace</p></div><span className="small-tag">DEMO LOG</span></div>
      <div className="activity-list">
        {recentDemoEvents.map((event) => (
          <div className="activity-row" key={event.id}>
            <span className={`activity-icon tone-${event.tone}`}><Icon name={event.icon} size={16} /></span>
            <span className="activity-copy"><b>{event.title}</b><small>{event.description}</small></span>
            <time>{event.time}</time>
          </div>
        ))}
      </div>
    </section>
  );
}
