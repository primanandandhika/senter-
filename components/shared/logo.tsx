import Link from "next/link";

type LogoProps = {
  href?: string;
  compact?: boolean;
};

export function Logo({ href = "/", compact = false }: LogoProps) {
  return (
    <Link className="brand-lockup" href={href} aria-label="SENTER home">
      <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2.75 29.25 16 16 29.25 2.75 16 16 2.75Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="m17.8 7.8-7 9.1h5.5l-1.8 7.2 7.1-9.7h-5.5l1.7-6.6Z" fill="currentColor" />
      </svg>
      {!compact && (
        <span className="brand-wordmark">
          <span>SENTER</span>
          <small>Sistem Energi Terpantau</small>
        </span>
      )}
    </Link>
  );
}
