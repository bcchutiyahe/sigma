'use client'
import { useState } from 'react'
import { Check, X, Minus, ChevronDown } from 'lucide-react'

type Uni = {
  name: string
  location: string
  type: string
  naac: string
  ugc: boolean
  aicte: boolean
  courses: string[]
  duration: string
  eligibility: string
  placement: string
  mode: string
  hostel: boolean
  highlights: string[]
}

const universities: Record<string, Uni> = {
  sage: {
    name: 'Sage University Indore',
    location: 'Indore, MP',
    type: 'Private University',
    naac: 'A',
    ugc: true,
    aicte: true,
    courses: ['MBA', 'BBA', 'B.Tech', 'LLB', 'B.Pharm'],
    duration: '2 yrs (MBA) · 3–4 yrs (UG)',
    eligibility: 'MBA: Grad 50% · UG: 12th 45%',
    placement: '200+ recruiters · Active cell',
    mode: 'Regular',
    hostel: true,
    highlights: ['SC/ST Full Scholarship', 'Sports complex', 'AI MBA spec.'],
  },
  svvv: {
    name: 'SVVV (Shri Vaishnav)',
    location: 'Indore, MP',
    type: 'Private University',
    naac: 'A+',
    ugc: true,
    aicte: true,
    courses: ['MBA', 'BBA', 'B.Tech', 'LLB', 'M.Tech'],
    duration: '2 yrs (MBA) · 3–4 yrs (UG)',
    eligibility: 'MBA: Grad 50% · UG: 12th 45%',
    placement: '400+ companies · Strong network',
    mode: 'Regular',
    hostel: true,
    highlights: ['NAAC A+', 'IBM Collaboration', 'Healthcare MBA'],
  },
  renaissance: {
    name: 'Renaissance University',
    location: 'Indore, MP',
    type: 'Private University',
    naac: 'A',
    ugc: true,
    aicte: true,
    courses: ['MBA', 'BBA', 'B.Tech', 'LLB', 'BCA'],
    duration: '2 yrs (MBA) · 3–4 yrs (UG)',
    eligibility: 'MBA: Grad 50% · UG: 12th 45%',
    placement: '6 LPA min. guaranteed',
    mode: 'Regular',
    hostel: true,
    highlights: ['Harvard Cert. included', '6 LPA min. placement', 'Investment Banking BBA'],
  },
  lpu: {
    name: 'LPU',
    location: 'Phagwara, Punjab',
    type: 'Private University',
    naac: 'A++',
    ugc: true,
    aicte: true,
    courses: ['MBA', 'BBA', 'B.Tech', 'LLB', 'B.Pharm', 'B.Des'],
    duration: '2 yrs (MBA) · 3–4 yrs (UG)',
    eligibility: 'MBA: Grad 50% · B.Tech: 12th 60%',
    placement: '10,000+ placements/yr · Highest 2.5 Cr',
    mode: 'Regular',
    hostel: true,
    highlights: ['NAAC A++', '600-acre campus', '10k+ placements/yr'],
  },
  oxford_brookes: {
    name: 'Oxford Brookes University',
    location: 'Oxford, UK',
    type: 'Public University',
    naac: '—',
    ugc: false,
    aicte: false,
    courses: ['MBA', 'MSc Business', 'BSc', 'BA'],
    duration: '1 yr (PG) · 3 yrs (UG)',
    eligibility: 'PG: Grad 55% + IELTS 6.5',
    placement: 'UK work visa · Graduate route',
    mode: 'Regular',
    hostel: true,
    highlights: ['Russell Group adjacent', 'May 2026 intake', 'Post-study work visa'],
  },
  aston: {
    name: 'Aston University',
    location: 'Birmingham, UK',
    type: 'Public University',
    naac: '—',
    ugc: false,
    aicte: false,
    courses: ['MBA', 'MSc', 'BEng', 'BSc'],
    duration: '1 yr (PG) · 3–4 yrs (UG)',
    eligibility: 'PG: Grad 55% + IELTS 6.5',
    placement: 'UK work visa · Apr/May intake',
    mode: 'Regular',
    hostel: true,
    highlights: ['April/May 2026 intake', 'Placement year option', 'City centre campus'],
  },
}

const uniOptions = Object.entries(universities).map(([key, val]) => ({ key, name: val.name }))

const fields: { key: keyof Uni | 'ugc' | 'aicte'; label: string }[] = [
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Institution Type' },
  { key: 'naac', label: 'NAAC Grade' },
  { key: 'ugc', label: 'UGC Approved' },
  { key: 'aicte', label: 'AICTE Approved' },
  { key: 'courses', label: 'Courses Offered' },
  { key: 'duration', label: 'Duration' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'placement', label: 'Placement Support' },
  { key: 'mode', label: 'Study Mode' },
  { key: 'hostel', label: 'Hostel Available' },
  { key: 'highlights', label: 'Key Highlights' },
]

