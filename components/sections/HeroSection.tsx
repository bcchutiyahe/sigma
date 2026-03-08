import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0f2845 0%, var(--navy) 50%, #1e4a72 100%)',
        padding: '90px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -50, left: -50,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ color: 'var(--gold)', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
              Trusted by 10,000+ students since 2012 · Indore
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Find the Right College.
            <br />
            <span style={{ color: 'var(--gold)' }}>Get In. No Fees. No Stress.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.7,
            marginBottom: 32,
            fontFamily: 'DM Sans, sans-serif',
          }}>
            From MBA in Indore to MSc in the UK — Educational Mitra offers <strong style={{ color: 'white' }}>completely free admission counselling</strong> across 200+ partner colleges in India and abroad.
          </p>

          {/* Trust points */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 36 }}>
            {['MBA & BBA', 'B.Tech & BCA', 'MBBS & Medical', 'Law Colleges', 'Study Abroad UK/USA'].map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>
                <CheckCircle size={15} style={{ color: 'var(--gold)' }} />
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <a
              href="https://wa.me/917909500055?text=Hi%20Educational%20Mitra%2C%20I%20want%20free%20admission%20counselling"
              target="_blank"
              rel="noopener"
              className="btn-gold"
              style={{ fontSize: 16, padding: '14px 32px' }}
            >
              Get Free Counselling
              <ArrowRight size={18} />
            </a>
            <Link href="/universities" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: 16, padding: '14px 32px' }}>
              Browse Universities
            </Link>
          </div>

          {/* Stats row */}
          <style>{`
            .em-hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); }
            @media (min-width: 560px) { .em-hero-stats { grid-template-columns: repeat(4, 1fr); } }
          `}</style>
          <div className="em-hero-stats" style={{
            gap: 0,
            marginTop: 48,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {[
              { num: '10,000+', label: 'Students Guided' },
              { num: '200+', label: 'Partner Colleges' },
              { num: '13+', label: 'Years Experience' },
              { num: '100%', label: 'Free Counselling' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 12px',
                  textAlign: 'center',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: 26, fontWeight: 700 }}>
                  {stat.num}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
