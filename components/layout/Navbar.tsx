"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, Phone, GraduationCap, Globe, BookOpen, Users, Mail, Plane, Building2 } from "lucide-react"

const navLinks = [
  { name: "Universities", href: "/universities" },
  {
    name: "Study Abroad",
    href: "/study-abroad",
    children: [
      { name: "UK Universities", href: "/study-abroad/uk", icon: "🇬🇧", desc: "Top UK colleges & universities" },
      { name: "Global MBA & MS (1+1)", href: "/study-abroad/global-mba-ms", icon: "🌍", desc: "International dual-degree programmes" },
    ],
  },
  { name: "MBA Admissions Indore", href: "/mba-admission-indore" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

const mobileNavCards = [
  { name: "Universities", href: "/universities", icon: "🏫", desc: "200+ partner colleges in India" },
  {
    name: "Study Abroad",
    href: "/study-abroad",
    icon: "✈️",
    desc: "UK, Europe & global programmes",
    children: [
      { name: "UK Universities", href: "/study-abroad/uk", icon: "🇬🇧", desc: "Top UK colleges & universities" },
      { name: "Global MBA & MS (1+1)", href: "/study-abroad/global-mba-ms", icon: "🌍", desc: "International dual-degree programmes" },
    ],
  },
  { name: "MBA Admissions", href: "/mba-admission-indore", icon: "🎓", desc: "Top MBA colleges in Indore" },
  { name: "About Us", href: "/#about", icon: "🤝", desc: "Trusted counselling since 2012" },
  { name: "Contact", href: "/#contact", icon: "📞", desc: "Talk to our experts — free" },
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

        {/* Desktop nav */}
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
                      <span className="em-dd-icon">{child.icon}</span>
                      <div>
                        <span className="em-dd-name">{child.name}</span>
                        <span className="em-dd-desc">{child.desc}</span>
                      </div>
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

        {/* Mobile buttons */}
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
      <div id="em-mobile-menu" style={{ maxHeight: mobileOpen ? "90vh" : "0" }}>
        <div className="em-mobile-inner">
          <div className="em-mobile-grid">
            {mobileNavCards.map((item) =>
              item.children ? (
                <div key={item.name} className="em-mobile-card-wrap">
                  <button
                    className="em-mobile-card em-mobile-card-accordion"
                    onClick={() => setMobileStudyAbroad(!mobileStudyAbroad)}
                  >
                    <span className="em-mc-icon">{item.icon}</span>
                    <div className="em-mc-text">
                      <span className="em-mc-name">{item.name}</span>
                      <span className="em-mc-desc">{item.desc}</span>
                    </div>
                    <ChevronDown size={16} className={`em-mc-chevron${mobileStudyAbroad ? " open" : ""}`} />
                  </button>
                  <div className="em-mc-children" style={{ maxHeight: mobileStudyAbroad ? "300px" : "0" }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="em-mc-child"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="em-mc-child-icon">{child.icon}</span>
                        <div>
                          <span className="em-mc-child-name">{child.name}</span>
                          <span className="em-mc-child-desc">{child.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="em-mobile-card"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="em-mc-icon">{item.icon}</span>
                  <div className="em-mc-text">
                    <span className="em-mc-name">{item.name}</span>
                    <span className="em-mc-desc">{item.desc}</span>
                  </div>
                </Link>
              )
            )}
          </div>

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
        #em-header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: var(--navy);
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        #em-topbar { background: var(--gold); padding: 6px 0; }
        .em-topbar-inner { display: flex; align-items: center; justify-content: center; gap: 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; }
        .em-topbar-phone { color: white; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 5px; }
        .em-topbar-sep { color: rgba(255,255,255,0.35); }
        .em-topbar-hours { color: rgba(255,255,255,0.88); font-size: 12px; }

        .em-nav-row { display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .em-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .em-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .em-logo-img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; display: block; }
        .em-logo-name { font-family: 'Playfair Display', serif; color: white; font-size: 17px; font-weight: 600; line-height: 1.2; margin: 0; }
        .em-logo-sub { color: var(--gold); font-size: 10px; letter-spacing: 0.09em; font-family: 'DM Sans', sans-serif; margin: 0; }

        #em-desktop-nav {
          display: none;
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

        /* Desktop dropdown */
        .em-dropdown-wrap { position: relative; }
        .em-dropdown-btn { display: inline-flex; align-items: center; gap: 4px; }
        .em-dropdown-panel {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 260px;
          z-index: 200;
          background: white;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .em-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          text-decoration: none;
          transition: background 0.12s;
          border-bottom: 1px solid var(--border);
        }
        .em-dropdown-item:last-child { border-bottom: none; }
        .em-dropdown-item:hover { background: var(--cream); }
        .em-dd-icon { font-size: 20px; flex-shrink: 0; }
        .em-dd-name { display: block; font-weight: 600; font-size: 13px; color: var(--navy); }
        .em-dd-desc { display: block; font-size: 11px; color: var(--text-muted); margin-top: 1px; }
        .em-chevron-open { transform: rotate(180deg); transition: transform 0.2s; }

        /* Mobile buttons */
        #em-mobile-buttons { display: flex; align-items: center; gap: 6px; }
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

        /* Mobile menu */
        #em-mobile-menu {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          overflow: hidden;
          transition: max-height 0.32s ease;
          overflow-y: auto;
        }
        .em-mobile-inner { padding: 12px 14px 20px; }

        /* Card grid */
        .em-mobile-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .em-mobile-card-wrap { display: flex; flex-direction: column; }

        .em-mobile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          width: 100%;
          text-align: left;
        }
        .em-mobile-card:hover, .em-mobile-card:active {
          border-color: var(--navy);
          box-shadow: 0 2px 10px rgba(26,63,98,0.1);
        }
        .em-mobile-card-accordion { justify-content: flex-start; }

        .em-mc-icon { font-size: 22px; flex-shrink: 0; width: 32px; text-align: center; }
        .em-mc-text { flex: 1; min-width: 0; }
        .em-mc-name { display: block; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: var(--navy); }
        .em-mc-desc { display: block; font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        .em-mc-chevron { color: var(--text-muted); flex-shrink: 0; transition: transform 0.22s; }
        .em-mc-chevron.open { transform: rotate(180deg); }

        /* Accordion children */
        .em-mc-children {
          overflow: hidden;
          transition: max-height 0.25s ease;
          padding-left: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 6px;
        }
        .em-mc-child {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          text-decoration: none;
          transition: border-color 0.15s;
        }
        .em-mc-child:hover { border-color: var(--gold); }
        .em-mc-child-icon { font-size: 20px; flex-shrink: 0; }
        .em-mc-child-name { display: block; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: var(--navy); }
        .em-mc-child-desc { display: block; font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--text-muted); margin-top: 1px; }

        /* CTA buttons */
        .em-mobile-ctas { display: flex; flex-direction: column; gap: 10px; }
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
          background: white;
        }

        @media (min-width: 1024px) {
          #em-desktop-nav { display: flex; }
          #em-mobile-buttons { display: none; }
          #em-mobile-menu { display: none; }
        }
      `}</style>
    </header>
  )
}
