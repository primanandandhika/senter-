import type { Device } from "@/types";

export function calculateCost(energyKwh: number, tariffPerKwh: number) {
  return Math.round(energyKwh * tariffPerKwh);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value).replaceAll("\u00a0", "");
}

export function formatKwh(value: number, digits = 1) {
  return `${value.toFixed(digits)} kWh`;
}

export function getDeviceCost(device: Device, tariffPerKwh: number) {
  return calculateCost(device.dailyEnergyKwh, tariffPerKwh);
}

export function getDeviceCategoryLabel(category: Device["category"]) {
  return {
    appliance: "Appliance",
    hvac: "HVAC",
    refrigeration: "Refrigeration",
    "food-prep": "Food prep",
    lighting: "Lighting",
  }[category];
}
