import Link from "next/link";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { EnergyScrollStory } from "@/components/landing/energy-scroll-story";
import { EnergyConstellation } from "@/components/landing/energy-constellation";
import { LandingNav } from "@/components/landing/landing-nav";
import { Reveal } from "@/components/landing/reveal";
import { Icon, type IconName } from "@/components/shared/icon";
import { Logo } from "@/components/shared/logo";

const featureRows: Array<{
  title: string;
  description: string;
  visual: "measure" | "devices" | "ranking" | "anomaly" | "recommendation" | "cost";
  reverse?: boolean;
  note: string;
}> = [
  {
    title: "See the full picture, one appliance at a time.",
    description:
      "Follow voltage, current, power, and energy at each monitoring point. The prototype uses simulated readings to show how those signals come together.",
    visual: "measure",
    note: "Electrical parameters · simulated",
  },
  {
    title: "Know which equipment draws the most.",
    description:
      "Compare the espresso machine, cooling equipment, and other shop essentials by their share of daily energy use.",
    visual: "devices",
    reverse: true,
    note: "Appliance-level view · illustrative",
  },
  {
    title: "Bring the biggest loads into focus.",
    description:
      "A clear consumption ranking helps owners decide where a closer look may be useful, without turning estimates into savings promises.",
    visual: "ranking",
    note: "Daily energy ranking · simulated",
  },
  {
    title: "Notice patterns worth checking.",
    description:
      "Preliminary, simulated indicators can point to equipment use outside its configured reference pattern. Each one calls for human verification.",
    visual: "anomaly",
    reverse: true,
    note: "Preliminary indicator · requires verification",
  },
  {
    title: "Turn observations into practical next steps.",
    description:
      "Suggestions stay grounded in coffee-shop routines: review operating hours, standby habits, or equipment condition before changing how the shop runs.",
    visual: "recommendation",
    note: "Recommendations are illustrative",
  },
  {
    title: "Translate usage into an estimate.",
    description:
      "Apply a configurable demo tariff to simulated kilowatt-hours, so owners can see how consumption relates to an estimated rupiah cost.",
    visual: "cost",
    reverse: true,
    note: "Demo tariff · editable in the dashboard",
  },
];

const processSteps: Array<{ number: string; icon: IconName; title: string; body: string }> = [
  { number: "01", icon: "activity", title: "Measure", body: "Measurement modules collect voltage, current, power, and energy at prioritized load points." },
  { number: "02", icon: "wifi", title: "Connect", body: "An ESP32 is designed to transmit those measurements over the shop’s Wi-Fi connection." },
  { number: "03", icon: "analytics", title: "Analyze", body: "A backend can calculate usage and prepare preliminary analytical indicators from the readings." },
  { number: "04", icon: "overview", title: "Visualize", body: "The dashboard brings consumption, estimated costs, appliance rankings, and insights together." },
];

