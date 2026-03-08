"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, Phone } from "lucide-react"

const navLinks = [
  { name: "Universities", href: "/universities" },
  {
    name: "Study Abroad",
    href: "/study-abroad",
    children: [
      { name: "UK Universities", href: "/study-abroad/uk" },
      { name: "Global MBA & MS (1+1)", href: "/study-abroad/global-mba-ms" },
    ],
  },
  { name: "MBA Admissions Indore", href: "/mba-admission-indore" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileStudyAbroad, setMobileStudyAbroad] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener("scroll", close, { passive: true })
    return () => window.removeEventListener("scroll", close)
  }, [])

  const openDropdown = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setDropdownOpen(true)
  }
  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <header id="em-header">
      {/* Gold top bar */}
      <div id="em-topbar">
        <div className="em-container em-topbar-inner">
          <a href="tel:+917909500055" className="em-topbar-phone">
            <Phone size={13} />
            +91 7909500055
          </a>
          <span className="em-topbar-sep">|</span>
          <span className="em-topbar-hours">Mon–Sat &nbsp;10 AM – 7:30 PM</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="em-container em-nav-row">
        {/* Logo */}
        <Link href="/" className="em-logo" onClick={() => setMobileOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.jpeg" alt="Educational Mitra" width={40} height={40} className="em-logo-img" />
          <div>
            <p className="em-logo-name">Educational Mitra</p>
            <p className="em-logo-sub">SINCE 2012 · INDORE</p>
          </div>
        </Link>

        {/* Desktop nav — controlled by CSS */}
        <div id="em-desktop-nav">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name} className="em-dropdown-wrap" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <button className="em-nav-link em-dropdown-btn">
                  {link.name}
                  <ChevronDown size={13} className={dropdownOpen ? "em-chevron-open" : ""} />
                </button>
                <div className="em-dropdown-panel" style={{ opacity: dropdownOpen ? 1 : 0, transform: dropdownOpen ? "translateY(0)" : "translateY(-6px)", pointerEvents: dropdownOpen ? "auto" : "none" }}>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} className="em-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.name} href={link.href} className="em-nav-link">{link.name}</Link>
            )
          )}
          <a
            href="https://wa.me/917909500055?text=Hi%20Educational%20Mitra%2C%20I%20need%20free%20counselling"
            target="_blank" rel="noopener noreferrer"
            className="btn-gold em-desktop-cta"
          >
            Free Counselling
          </a>
        </div>

        {/* Mobile buttons — controlled by CSS */}
        <div id="em-mobile-buttons">
          <a href="tel:+917909500055" aria-label="Call us" className="em-mobile-icon-btn">
            <Phone size={18} />
          </a>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="em-mobile-icon-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down */}
      <div id="em-mobile-menu" style={{ maxHeight: mobileOpen ? "80vh" : "0" }}>
        <div className="em-mobile-inner">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name}>
                <button className="em-mobile-link em-mobile-accordion" onClick={() => setMobileStudyAbroad(!mobileStudyAbroad)}>
                  <span>{link.name}</span>
                  <ChevronDown size={16} className={mobileStudyAbroad ? "em-chevron-open" : ""} />
                </button>
                <div className="em-mobile-children" style={{ maxHeight: mobileStudyAbroad ? "200px" : "0" }}>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} className="em-mobile-child" onClick={() => setMobileOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.name} href={link.href} className="em-mobile-link" onClick={() => setMobileOpen(false)}>
                {link.name}
              </Link>
            )
          )}

          <div className="em-mobile-ctas">
            <a
              href="https://wa.me/917909500055?text=Hi%20Educational%20Mitra%2C%20I%20need%20free%20counselling"
              target="_blank" rel="noopener noreferrer"
              className="btn-gold em-mobile-wa"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "white", flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp — Free Counselling
            </a>
            <a href="tel:+917909500055" className="em-mobile-call" onClick={() => setMobileOpen(false)}>
              <Phone size={16} />
              +91 7909500055
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Header shell ── */
        #em-header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: var(--navy);
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        /* ── Top bar ── */
        #em-topbar { background: var(--gold); padding: 6px 0; }
        .em-topbar-inner { display: flex; align-items: center; justify-content: center; gap: 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; }
        .em-topbar-phone { color: white; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 5px; }
        .em-topbar-sep { color: rgba(255,255,255,0.35); }
        .em-topbar-hours { color: rgba(255,255,255,0.88); font-size: 12px; }

        /* ── Nav row ── */
        .em-nav-row { display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .em-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* ── Logo ── */
        .em-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .em-logo-img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; display: block; }
        .em-logo-name { font-family: 'Playfair Display', serif; color: white; font-size: 17px; font-weight: 600; line-height: 1.2; margin: 0; }
        .em-logo-sub { color: var(--gold); font-size: 10px; letter-spacing: 0.09em; font-family: 'DM Sans', sans-serif; margin: 0; }

        /* ── Desktop nav ── */
        #em-desktop-nav {
          display: none; /* hidden on mobile */
          align-items: center;
          gap: 2px;
        }
        .em-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 7px 11px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          white-space: nowrap;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, color 0.15s;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .em-nav-link:hover { background: rgba(255,255,255,0.08); color: var(--gold); }
        .em-desktop-cta { padding: 9px 20px !important; font-size: 13px !important; margin-left: 6px; }

        /* ── Dropdown ── */
        .em-dropdown-wrap { position: relative; }
        .em-dropdown-btn { display: inline-flex; align-items: center; gap: 4px; }
        .em-dropdown-panel {
          position: absolute;
          top: 100%;
          left: 0;
          padding-top: 6px;
          min-width: 220px;
          z-index: 200;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .em-dropdown-item {
          display: block;
          padding: 11px 16px;
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.12s, color 0.12s;
          background: white;
          border: 1px solid var(--border);
        }
        .em-dropdown-item:first-child { border-radius: 12px 12px 0 0; }
        .em-dropdown-item:last-child { border-radius: 0 0 12px 12px; }
        .em-dropdown-item:hover { background: var(--cream); color: var(--gold-dark); }
        .em-chevron-open { transform: rotate(180deg); transition: transform 0.2s; }

        /* ── Mobile buttons ── */
        #em-mobile-buttons { display: flex; align-items: center; gap: 6px; } /* shown on mobile */
        .em-mobile-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        /* ── Mobile menu panel ── */
        #em-mobile-menu {
          background: white;
          border-top: 1px solid var(--border);
          overflow: hidden;
          transition: max-height 0.3s ease;
          overflow-y: auto;
        }
        .em-mobile-inner { padding: 8px 16px 20px; }
        .em-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 12px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          transition: background 0.12s;
        }
        .em-mobile-link:hover { background: rgba(201,168,76,0.07); }
        .em-mobile-accordion { width: 100%; text-align: left; }
        .em-mobile-children { overflow: hidden; transition: max-height 0.25s ease; }
        .em-mobile-child {
          display: block;
          padding: 10px 12px 10px 28px;
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          border-left: 2px solid rgba(201,168,76,0.3);
          margin-left: 12px;
          transition: color 0.12s;
        }
        .em-mobile-child:hover { color: var(--navy); }
        .em-mobile-ctas { display: flex; flex-direction: column; gap: 10px; padding-top: 14px; }
        .em-mobile-wa { justify-content: center; font-size: 15px !important; padding: 14px 20px !important; border-radius: 12px !important; display: flex !important; align-items: center !important; gap: 8px !important; }
        .em-mobile-call {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border: 1.5px solid rgba(26,63,98,0.2);
          border-radius: 12px;
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
        }

        /* ── BREAKPOINT: desktop ── */
        @media (min-width: 1024px) {
          #em-desktop-nav { display: flex; }   /* show desktop nav */
          #em-mobile-buttons { display: none; } /* hide mobile buttons */
          #em-mobile-menu { display: none; }    /* hide mobile menu entirely */
        }
      `}</style>
    </header>
  )
}
