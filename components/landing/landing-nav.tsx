"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { Logo } from "@/components/shared/logo";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="landing-nav-wrap">
      <nav className="landing-nav container" aria-label="Main navigation">
        <Logo />
        <div className={`landing-nav-links${open ? " is-open" : ""}`} id="landing-nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link className="button button-primary nav-dashboard" href="/dashboard">
            Dashboard <Icon name="arrow-up-right" size={15} />
          </Link>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="landing-nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={19} />
        </button>
      </nav>
    </header>
  );
}
