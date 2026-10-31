---
name: SENTER
description: "A dark, measured system for tracing shop electricity costs from bill totals to appliance-level action."
colors:
  void: "#000000"
  bone-white: "#ffffff"
  ash-gray: "#9a9a9a"
  silver-mist: "#bdbdbd"
  electric-iris: "#8052ff"
  saffron-spark: "#ffb829"
  deep-verdant: "#15846e"
  teal-bright: "#54c5a8"
  surface: "#08080a"
  surface-raised: "#0d0d10"
  line: "#242428"
  line-strong: "#36363b"
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(78px, 5.85vw, 84px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.045em"
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.045em"
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.025em"
rounded:
  3xl: "24px"
  full: "9999px"
spacing:
  "6": "6px"
  "12": "12px"
  "18": "18px"
  "24": "24px"
  "30": "30px"
  "36": "36px"
  "60": "60px"
  "96": "96px"
  "120": "120px"
components:
  button-primary:
    backgroundColor: "{colors.electric-iris}"
    textColor: "{colors.bone-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "#7043f0"
  button-secondary:
    backgroundColor: "#111114"
    textColor: "#f3f3f4"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "46px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ash-gray}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "46px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "#a2a2a8"
    rounded: "12px"
    size: "38px"
  search-field:
    backgroundColor: "#0c0c0f"
    textColor: "#e7e7e9"
    rounded: "9px"
    padding: "0 11px"
    height: "38px"
  nav-active:
    backgroundColor: "rgba(128,82,255,.12)"
    textColor: "#f3efff"
    rounded: "10px"
    padding: "0 12px"
    height: "42px"
  demo-status-pill:
    backgroundColor: "rgba(255,184,41,.055)"
    textColor: "#e9b84f"
    rounded: "{rounded.full}"
    padding: "7px 9px"
  data-panel:
    backgroundColor: "#09090b"
    textColor: "#e7e7ea"
    rounded: "15px"
    padding: "19px 20px"
  kpi-item:
    backgroundColor: "transparent"
    textColor: "#f5f5f6"
    padding: "17px 20px 18px"
  energy-chart:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.bone-white}"
    rounded: "15px"
    padding: "19px 20px 14px"
---

# Design System: SENTER

## Overview

**Creative North Star: "The Energy Trace"**

The interface makes a shop’s electricity costs legible as a path: from a bill-level total, through appliance readings, to a useful next action. The landing page preserves the Dala-inspired black-void composition and oversized type, then gives that space a code-drawn energy constellation. Its generous opening and asymmetric text-and-visual balance make the energy story feel clear before the visitor enters the product.

Inside the dashboard, the same dark field becomes a measured workspace. Compact labels, tabular readings, fine dividers, and restrained panels help owners compare use and estimated cost. Readings, estimates, and preliminary insights remain visibly identified as simulated; the interface does not imply live device integration or verified savings.

**Key Characteristics:**
- A black-void canvas with white and silver Inter typography.
- Violet for action and measurement, amber for caution or emphasis, and teal for positive status.
- Open, oversized landing typography paired with a compact, scannable dashboard.
- Authored SVG energy visuals and clearly labeled simulated data.

## Colors

The palette keeps the original dark-stage character and gives the dashboard's measurements distinct, consistent signal roles.

### Primary
- **Electric Iris:** Primary actions, active navigation, and measured energy marks. Keep it concentrated on interactions and data signals.

### Secondary
- **Saffron Spark:** Caution, uncertainty, and editorial emphasis. Use it to make data caveats and attention labels easy to notice.

### Tertiary
- **Deep Verdant:** A deeper green accent for positive status and supporting energy marks.
- **Bright Teal:** The brighter positive-state signal used for connected or favorable readings.

### Neutral
- **Void:** The main landing canvas and the foundation of the dark visual world.
- **Bone White:** Primary headings, important values, and active text.
- **Ash Gray:** Secondary navigation, supporting labels, and quiet utility text.
- **Silver Mist:** Supporting body copy and tertiary information.
- **Dark Surface:** A subtle work surface behind dashboard data groups.
- **Raised Surface:** A slightly lifted dark tone for small overlays and nested content.
- **Quiet Line:** Fine rules between metrics, rows, and panels.
- **Strong Line:** A more visible boundary for interactive edges and overlays.

