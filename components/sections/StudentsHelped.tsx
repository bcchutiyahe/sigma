'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 47, suffix: '', label: 'Students helped this week', sub: 'Updated regularly', highlight: true },
  { number: 10000, suffix: '+', label: 'Total students guided', sub: 'Since 2012', highlight: false },
  { number: 200, suffix: '+', label: 'Partner colleges', sub: 'India & abroad', highlight: false },
  { number: 100, suffix: '%', label: 'Free service', sub: 'No hidden charges', highlight: false },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = Math.round(eased * target)
      setCount(val)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])

  const display = target >= 1000 ? `${Math.round(count / 1000)}k` : `${count}`
  return <>{display}{suffix}</>
}

export default function StudentsHelped() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: 'white', padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                padding: '22px 18px',
                background: stat.highlight ? 'var(--navy)' : 'var(--cream)',
                border: stat.highlight ? 'none' : '1px solid var(--border)',
                boxShadow: stat.highlight ? '0 4px 20px rgba(26,63,98,0.18)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(26px, 5vw, 36px)',
                fontWeight: 700,
                color: stat.highlight ? 'var(--gold)' : 'var(--navy)',
                marginBottom: 6, lineHeight: 1,
              }}>
                <CountUp target={stat.number} suffix={stat.suffix} active={active} />
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: stat.highlight ? 'white' : 'var(--navy)', margin: '0 0 3px' }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: stat.highlight ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', margin: 0 }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
