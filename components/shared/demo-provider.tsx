"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { DEFAULT_TARIFF_RP_PER_KWH } from "@/types";
import { DEMO_SHOP_NAME } from "@/lib/demo-data";

type PreferenceValues = {
  shopName: string;
  address: string;
  tariff: number;
  showActivity: boolean;
  showInsights: boolean;
};

type DemoPreferences = PreferenceValues & {
  update: (values: PreferenceValues) => void;
  reset: () => void;
};

const storageKey = "senter-demo-preferences-v1";
const eventName = "senter-demo-preferences-change";
const defaults: PreferenceValues = {
  shopName: DEMO_SHOP_NAME,
  address: "Jakarta, Indonesia",
  tariff: DEFAULT_TARIFF_RP_PER_KWH,
  showActivity: true,
  showInsights: true,
};
const defaultSnapshot = JSON.stringify(defaults);
let fallbackSnapshot = defaultSnapshot;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return defaultSnapshot;
  try {
    return window.localStorage.getItem(storageKey) ?? defaultSnapshot;
  } catch {
    return fallbackSnapshot;
  }
}

function getServerSnapshot() {
  return defaultSnapshot;
}

function normalizePreferences(snapshot: string): PreferenceValues {
  try {
    const parsed = JSON.parse(snapshot) as Partial<PreferenceValues>;
    return {
      shopName: typeof parsed.shopName === "string" && parsed.shopName.trim() ? parsed.shopName : defaults.shopName,
      address: typeof parsed.address === "string" ? parsed.address : defaults.address,
      tariff: typeof parsed.tariff === "number" && Number.isFinite(parsed.tariff) && parsed.tariff >= 0 ? parsed.tariff : defaults.tariff,
      showActivity: typeof parsed.showActivity === "boolean" ? parsed.showActivity : defaults.showActivity,
      showInsights: typeof parsed.showInsights === "boolean" ? parsed.showInsights : defaults.showInsights,
    };
  } catch {
    return defaults;
  }
}

function announceChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(eventName));
}

const DemoPreferencesContext = createContext<DemoPreferences | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const preferences = useMemo(() => normalizePreferences(snapshot), [snapshot]);

  const update = useCallback((values: PreferenceValues) => {
    const next: PreferenceValues = {
      shopName: values.shopName.trim() || defaults.shopName,
      address: values.address.trim(),
      tariff: Math.max(0, Math.round(values.tariff)),
      showActivity: values.showActivity,
      showInsights: values.showInsights,
    };
    fallbackSnapshot = JSON.stringify(next);
    try { window.localStorage.setItem(storageKey, fallbackSnapshot); } catch { /* this tab still keeps the change */ }
    announceChange();
  }, []);

  const reset = useCallback(() => {
    fallbackSnapshot = defaultSnapshot;
    try { window.localStorage.removeItem(storageKey); } catch { /* this tab still resets */ }
    announceChange();
  }, []);

  const value = useMemo<DemoPreferences>(() => ({ ...preferences, update, reset }), [preferences, update, reset]);
  return <DemoPreferencesContext.Provider value={value}>{children}</DemoPreferencesContext.Provider>;
}

export function useDemoPreferences() {
  const value = useContext(DemoPreferencesContext);
  if (!value) throw new Error("useDemoPreferences must be used inside DemoProvider");
  return value;
}