### Named Rules
**The Three Signal Rule.** Keep violet for action or measurement, amber for caution or emphasis, and teal for positive status. Do not swap these roles for decoration.

## Typography

**Display Font:** Inter (with the system sans-serif stack)  
**Body Font:** Inter (with the system sans-serif stack)  
**Label Font:** Inter.

**Character:** The single sans family keeps the interface direct and contemporary. Regular-weight display type relies on scale and tight tracking for presence, while smaller labels use weight and spacing to stay legible in a dense dashboard.

### Hierarchy
- **Display** (weight 400, 78–84px on wide desktop, line-height 0.99): The two-line landing headline. It steps down at narrower breakpoints, reaching 52px on compact mobile.
- **Headline** (weight 400, 48px token, line-height 1.08): Landing section titles and prominent editorial statements.
- **Title** (weight 400, 36px token, line-height 1.15): Supporting section headings and product group titles.
- **Body** (weight 400, 16px, line-height 1.5): Default reading text; landing support copy may grow slightly and use more open leading.
- **Label** (weight 600, 13px token, letter-spacing 0.025em): Navigation and concise interface labels. Eyebrows and data annotations step down in size and use wider tracking.

### Named Rules
**The Scale Carries the Headline Rule.** Keep display and major headings at regular weight; use size and tracking for emphasis rather than bold weight.

## Layout

The landing page uses a spacious asymmetric split: copy and actions occupy one side while the energy constellation anchors the other. The two-line headline stays regular-weight and large on desktop, then steps down at narrower breakpoints. The platform label sits below the actions as supporting metadata, rather than opening with an eyebrow. On narrow screens the copy and constellation stack, and the constellation follows the headline. Keep the landing container centered and capped at 1280px, with generous section gaps and clear line lengths.

The dashboard shifts to an operate-first workspace. A fixed 248px desktop navigation rail anchors a 64px sticky top bar; content begins with a four-part metric strip, then pairs the consumption chart with an appliance ranking. The dashboard content can grow to 1510px, with compact panels and rows separated by quiet rules. At tablet widths the overview collapses to one column; on mobile the rail becomes a drawer, metrics use two columns, and charts, forms, and tables stack or adapt into compact rows.

The declared spacing scale follows a 6px base with larger steps for section separation, while the current CSS also uses component-specific values. Treat the scale as a guide rather than assuming every gap and padding is normalized. The system declares responsive breakpoints at 1100px, 900px, 720px, and 420px. Use the spacious end of the rhythm on the landing page and the tighter end inside the dashboard.

### Named Rules
**The Landing Trace Rule.** Preserve the landing page’s path from bill-level uncertainty to appliance-level visibility; keep this open composition distinct from the dashboard’s denser work surface.

## Elevation & Depth

The system uses no shadows. Depth comes from the black canvas, subtly lifted near-black regions, and thin low-contrast borders. Reserve those surfaces for data groups, charts, and functional overlays; use whitespace and typography to separate landing content.

### Named Rules
**The Flat-by-Default Rule.** Keep surfaces flat at rest. Use tonal separation and borders to establish structure instead of adding shadow.

## Shapes

The original soft pill action shape remains part of the landing identity. Dashboard controls and data regions use smaller, component-specific corners: compact radii for fields and filters, moderate rounding for charts and panels, and full pills for status labels. Thin strokes define panel edges, inputs, selected states, and table boundaries. The authored energy constellation uses circular orbits, point-like nodes, and fine connecting lines as its recurring geometry.

## Components

### Buttons
Buttons feel clear and deliberate, with the filled violet pill carrying the primary action.
- **Shape:** Full pill for primary, secondary, and quiet actions.
- **Primary:** Violet fill, white text, compact uppercase-friendly typography, and a slight upward movement on hover.
- **Hover / Focus:** Shift the primary fill darker on hover. Keyboard focus uses the shared amber outline with a visible offset; disabled controls lower opacity and stop moving.
- **Secondary / Quiet:** Secondary actions use a dark fill and restrained border. Quiet actions stay transparent until hover, when the dark surface appears.