function renderVal(key: string, val: unknown) {
  if (key === 'ugc' || key === 'aicte' || key === 'hostel') {
    return val ? (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#16a34a', fontWeight: 600, fontSize: 13 }}>
        <Check size={14} /> Yes
      </span>
    ) : (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#dc2626', fontWeight: 600, fontSize: 13 }}>
        <X size={14} /> No
      </span>
    )
  }
  if (key === 'courses' && Array.isArray(val)) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {val.map((c: string) => (
          <span key={c} style={{ background: 'rgba(26,63,98,0.07)', color: 'var(--navy)', fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 500 }}>{c}</span>
        ))}
      </div>
    )
  }
  if (key === 'highlights' && Array.isArray(val)) {
    return (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {val.map((h: string) => (
          <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4, fontSize: 13, color: 'var(--text-muted)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 5 }} />
            {h}
          </li>
        ))}
      </ul>
    )
  }
  if (val === '—' || val === null || val === undefined) {
    return <Minus size={14} style={{ color: 'var(--border)' }} />
  }
  return <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{String(val)}</span>
}

export default function UniversityComparison() {
  const [selected, setSelected] = useState(['sage', 'svvv', 'renaissance'])

  const change = (idx: number, key: string) => {
    const next = [...selected]; next[idx] = key; setSelected(next)
  }
  const remove = (idx: number) => setSelected(selected.filter((_, i) => i !== idx))
  const add = () => {
    if (selected.length >= 3) return
    const next = uniOptions.find(u => !selected.includes(u.key))
    if (next) setSelected([...selected, next.key])
  }

  return (
    <section style={{ background: 'var(--cream)', padding: '88px 0', overflowX: 'hidden' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="badge-gold" style={{ marginBottom: 12, display: 'inline-block' }}>Compare & Decide</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--navy)', marginBottom: 12 }}>
            University Comparison Tool
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            Compare up to 3 universities side-by-side. Courses, eligibility, placement, and more.
          </p>
        </div>

        {/* Selectors */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
          {selected.map((key, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <ChevronDown size={14} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
              <select
                value={key}
                onChange={e => change(idx, e.target.value)}
                style={{
                  appearance: 'none',
                  paddingLeft: 32, paddingRight: 36, paddingTop: 10, paddingBottom: 10,
                  border: '2px solid rgba(201,168,76,0.4)',
                  borderRadius: 10, background: 'white',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                  color: 'var(--navy)', cursor: 'pointer', maxWidth: 220,
                }}
              >
                {uniOptions.map(u => (
                  <option key={u.key} value={u.key} disabled={selected.includes(u.key) && u.key !== key}>
                    {u.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(idx)}
                style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, display: 'flex' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {selected.length < 3 && (
            <button
              onClick={add}
              style={{ padding: '10px 20px', border: '2px dashed rgba(201,168,76,0.4)', borderRadius: 10, background: 'transparent', color: 'var(--gold-dark)', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              + Add University
            </button>
          )}
        </div>

        {/* Desktop table */}
        <div style={{ borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'none' }} className="comparison-table-desktop">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ background: 'var(--navy)', padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', width: 140 }}>
                  Feature
                </th>
                {selected.map(key => (
                  <th key={key} style={{ background: 'var(--navy)', padding: '16px 20px', textAlign: 'left', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>
                      {universities[key].name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 3, fontFamily: 'DM Sans, sans-serif' }}>
                      {universities[key].location}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <tr key={field.key} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                  <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {field.label}
                    </span>
                  </td>
                  {selected.map(key => (
                    <td key={key} style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
                      {renderVal(field.key, (universities[key] as unknown as Record<string, unknown>)[field.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="comparison-cards-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {selected.map(key => (
            <div key={key} style={{ borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'var(--navy)', padding: '16px 20px' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>
                  {universities[key].name}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: 0 }}>{universities[key].location}</p>
              </div>
              <div>
                {fields.map((field, i) => (
                  <div key={field.key} style={{ display: 'flex', padding: '12px 16px', borderBottom: i < fields.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', width: 110, flexShrink: 0, paddingTop: 2 }}>
                      {field.label}
                    </span>
                    <div style={{ flex: 1 }}>
                      {renderVal(field.key, (universities[key] as unknown as Record<string, unknown>)[field.key])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
            Not sure which to pick? Let our counsellors help you decide — for free.
          </p>
          <a
            href="https://wa.me/917909500055?text=Hi%2C%20I%20was%20comparing%20universities%20on%20your%20website%20and%20need%20help%20deciding."
            target="_blank"
            rel="noopener"
            className="btn-gold"
            style={{ fontSize: 15 }}
          >
            Get Expert Help on WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .comparison-table-desktop { display: block !important; }
          .comparison-cards-mobile { display: none !important; }
        }
      `}</style>
    </section>
  )
}
