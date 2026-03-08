import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Globe, ExternalLink, CheckCircle, Building2, Award, ArrowRight } from 'lucide-react'
import { allUniversities, getUniversityBySlug, getSimilarUniversities } from '@/lib/universities'

export async function generateStaticParams() {
  return allUniversities.map(u => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const uni = getUniversityBySlug(slug)
  if (!uni) return {}
  return {
    title: `${uni.name} — Courses, Eligibility & Admissions`,
    description: `${uni.name} in ${uni.city} — ${uni.about.slice(0, 140)}. Contact Educational Mitra for free admission guidance.`,
    alternates: { canonical: `https://educationalmitra.in/universities/${slug}` },
    openGraph: {
      title: `${uni.name} | Educational Mitra`,
      description: `${uni.about.slice(0, 140)}`,
    },
  }
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const uni = getUniversityBySlug(slug)
  if (!uni) notFound()

  const similar = getSimilarUniversities(uni, 3)
  const ugCourses = uni.courses.filter(c => c.level === 'UG')
  const pgCourses = uni.courses.filter(c => c.level === 'PG')
  const diplomaCourses = uni.courses.filter(c => c.level === 'Diploma' || c.level === 'Research')

  const waText = encodeURIComponent(`Hi Educational Mitra! I want admission guidance for ${uni.name}.`)

  const uniSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: uni.name,
    url: uni.website || `https://educationalmitra.in/universities/${uni.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: uni.city,
      addressRegion: uni.state,
      addressCountry: uni.country === 'India' ? 'IN' : uni.country,
    },
    foundingDate: uni.established.toString(),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(uniSchema) }} />

      {/* HERO */}
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <Link href="/universities" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none' }}>Universities</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: 'var(--gold)', fontSize: 13 }}>{uni.name}</span>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
            <span style={{ background: 'rgba(201,168,76,0.2)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.4)', padding: '3px 12px', borderRadius: 20, fontSize: 13 }}>
              {uni.section === 'local' ? 'Indore / MP' : uni.section === 'national' ? 'National' : 'International'}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '3px 12px', borderRadius: 20, fontSize: 13 }}>
              {uni.type}
            </span>
            {uni.naac && uni.naac !== 'N/A' && (
              <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '3px 12px', borderRadius: 20, fontSize: 13 }}>
                NAAC: {uni.naac}
              </span>
            )}
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,44px)', color: 'white', marginBottom: 12, lineHeight: 1.2 }}>
            {uni.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
            <MapPin size={16} />
            {uni.city}{uni.state ? `, ${uni.state}` : ''}{uni.country !== 'India' ? `, ${uni.country}` : ''}
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'Established', val: uni.established },
              { label: 'Courses', val: uni.courses.length + '+' },
              { label: 'Type', val: uni.type.split(' ')[0] },
              ...(uni.intake && uni.intake !== '—' ? [{ label: 'Intake', val: uni.intake }] : []),
            ].map(s => (
              <div key={s.label}>
                <div style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ background: 'var(--cream)', padding: '48px 0 64px' }}>
        <div className="container">
          <div className="uni-body-grid">

            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* About */}
              <div style={{ background: 'white', borderRadius: 14, padding: 28, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 22, marginBottom: 14 }}>About</h2>
                <p style={{ color: 'var(--text-dark)', lineHeight: 1.75, fontSize: 15 }}>{uni.about}</p>
              </div>

              {/* Courses */}
              <div style={{ background: 'white', borderRadius: 14, padding: 28, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 22, marginBottom: 20 }}>Courses Offered</h2>

                {[{ label: 'Undergraduate (UG)', courses: ugCourses }, { label: 'Postgraduate (PG)', courses: pgCourses }, { label: 'Diploma / Research', courses: diplomaCourses }]
                  .filter(g => g.courses.length > 0)
                  .map(group => (
                    <div key={group.label} style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                        {group.label}
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                        {group.courses.map(c => (
                          <div key={c.name} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', background: 'var(--cream)' }}>
                            <p style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 14, marginBottom: c.specializations.length > 0 ? 8 : 0 }}>{c.name}</p>
                            {c.specializations.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {c.specializations.map(s => (
                                  <span key={s} style={{ fontSize: 11, background: 'rgba(26,63,98,0.07)', color: 'var(--navy)', padding: '2px 8px', borderRadius: 20 }}>{s}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Eligibility */}
              <div style={{ background: 'white', borderRadius: 14, padding: 28, border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 22, marginBottom: 20 }}>Eligibility Snapshot</h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Minimum eligibility criteria per course. Contact us for exact details.</p>
                <div style={{ overflowX: 'auto' }}>
                  <table className="em-table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Level</th>
                        <th>Eligibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uni.courses.map(c => (
                        <tr key={c.name}>
                          <td style={{ fontWeight: 500 }}>{c.name}</td>
                          <td><span className="badge-navy">{c.level}</span></td>
                          <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTA Banner */}
              <div style={{ background: 'var(--navy)', borderRadius: 14, padding: 32, textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 22, marginBottom: 10 }}>
                  Want Admission Guidance for {uni.name}?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20, fontSize: 15 }}>
                  Talk to our counsellor — free, personalised, and instant.
                </p>
                <a href={`https://wa.me/917909500055?text=${waText}`} target="_blank" rel="noopener" className="btn-gold">
                  WhatsApp Our Counsellor <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Quick CTA */}
              <div style={{ background: 'var(--gold)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                <p style={{ color: 'white', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Get Free Admission Help</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 16 }}>For {uni.name}</p>
                <a href={`https://wa.me/917909500055?text=${waText}`} target="_blank" rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'white', color: 'var(--navy)', padding: '11px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  WhatsApp Now
                </a>
              </div>

              {/* Highlights */}
              {uni.highlights.length > 0 && (
                <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid var(--border)' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 18, marginBottom: 16 }}>
                    <Award size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--gold)' }} />
                    Highlights
                  </h3>
                  {uni.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                      <CheckCircle size={15} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: 'var(--text-dark)', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Facilities */}
              {uni.facilities.length > 0 && (
                <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid var(--border)' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 18, marginBottom: 16 }}>
                    <Building2 size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--gold)' }} />
                    Facilities
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {uni.facilities.map(f => (
                      <span key={f} className="badge-navy" style={{ fontSize: 12 }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Official website */}
              {uni.website && (
                <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid var(--border)' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 16, marginBottom: 12 }}>
                    <Globe size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
                    Official Website
                  </h3>
                  <a href={uni.website} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--navy)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
                    <ExternalLink size={14} style={{ color: 'var(--gold)' }} />
                    {uni.website.replace('https://', '').replace('http://', '')}
                  </a>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                    ⚠️ This is Educational Mitra's own reference page, not the official university website.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Also Explore */}
          {similar.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 26, marginBottom: 20 }}>Also Explore</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {similar.map(s => (
                  <Link key={s.slug} href={`/universities/${s.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="uni-card">
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: 'var(--navy)', marginBottom: 6 }}>{s.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>
                        <MapPin size={12} /> {s.city}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {s.courses.slice(0, 3).map(c => (
                          <span key={c.name} style={{ background: 'rgba(26,63,98,0.06)', color: 'var(--navy)', fontSize: 11, padding: '2px 8px', borderRadius: 20 }}>{c.name}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
