'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { localUniversities } from '@/lib/universities/local'
import { nationalUniversities } from '@/lib/universities/national'
import { internationalUniversities } from '@/lib/universities/international'
import UniLogo from '@/components/ui/UniLogo'

const tabs = [
  {
    id: 'national',
    label: '🇮🇳 National',
    sublabel: 'Indore, MP & across India',
    data: [...localUniversities, ...nationalUniversities].slice(0, 6),
  },
  {
    id: 'international',
    label: '✈️ International',
    sublabel: 'UK, Canada, Europe & more',
    data: internationalUniversities.slice(0, 6),
  },
]

export default function UniversityPreview() {
  const [active, setActive] = useState('national')
  const [loading, setLoading] = useState(false)
  const [displayed, setDisplayed] = useState(tabs[0].data)

  const switchTab = (id: string) => {
    if (id === active) return
    setLoading(true)
    setTimeout(() => {
      setActive(id)
      setDisplayed(tabs.find(t => t.id === id)!.data)
      setLoading(false)
    }, 420)
  }

  return (
    <section style={{ padding: '88px 0', background: 'white' }}>
      <style>{`
        .up-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border-radius: 14px;
          font-family: DM Sans, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          max-width: 220px;
          min-width: 140px;
          gap: 2px;
        }
        .up-tab-btn.active {
          background: var(--navy);
          border: 2px solid var(--navy);
          box-shadow: 0 6px 20px rgba(26,63,98,0.25);
        }
        .up-tab-btn.inactive {
          background: white;
          border: 2px solid #cbd5e1;
        }
        .up-tab-btn.inactive:hover {
          border-color: var(--navy);
          background: rgba(26,63,98,0.04);
        }
        .up-tab-label { font-size: 16px; font-weight: 700; }
        .up-tab-btn.active .up-tab-label { color: white; }
        .up-tab-btn.inactive .up-tab-label { color: var(--navy); }
        .up-tab-sublabel { font-size: 12px; font-weight: 400; }
        .up-tab-btn.active .up-tab-sublabel { color: rgba(255,255,255,0.7); }
        .up-tab-btn.inactive .up-tab-sublabel { color: var(--text-muted); }

        .up-grid-loading {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .up-grid-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .up-skeleton {
          background: #f1f5f9;
          border-radius: 14px;
          height: 160px;
          position: relative;
          overflow: hidden;
        }
        .up-skeleton::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          animation: up-shimmer 1.1s infinite;
        }
        @keyframes up-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge-navy" style={{ marginBottom: 12, display: 'inline-block' }}>200+ Partner Colleges</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--navy)', marginBottom: 12 }}>
            Explore Our University Partners
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            From top colleges in Indore to globally ranked universities — we cover them all.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`up-tab-btn ${active === t.id ? 'active' : 'inactive'}`}
            >
              <span className="up-tab-label">{t.label}</span>
              <span className="up-tab-sublabel">{t.sublabel}</span>
            </button>
          ))}
        </div>

        {/* Skeleton shimmer while loading */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="up-skeleton" />
            ))}
          </div>
        ) : (
          <div
            className="up-grid-visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 20 }}
          >
            {displayed.map(uni => (
              <Link key={uni.slug} href={`/universities/${uni.slug}`} style={{ textDecoration: 'none' }}>
                <div className="uni-card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                    <UniLogo website={uni.website} name={uni.name} size={44} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: 'var(--navy)', marginBottom: 4, lineHeight: 1.3 }}>
                        {uni.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13 }}>
                        <MapPin size={12} />
                        {uni.city}{uni.state && uni.state !== uni.city ? `, ${uni.state}` : ''}
                      </div>
                    </div>
                    {uni.naac && uni.naac !== 'N/A' && (
                      <span className="badge-gold" style={{ fontSize: 11, flexShrink: 0 }}>NAAC {uni.naac}</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {uni.courses.slice(0, 3).map(c => (
                      <span key={c.name} style={{ background: 'rgba(26,63,98,0.06)', color: 'var(--navy)', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>
                        {c.name}
                      </span>
                    ))}
                    {uni.courses.length > 3 && (
                      <span style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold-dark)', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>
                        +{uni.courses.length - 3} more
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{uni.type}</span>
                    <span style={{ color: 'var(--navy)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link href="/universities" className="btn-primary">
            View All Universities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
