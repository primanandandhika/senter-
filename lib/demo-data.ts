import {
  DEFAULT_TARIFF_RP_PER_KWH,
  type Device,
  type Insight,
  type Measurement,
  type TimeSeriesPoint,
} from "@/types";

export const DEMO_SHOP_NAME = "Kedai Kopi Demo";

export const demoDevices: Device[] = [
  {
    id: "air-conditioner",
    name: "Air Conditioner",
    category: "hvac",
    status: "online",
    currentPowerW: 750,
    accumulatedEnergyKwh: 8.2,
    estimatedCost: 8.2 * DEFAULT_TARIFF_RP_PER_KWH,
    lastUpdated: "14:31 WIB",
    voltage: 221.4,
    current: 3.72,
    powerFactor: 0.91,
    dailyEnergyKwh: 8.2,
  },
  {
    id: "espresso-machine",
    name: "Espresso Machine",
    category: "food-prep",
    status: "online",
    currentPowerW: 385,
    accumulatedEnergyKwh: 6.4,
    estimatedCost: 6.4 * DEFAULT_TARIFF_RP_PER_KWH,
    lastUpdated: "14:30 WIB",
    voltage: 220.8,
    current: 2.14,
    powerFactor: 0.87,
    dailyEnergyKwh: 6.4,
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    category: "refrigeration",
    status: "online",
    currentPowerW: 140,
    accumulatedEnergyKwh: 4.1,
    estimatedCost: 4.1 * DEFAULT_TARIFF_RP_PER_KWH,
    lastUpdated: "14:28 WIB",
    voltage: 219.6,
    current: 0.72,
    powerFactor: 0.89,
    dailyEnergyKwh: 4.1,
  },
  {
    id: "ice-maker",
    name: "Ice Maker",
    category: "appliance",
    status: "warning",
    currentPowerW: 95,
    accumulatedEnergyKwh: 3.5,
    estimatedCost: 3.5 * DEFAULT_TARIFF_RP_PER_KWH,
    lastUpdated: "14:25 WIB",
    voltage: 220.1,
    current: 0.51,
    powerFactor: 0.84,
    dailyEnergyKwh: 3.5,
  },
  {
    id: "coffee-grinder",
    name: "Coffee Grinder",
    category: "food-prep",
    status: "online",
    currentPowerW: 50,
    accumulatedEnergyKwh: 2.6,
    estimatedCost: 2.6 * DEFAULT_TARIFF_RP_PER_KWH,
    lastUpdated: "14:19 WIB",
    voltage: 220.3,
    current: 0.31,
    powerFactor: 0.78,
    dailyEnergyKwh: 2.6,
  },
];

export const totalDemoEnergyKwh = demoDevices.reduce(
  (total, device) => total + device.dailyEnergyKwh,
  0,
);

export const totalCurrentPowerKw =
  demoDevices.reduce((total, device) => total + device.currentPowerW, 0) / 1000;

export const demoInsights: Insight[] = [
  {
    id: "ac-reference-pattern",
    category: "unusual-consumption",
    severity: "warning",
    title: "Air conditioner usage above its reference pattern",
    description:
      "The simulated consumption data is above the configured reference during the selected period. This is a preliminary indicator, not a verified anomaly.",
    suggestedAction:
      "Review the air conditioner's operating hours and inspect its operating condition before making changes.",
    relatedDeviceId: "air-conditioner",
    confidence: "simulated",
    createdAt: "2026-10-31T14:12:00+07:00",
  },
  {
    id: "espresso-share",
    category: "usage-pattern",
    severity: "info",
    title: "Espresso machine contributes a notable share of daily use",
    description:
      "In this simulated day, the espresso machine accounts for 6.4 kWh of the illustrative 24.8 kWh total.",
    suggestedAction:
      "Compare its service schedule with warm-up and standby routines to understand when it draws power.",
    relatedDeviceId: "espresso-machine",
    confidence: "simulated",
    createdAt: "2026-10-31T13:45:00+07:00",
  },
  {
    id: "ice-maker-check",
    category: "efficiency",
    severity: "opportunity",
    title: "Check the ice maker's operating schedule",
    description:
      "The illustrative profile shows the ice maker consuming energy across several operating periods.",
    suggestedAction:
      "Check the equipment schedule and the shop's actual ice demand before changing its operating hours.",
    relatedDeviceId: "ice-maker",
    confidence: "preliminary",
    createdAt: "2026-10-31T12:30:00+07:00",
  },
  {
    id: "standby-routine",
    category: "recommendation",
    severity: "opportunity",
    title: "Review standby routines after service periods",
    description:
      "A practical review of idle time can help owners understand which equipment remains powered between service periods.",
    suggestedAction:
      "Compare equipment schedules with your shop's workflow. Keep food safety and manufacturer guidance in mind.",
    confidence: "simulated",
    createdAt: "2026-10-31T11:20:00+07:00",
  },
];