function FeatureVisual({ visual }: { visual: (typeof featureRows)[number]["visual"] }) {
  if (visual === "measure") {
    return (
      <div className="feature-visual measure-visual">
        <div className="measure-visual-head"><span><i /> SAMPLE MEASUREMENT</span><Icon name="activity" /></div>
        <div className="measure-values">
          <div><small>Voltage</small><strong>220.8 <em>V</em></strong></div>
          <div><small>Current</small><strong>2.14 <em>A</em></strong></div>
          <div><small>Power</small><strong>385 <em>W</em></strong></div>
        </div>
        <svg viewBox="0 0 520 96" aria-hidden="true" className="measure-wave">
          <path d="M0 51h66l13-21 17 42 19-57 19 65 17-29h71l14-21 17 42 19-57 19 65 17-29h72l14-21 17 42 19-57 19 65 17-29h71" />
        </svg>
        <div className="measure-foot"><span>ESPRESSO MACHINE</span><span>SIMULATED DATA</span></div>
      </div>
    );
  }

  if (visual === "devices") {
    const devices = [
      ["Espresso machine", "6.4 kWh", "coffee"],
      ["Air conditioner", "8.2 kWh", "wind"],
      ["Refrigerator", "4.1 kWh", "snowflake"],
    ] as const;
    return (
      <div className="feature-visual device-visual">
        <div className="visual-label"><span>MONITORING POINTS</span><span>05 TOTAL</span></div>
        {devices.map(([name, value, icon]) => (
          <div className="device-visual-row" key={name}>
            <span className="device-visual-icon"><Icon name={icon} size={18} /></span>
            <span className="device-visual-name">{name}<small><i /> Simulated</small></span>
            <strong>{value}</strong>
            <Icon name="chevron-right" size={16} className="muted-icon" />
          </div>
        ))}
        <div className="device-visual-more"><span>+ 2 other devices</span><span className="tiny-node-line"><i /><i /><i /></span></div>
      </div>
    );
  }

  if (visual === "ranking") {
    const rows = [
      ["Air conditioner", 82, "8.2 kWh"],
      ["Espresso machine", 64, "6.4 kWh"],
      ["Refrigerator", 41, "4.1 kWh"],
      ["Ice maker", 35, "3.5 kWh"],
      ["Coffee grinder", 26, "2.6 kWh"],
    ] as const;
    return (
      <div className="feature-visual ranking-visual">
        <div className="visual-label"><span>ENERGY BY DEVICE</span><span>DAILY · SIMULATED</span></div>
        {rows.map(([name, value, energy], index) => (
          <div className="mini-rank-row" key={name}>
            <span className="mini-rank-index">0{index + 1}</span>
            <span className="mini-rank-content"><b>{name}</b><i><span style={{ width: `${value}%` }} /></i></span>
            <strong>{energy}</strong>
          </div>
        ))}
        <div className="ranking-total"><span>Illustrative daily total</span><strong>24.8 kWh</strong></div>
      </div>
    );
  }

  if (visual === "anomaly") {
    return (
      <div className="feature-visual anomaly-visual">
        <div className="anomaly-mark"><Icon name="activity" size={19} /><span>SIMULATED INSIGHT</span></div>
        <h3>Air conditioner usage above its reference pattern</h3>
        <p>Simulated consumption is higher than the configured reference during the selected period.</p>
        <div className="anomaly-ref"><span>REFERENCE</span><i /><b>0.62 kWh / hr</b></div>
        <div className="anomaly-current"><span>SIMULATED PERIOD</span><i /><b>0.91 kWh / hr</b></div>
        <div className="anomaly-verify"><Icon name="info" size={15} /> Preliminary indicator · Requires verification</div>
      </div>
    );
  }

  if (visual === "recommendation") {
    return (
      <div className="feature-visual recommendation-visual">
        <div className="recommendation-heading"><span className="recommendation-icon"><Icon name="insights" size={19} /></span><span><small>SIMULATED SUGGESTION</small><b>Review the espresso machine’s standby routine</b></span></div>
        <p>If the machine stays powered between service periods, compare that schedule with your shop’s actual workflow.</p>
        <div className="recommendation-actions"><span><Icon name="check" size={14} /> Practical to verify</span><span>Espresso machine</span></div>
      </div>
    );
  }

  return (
    <div className="feature-visual cost-visual">
      <div className="visual-label"><span>ESTIMATED ELECTRICITY COST</span><span>DEMO CALCULATION</span></div>
      <div className="cost-equation"><span>24.8 <small>kWh</small></span><i>×</i><span>Rp1,475 <small>/ kWh</small></span></div>
      <div className="cost-result"><span>Estimated daily cost</span><strong>Rp36,580</strong></div>
      <div className="cost-note">Illustrative usage × configurable demo tariff</div>
    </div>
  );
}