### Chips
Demo and status chips make the meaning of a reading visible at a glance.
- **Style:** Compact pill with a thin warm border and translucent amber-tinted background for the DEMO DATA marker.
- **State:** Use amber for caution and uncertainty labels. Use teal for positive status and violet for measurement categories.

### Cards / Containers
Panels frame data relationships rather than decorate the page.
- **Corner Style:** Moderate, consistent panel rounding; use compact rounding for controls and larger rounding only for the landing preview shell.
- **Background:** Use near-black panel fills against the void; reserve a slightly raised tone for nested areas and transient overlays.
- **Shadow Strategy:** Flat; see Elevation & Depth.
- **Border:** One-pixel quiet border, with stronger contrast only for focus, selection, or a dialog boundary.
- **Internal Padding:** Compact and consistent within data panels; increase breathing room for landing-page visualizations.

### Inputs / Fields
Fields use a dark inset surface, restrained gray stroke, and compact rounded corners.
- **Style:** Search, select, and date fields share a low-contrast border and dark fill.
- **Focus:** The field boundary shifts toward violet when focused; the global focus treatment is amber where the control permits the outline.
- **Error / Disabled:** Disabled buttons and controls reduce opacity and stop motion; no separate error palette is established.

### Navigation
Landing navigation is transparent and compact above the hero; the mobile menu opens as a dark, bordered popover. Dashboard navigation uses a fixed rail on desktop and a slide-in drawer on mobile. Active dashboard links receive a muted violet surface wash, while inactive links remain gray and brighten on hover.

### Signature Components
- **Energy Constellation:** Authored SVG nodes, orbits, and links turn energy flow into a landing-page visual. Keep its palette restrained to the established signal colors and its caption in readable supporting gray.
- **Energy Trace:** A pointer-responsive Canvas particle field unfolds from a shop total into appliance clusters and a waveform as visitors scroll. Keep the particle count and depth effects bounded; stage controls provide a direct keyboard and touch path.
- **Energy Chart:** A fine violet line, small focusable points, and a subdued area fill show consumption by selected interval. Keep axes and gridlines secondary to the data.
- **KPI Strip:** Four values sit in a horizontal row divided by thin rules, then reflow into a two-column grid on mobile. Use tabular numerals for quantities and estimated costs.
- **Preliminary Insight:** Expandable rows use compact tags and a quiet border. Amber identifies caution; teal identifies an opportunity. Keep uncertainty labels visible with the insight.

### Named Rules
**The Demo Clarity Rule.** Every sample reading, estimated cost, and preliminary insight stays visibly marked as simulated or demo data.

When reduced motion is requested, retain brief color, border, and opacity feedback while stopping decorative motion. The energy waveform and constellation pulse become static, the particle scene snaps between its three semantic stages without pointer rotation or idle drift, reveal movement and button lifts stop, smooth scrolling is disabled, and the mobile drawer opens without a slide transition.

## Do's and Don'ts

### Do:
- **Do** keep the black void, Inter typography, and Electric Iris as the central landing identity.
- **Do** reserve amber for caution or emphasis and teal for positive status.
- **Do** use whitespace on the landing page and thin dividers with restrained panels in the dashboard.
- **Do** keep simulated readings, estimates, and preliminary insights visibly labeled.
- **Do** use tabular numerals for measured values and preserve responsive stacking for dense data.
- **Do** keep gradients inside restrained data visualizations rather than using them as decorative fills.

### Don't:
- **Don't** present simulated readings or preliminary insights as live telemetry or verified outcomes.
- **Don't** turn the landing page into a generic SaaS hero followed by a feature-card grid.
- **Don't** use decorative shadows or large saturated-color surfaces.
- **Don't** use decorative gradients on controls or general surfaces.
- **Don't** use the violet, amber, and teal signal roles interchangeably.
- **Don't** introduce raster photography or stock imagery into the energy visualization.

