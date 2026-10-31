---
version: 1
slug: "app-dashboard-page-tsx"
primary_target: "app/dashboard/page.tsx"
related_targets: []
---

Scope: SENTER dashboard at `/dashboard` and its Devices, Analytics, Insights, History, and Settings routes.
Mode: Operate.
Audience: Indonesian coffee shop owners reviewing electricity use between daily shop operations.
Task and success: See total usage and cost, identify the appliances driving them, inspect preliminary indicators, and adjust the tariff used for estimates.
Constraints: All values are simulated. The project has no hardware integration, validated ML model, real deployment, or verified savings data. Use existing Next.js, React, TypeScript, Tailwind CSS, and Framer Motion; add no chart or icon dependency unless necessary.

## Direction contract

THESIS: Let an owner trace the shop's simulated electricity cost into individual appliances and practical next steps in one clear workspace. Refuse a generic admin dashboard and avoid presenting simulated data as live telemetry.
OWN-WORLD: Carry the black canvas, white Inter type, violet measurement/action role, amber caution/emphasis role, and teal positive role into a denser work surface. Use quiet separators and low-contrast dark regions only to make data relationships scannable; avoid decorative cards, gradients, and oversized marketing type.
STORY: Open on the simulated Energy Overview with four metrics, a range-switchable consumption chart, device ranking, and recent simulated activity. Provide dedicated device detail, analytics comparisons, expandable preliminary insights, filterable/exportable history, and editable business/tariff settings. Calculate costs from kWh and the saved demo tariff.
FIRST VIEWPORT: At desktop, a 248px navigation rail anchors the left; a compact top bar names the coffee shop and labels DEMO DATA. The content starts with Energy Overview and a short explanation, then one four-column KPI strip. Below it, a large consumption chart and an appliance ranking sit side by side; recent activity begins beneath. On mobile, replace the rail with a touch-friendly drawer and stack these regions without horizontal page overflow.
FORM: Operate-first extension of the supplied dark visual system; standard web controls, chart interactions, filters, detail dialog, tariff form, and CSV export carry the interaction. The requested hierarchy remains binding over the rolled challengers. seed:fc547687bd33e684.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