export function LandingPage() {
  return (
    <main className="landing-page">
      <LandingNav />

      <EnergyScrollStory />

      <Reveal>
        <section className="constellation-followup container" aria-labelledby="constellation-followup-title">
          <div className="constellation-followup-copy">
            <span className="section-kicker">ENERGY INTELLIGENCE · DEVICE BY DEVICE</span>
            <h2 id="constellation-followup-title">A clearer view of what sits behind the total.</h2>
            <p>Each point represents an illustrative appliance reading. The interface uses simulated values to show how device-level monitoring could make energy use easier to explore.</p>
          </div>
          <div className="constellation-followup-art">
            <EnergyConstellation />
            <div className="hero-art-caption"><span>ILLUSTRATIVE NETWORK · 5 DEVICES</span><span>DEMO DATA</span></div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="problem-section container" id="overview-detail">
          <div className="problem-heading">
            <h2>Electricity bills tell you how much. <span>But do they tell you where?</span></h2>
            <div className="problem-copy">
              <p>A monthly total rarely shows which equipment is driving it. For a busy coffee shop owner, that makes it harder to spot patterns or decide where to investigate first.</p>
              <span className="data-honesty"><Icon name="info" size={16} /> SENTER is a concept-stage interface prototype. The values shown are simulated.</span>
            </div>
          </div>
          <div className="visibility-comparison">
            <div className="comparison-column traditional-column">
              <div className="comparison-title"><span className="comparison-mark"><Icon name="history" size={15} /></span><h3>Traditional monitoring</h3></div>
              <ul>
                <li><span className="comparison-line" /> Total electricity consumption</li>
                <li><span className="comparison-line" /> Limited equipment-level visibility</li>
                <li><span className="comparison-line" /> Unusual usage is difficult to isolate</li>
              </ul>
            </div>
            <div className="comparison-column senter-column">
              <div className="comparison-title"><span className="comparison-mark"><Icon name="bolt" size={15} /></span><h3>SENTER’s approach</h3></div>
              <ul>
                <li><span className="comparison-check"><Icon name="check" size={13} /></span> Individual appliance monitoring</li>
                <li><span className="comparison-check"><Icon name="check" size={13} /></span> Consumption ranking by device</li>
                <li><span className="comparison-check"><Icon name="check" size={13} /></span> Preliminary indicators and practical next steps</li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="features-section" id="features">
        <div className="container features-intro">
          <Reveal>
            <div className="features-intro-inner flex-1">
              <h2>Energy clarity,<br />built around your shop.</h2>
              <p>From electrical measurements to a clearer next step, SENTER brings an appliance-level view into one considered workspace.</p>
            </div>
          </Reveal>
        </div>
        <div className="container feature-list">
          {featureRows.map((feature, index) => (
            <Reveal key={feature.title} delay={index % 2 ? 0.05 : 0}>
              <article className={`feature-row${feature.reverse ? " feature-reverse" : ""}`}>
                <div className="feature-copy">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="feature-note">{feature.note}</span>
                </div>
                <FeatureVisual visual={feature.visual} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="how-section container" id="how-it-works">
          <div className="section-heading-row">
            <div><h2>A clear path from<br />signal to insight.</h2></div>
            <p>The proposed system connects electrical measurement points to a web dashboard. This is an architecture concept, not a deployed integration.</p>
          </div>
          <div className="process-track">
            {processSteps.map((step) => (
              <article className="process-step" key={step.number}>
                <span className="process-step-number">{step.number}</span>
                <span className="process-step-icon"><Icon name={step.icon} size={20} /></span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="architecture-note"><span className="architecture-dot" /> Proposed architecture · ESP32 · Wi-Fi · Backend · Web dashboard</div>
        </section>
      </Reveal>

      <section className="preview-section" id="dashboard-preview">
        <div className="container">
          <Reveal>
            <div className="preview-heading">
              <div><h2>From total use to<br />the equipment behind it.</h2></div>
              <p>A preview of the same simulated dashboard experience you can explore below.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <DashboardPreview />
          </Reveal>
          <div className="preview-link-row"><span>Every measurement shown is simulated.</span><Link className="text-action" href="/dashboard">Explore the dashboard <Icon name="arrow-right" size={16} /></Link></div>
        </div>
      </section>

      <Reveal>
        <section className="about-section container" id="about">
          <div className="about-rule" />
          <div><h2>Designed around the real questions behind an electricity bill.</h2></div>
          <p>SENTER (Sistem Energi Terpantau) is at concept and interface design stage. Its hardware, IoT connection, and analytical model are planned directions; this experience demonstrates how the product could help a coffee shop understand energy use.</p>
        </section>
      </Reveal>

      <section className="final-cta container">
        <div className="cta-copy"><h2 className="text-5xl">Make Every<br />Watt Count.</h2><p>Start understanding your electricity consumption, one appliance at a time.</p></div>
        <Link className="button button-primary cta-button" href="/dashboard">Open Dashboard <Icon name="arrow-up-right" size={16} /></Link>
        <div className="cta-mark" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <footer className="landing-footer">
        <div className="container footer-main">
          <div className="footer-brand"><Logo /><p>Understand Your Energy.<br />Optimize Every Watt.</p></div>
          <div className="footer-links"><span>Explore</span><a href="#features">Features</a><a href="#how-it-works">How It Works</a><Link href="/dashboard">Dashboard</Link></div>
          <div className="footer-links"><span>Project</span><a href="#about">About SENTER</a><span className="footer-note">Hackathon Deeptech 2026</span></div>
          <div className="footer-signoff"><span>BUILT FOR A MORE INFORMED ENERGY FUTURE</span><span>© 2026 SENTER</span></div>
        </div>
      </footer>
    </main>
  );
}