export type RecentEvent = {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: "activity" | "insights" | "devices";
  tone: "violet" | "amber" | "teal";
};

export const recentDemoEvents: RecentEvent[] = [
  {
    id: "measurement-update",
    time: "14:31 WIB",
    title: "Sample measurement updated",
    description: "Air Conditioner · 750 W · simulated",
    icon: "activity",
    tone: "violet",
  },
  {
    id: "pattern-indicator",
    time: "14:12 WIB",
    title: "Preliminary usage indicator prepared",
    description: "Air Conditioner · requires verification",
    icon: "insights",
    tone: "amber",
  },
  {
    id: "sample-usage-change",
    time: "13:58 WIB",
    title: "Sample device use changed",
    description: "Espresso Machine · illustrative reading",
    icon: "activity",
    tone: "violet",
  },
  {
    id: "device-status",
    time: "14:04 WIB",
    title: "Monitoring point status refreshed",
    description: "Ice Maker · sample connection status",
    icon: "devices",
    tone: "teal",
  },
  {
    id: "recommendation-example",
    time: "13:40 WIB",
    title: "Sample recommendation prepared",
    description: "Review standby routines · illustrative",
    icon: "insights",
    tone: "teal",
  },
];

export type ChartRange = "hourly" | "daily" | "weekly";

const hourlyValues = [
  0.46, 0.42, 0.39, 0.38, 0.4, 0.48, 0.62, 0.87, 1.1, 1.25, 1.15, 1.1,
  1.3, 1.5, 1.6, 1.55, 1.48, 1.24, 1.12, 1.0, 1.08, 1.25, 1.5, 1.5,
];
const dailyValues = [20.2, 21.5, 19.8, 23.1, 22.6, 24.0, 24.8];
const weeklyValues = [159.4, 166.2, 169.8, 173.6];

export function getEnergySeries(range: ChartRange): TimeSeriesPoint[] {
  const values = range === "hourly" ? hourlyValues : range === "daily" ? dailyValues : weeklyValues;
  const labels = range === "hourly"
    ? Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, "0")}:00`)
    : range === "daily"
      ? ["Sun 25", "Mon 26", "Tue 27", "Wed 28", "Thu 29", "Fri 30", "Today"]
      : ["Wk 1", "Wk 2", "Wk 3", "This week"];

  return values.map((energyKwh, index) => ({
    timestamp: `2026-10-${24 + index}T${String(7 + (index % 12)).padStart(2, "0")}:00:00+07:00`,
    label: labels[index],
    energyKwh,
    powerKw: range === "hourly" ? energyKwh : energyKwh / (range === "daily" ? 24 : 168),
    cost: energyKwh * DEFAULT_TARIFF_RP_PER_KWH,
  }));
}

const sampleRows: Array<{ deviceId: string; voltage: number; current: number; power: number; energy: number }> = [
  { deviceId: "air-conditioner", voltage: 221.4, current: 3.72, power: 750, energy: 0.74 },
  { deviceId: "espresso-machine", voltage: 220.8, current: 2.14, power: 385, energy: 0.41 },
  { deviceId: "refrigerator", voltage: 219.6, current: 0.72, power: 140, energy: 0.18 },
  { deviceId: "ice-maker", voltage: 220.1, current: 0.51, power: 95, energy: 0.14 },
  { deviceId: "coffee-grinder", voltage: 220.3, current: 0.31, power: 50, energy: 0.06 },
];

export const demoMeasurements: Measurement[] = Array.from({ length: 40 }, (_, index) => {
  const sample = sampleRows[index % sampleRows.length];
  const day = 31 - Math.floor(index / 5);
  const hour = 14 - Math.floor(index / 5);
  const minute = 31 - (index % 5) * 6;
  const timestamp = new Date(Date.UTC(2026, 9, day, hour - 7, minute)).toISOString();
  const energy = Number((sample.energy * (0.82 + ((index * 7) % 9) / 24)).toFixed(2));
  return {
    id: `measurement-${index + 1}`,
    deviceId: sample.deviceId,
    timestamp,
    voltage: Number((sample.voltage + ((index % 5) - 2) * 0.3).toFixed(1)),
    current: Number((sample.current + ((index % 4) - 1.5) * 0.03).toFixed(2)),
    power: Math.round(sample.power * (0.9 + ((index * 3) % 7) / 28)),
    energy,
    cost: Math.round(energy * DEFAULT_TARIFF_RP_PER_KWH),
  };
});

export const categoryLabels: Record<Device["category"], string> = {
  appliance: "Appliance",
  hvac: "HVAC",
  refrigeration: "Refrigeration",
  "food-prep": "Food prep",
  lighting: "Lighting",
};

export function deviceById(id: string) {
  return demoDevices.find((device) => device.id === id);
}
