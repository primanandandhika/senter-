# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners in Indonesia who need to understand and manage their electricity costs.

## Product Purpose

Senter helps small business owners monitor electricity use and cost, understand which devices contribute to that use, and identify opportunities to reduce waste. Success means owners can see where energy and cost are going and decide what action to take.

## Positioning

Senter combines device-level electricity monitoring, cost insights, and actionable recommendations in one workflow for small businesses.

## Operating Context

The product is Indonesia-focused. Business electricity costs are expressed using an electricity tariff in rupiah per kilowatt-hour. The current project data is simulated.

## Capabilities and Constraints

- The project data model covers devices, connection status, electrical readings, energy use, estimated costs, business tariffs, historical measurements, summary metrics, and recommendations or anomaly insights.
- Current readings and insights are simulated; the project does not establish a live device integration.
- The implementation is an early Next.js scaffold. Device connectivity, supported hardware, real tariff sourcing, recommendation validation, and the production workflows remain undecided.
- The code defines a default tariff of Rp 1,475/kWh. Treat it as a prototype default, not a verified current tariff.

## Brand Commitments

- Product name: Senter.
- Indonesia-focused market.

## Evidence on Hand

- `types/index.ts` contains the current device, measurement, business profile, dashboard metric, insight, and time-range data model.
- The data model marks insight confidence as simulated or preliminary. No live readings, customer evidence, or validated savings claims are present in the project.

## Product Principles

- Make electricity costs understandable to a small business owner.
- Connect cost and usage to individual devices where the data supports it.
- Pair observations with practical recommendations while making uncertainty clear.
- Do not present simulated readings, tariff defaults, or potential savings as verified facts.
