"use client";

import { useState, type FormEvent } from "react";
import { useDemoPreferences } from "@/components/shared/demo-provider";
import { Icon } from "@/components/shared/icon";
import { DEFAULT_TARIFF_RP_PER_KWH } from "@/types";
import { calculateCost, formatRupiah } from "@/lib/energy";
import { totalDemoEnergyKwh } from "@/lib/demo-data";

export function SettingsView() {
  const preferences = useDemoPreferences();
  const initial = {
    shopName: preferences.shopName,
    address: preferences.address,
    tariff: preferences.tariff,
    showActivity: preferences.showActivity,
    showInsights: preferences.showInsights,
  };
  return <SettingsForm initial={initial} />;
}

function SettingsForm({ initial }: { initial: { shopName: string; address: string; tariff: number; showActivity: boolean; showInsights: boolean } }) {
  const { update, reset } = useDemoPreferences();
  const initialKey = JSON.stringify(initial);
  const [previousInitialKey, setPreviousInitialKey] = useState(initialKey);
  const [draft, setDraft] = useState(initial);
  if (initialKey !== previousInitialKey) {
    setPreviousInitialKey(initialKey);
    setDraft(initial);
  }
  const draftName = draft.shopName;
  const draftAddress = draft.address;
  const draftTariff = draft.tariff;
  const draftShowActivity = draft.showActivity;
  const draftShowInsights = draft.showInsights;
  const setDraftName = (shopName: string) => setDraft((current) => ({ ...current, shopName }));
  const setDraftAddress = (address: string) => setDraft((current) => ({ ...current, address }));
  const setDraftTariff = (tariff: number) => setDraft((current) => ({ ...current, tariff }));
  const setDraftShowActivity = (showActivity: boolean) => setDraft((current) => ({ ...current, showActivity }));
  const setDraftShowInsights = (showInsights: boolean) => setDraft((current) => ({ ...current, showInsights }));
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draftName.trim()) {
      setErrorMessage("Enter a business name before saving.");
      setSavedMessage("");
      return;
    }
    if (!Number.isFinite(draftTariff) || draftTariff < 0) {
      setErrorMessage("Enter a valid tariff of zero or more rupiah per kWh.");
      setSavedMessage("");
      return;
    }
    update({ shopName: draftName, address: draftAddress, tariff: draftTariff, showActivity: draftShowActivity, showInsights: draftShowInsights });
    setErrorMessage("");
    setSavedMessage("Preferences saved to this browser.");
  };

  const resetSettings = () => {
    reset();
    setDraftName("Kedai Kopi Demo");
    setDraftAddress("Jakarta, Indonesia");
    setDraftTariff(DEFAULT_TARIFF_RP_PER_KWH);
    setDraftShowActivity(true);
    setDraftShowInsights(true);
    setErrorMessage("");
    setSavedMessage("Demo preferences restored.");
  };

  return (
    <div className="dashboard-page settings-page">
      <div className="page-heading">
        <div><h1>Settings</h1><p>Adjust the demo business profile and tariff used for cost estimates.</p></div>
        <span className="demo-note"><i /> LOCAL DEMO <span>Saved in this browser</span></span>
      </div>
      <form className="settings-form" onSubmit={saveSettings}>
        <section className="settings-section" aria-labelledby="business-settings-title">
          <div className="settings-section-intro"><span className="settings-section-icon"><Icon name="shop" size={18} /></span><div><h2 id="business-settings-title">Business profile</h2><p>These details identify the simulated workspace.</p></div></div>
          <div className="settings-fields">
            <label className="form-field"><span>Business name</span><input value={draftName} onChange={(event) => setDraftName(event.target.value)} required maxLength={60} /></label>
            <label className="form-field"><span>Business type</span><div className="read-only-field"><Icon name="coffee" size={16} /> Coffee shop <small>Prototype focus</small></div></label>
            <label className="form-field field-full"><span>Location</span><input value={draftAddress} onChange={(event) => setDraftAddress(event.target.value)} maxLength={100} placeholder="City, Indonesia" /></label>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="tariff-settings-title">
          <div className="settings-section-intro"><span className="settings-section-icon tone-amber"><Icon name="analytics" size={18} /></span><div><h2 id="tariff-settings-title">Electricity tariff</h2><p>Set the demo rate used in estimated electricity costs.</p></div></div>
          <div className="tariff-settings-row">
            <label className="form-field tariff-input"><span>Tariff per kilowatt-hour</span><span className="currency-input"><span>Rp</span><input type="number" inputMode="numeric" min="0" step="1" value={draftTariff} onChange={(event) => setDraftTariff(Number(event.target.value))} required /><span>/ kWh</span></span><small>Current demo default: Rp1,475/kWh. This is not a verified current utility tariff.</small></label>
            <div className="tariff-preview"><span>Estimated cost for sample day</span><strong>{formatRupiah(calculateCost(totalDemoEnergyKwh, draftTariff || 0))}</strong><small>24.8 kWh × {formatRupiah(draftTariff || 0)} / kWh</small></div>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="monitoring-settings-title">
          <div className="settings-section-intro"><span className="settings-section-icon tone-teal"><Icon name="activity" size={18} /></span><div><h2 id="monitoring-settings-title">Monitoring preferences</h2><p>Choose which simulated examples appear in this workspace.</p></div></div>
          <div className="preference-list">
            <label className="preference-toggle"><span><b>Show simulated activity notifications</b><small>Display the sample activity control in the dashboard header.</small></span><input type="checkbox" checked={draftShowActivity} onChange={(event) => setDraftShowActivity(event.target.checked)} /><i aria-hidden="true" /></label>
            <label className="preference-toggle"><span><b>Show preliminary insight examples</b><small>Display simulated indicators on the Insights page.</small></span><input type="checkbox" checked={draftShowInsights} onChange={(event) => setDraftShowInsights(event.target.checked)} /><i aria-hidden="true" /></label>
          </div>
        </section>

        <section className="settings-section account-settings" aria-labelledby="account-settings-title">
          <div className="settings-section-intro"><span className="settings-section-icon"><Icon name="settings" size={18} /></span><div><h2 id="account-settings-title">Demo account</h2><p>Prototype access has no sign-in or server-side account.</p></div></div>
          <div className="demo-account-row"><span className="profile-avatar">KD</span><span><b>Demo owner</b><small>Local browser session · no account credentials</small></span><span className="small-tag">PROTOTYPE</span></div>
        </section>

        <div className="settings-actions">
          <div className="settings-feedback" aria-live="polite" role={errorMessage ? "alert" : "status"}>{errorMessage || savedMessage}</div>
          <div><button className="button button-quiet" type="button" onClick={resetSettings}>Reset demo preferences</button><button className="button button-primary" type="submit"><Icon name="check" size={15} /> Save preferences</button></div>
        </div>
      </form>
      <p className="sample-footnote"><Icon name="info" size={14} /> Your settings are stored in local browser storage and do not sync to a backend.</p>
    </div>
  );
}
