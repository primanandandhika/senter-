export type DeviceCategory =
  | "appliance"
  | "hvac"
  | "refrigeration"
  | "food-prep"
  | "lighting";

export type ConnectionStatus = "online" | "offline" | "warning";

export type InsightSeverity = "info" | "warning" | "opportunity";

export type InsightCategory =
  | "unusual-consumption"
  | "efficiency"
  | "usage-pattern"
  | "recommendation";

export interface Device {
  id: string;
  name: string;
  category: DeviceCategory;
  status: ConnectionStatus;
  currentPowerW: number;
  accumulatedEnergyKwh: number;
  estimatedCost: number;
  lastUpdated: string;
  voltage: number;
  current: number;
  powerFactor: number;
  dailyEnergyKwh: number;
}

export interface Measurement {
  id: string;
  deviceId: string;
  timestamp: string;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  cost: number;
}

export interface Insight {
  id: string;
  category: InsightCategory;
  severity: InsightSeverity;
  title: string;
  description: string;
  suggestedAction: string;
  relatedDeviceId?: string;
  confidence: "simulated" | "preliminary";
  createdAt: string;
}

export interface BusinessProfile {
  name: string;
  type: string;
  address: string;
  tariffPerKwh: number;
  currency: string;
}

export interface DashboardMetrics {
  totalEnergyKwh: number;
  estimatedCost: number;
  totalActiveDevices: number;
  currentPowerKw: number;
  costDelta: number;
  energyDelta: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  label: string;
  energyKwh: number;
  powerKw: number;
  cost: number;
}

export interface TimeRange {
  id: string;
  label: string;
  hours: number;
}

export const TIME_RANGES: TimeRange[] = [
  { id: "6h", label: "Last 6 hours", hours: 6 },
  { id: "24h", label: "Last 24 hours", hours: 24 },
  { id: "7d", label: "Last 7 days", hours: 168 },
  { id: "30d", label: "Last 30 days", hours: 720 },
];

export const DEFAULT_TARIFF_RP_PER_KWH = 1475;