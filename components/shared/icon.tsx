import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "overview"
  | "devices"
  | "analytics"
  | "insights"
  | "history"
  | "settings"
  | "bell"
  | "bolt"
  | "arrow-up-right"
  | "arrow-right"
  | "chevron-down"
  | "chevron-right"
  | "search"
  | "filter"
  | "download"
  | "close"
  | "menu"
  | "shop"
  | "activity"
  | "wifi"
  | "clock"
  | "check"
  | "coffee"
  | "snowflake"
  | "wind"
  | "plug"
  | "calendar"
  | "info"
  | "logout";

const iconPaths: Record<IconName, ReactNode> = {
  overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  devices: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 7.5h6M9 11.5h6M10 16.5h4" /></>,
  analytics: <><path d="M4 19.5h16" /><path d="M6.5 16V11m5 5V5m5 11v-7" /><circle cx="6.5" cy="9" r="1" /><circle cx="11.5" cy="3.5" r="1" /><circle cx="16.5" cy="7" r="1" /></>,
  insights: <><path d="M9 18h6m-5 3h4" /><path d="M8.2 14.8a6 6 0 1 1 7.6 0c-.9.7-1.3 1.5-1.4 2.2h-4.8c-.1-.7-.5-1.5-1.4-2.2Z" /><path d="M12 5.5v3m-4-1 2 2m6-2-2 2" /></>,
  history: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /><path d="M4 5.5v4h4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z" /></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  "arrow-up-right": <><path d="M7 17 17 7M8 7h9v9" /></>,
  "arrow-right": <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  filter: <><path d="M4 6h16M7 12h10m-7 6h4" /><circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M4 17v3h16v-3" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  shop: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M9 20v-5h6v5" /></>,
  activity: <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
  wifi: <><path d="M3 9a14 14 0 0 1 18 0M6 12a9.5 9.5 0 0 1 12 0m-9 3a5 5 0 0 1 6 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  coffee: <><path d="M5 8h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z" /><path d="M17 10h1.5a2.5 2.5 0 1 1 0 5H17M8 4v2m4-2v2" /></>,
  snowflake: <><path d="M12 3v18m-7.8-13.5 15.6 9m-15.6 0 15.6-9" /><path d="m9 5 3 2 3-2M9 19l3-2 3 2M5.5 10l.2 3.5-3 1.7m18.6-5.2-.2 3.5 3 1.7" /></>,
  wind: <><path d="M3 8h12a2.5 2.5 0 1 0-2.4-3.2M3 12h17a2 2 0 1 1-1.9 2.6M3 16h10a2.5 2.5 0 1 1-2.4 3.2" /></>,
  plug: <><path d="M8 3v5m8-5v5M6 8h12v4a6 6 0 0 1-12 0V8Zm6 10v3" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M7.5 3v4M16.5 3v4M4 9h16" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></>,
  logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4m4-4H9" /></>,
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
