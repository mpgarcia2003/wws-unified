import Link from 'next/link';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShapeOption {
  name: string;
  desc: string;
  image?: string;
}

export interface Differentiator {
  icon: string;
  title: string;
  desc: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

export interface MotorFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface SpecItem {
  label: string;
  value: string;
  column: 'specifications' | 'options';
}

export interface InstallOption {
  badge: string;
  title: string;
  desc: string;
  features: string[];
}

export interface Testimonial {
  text: string;
  author: string;
  location: string;
}

export interface ShapeLandingPageData {
  // Meta
  metaTitle: string;
  metaDescription: string;
  // Hero
  shapeName: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  ctaPrimaryText: string;
  heroMicrocopy1: string;
  heroMicrocopy2: string;
  // Qualifier
  qualifierForTitle: string;
  qualifierForText: string;
  qualifierNotTitle: string;
  qualifierNotText: string;
  // Problem / Solution
  problemLabel: string;
  problemTitle: string;
  problemQuote: string;
  solutionLabel: string;
  solutionTitle: string;
  solutionSubtitle: string;
  authorityHighlight: string;
  authorityText: string;
  // Video
  videoLabel: string;
  videoTitle: string;
  videoUrl: string;
  videoCaption: string;
  // Shapes
  shapesLabel: string;
  shapesTitle: string;
  shapesSubtitle: string;
  shapesHelpHighlight: string;
  shapesHelpText: string;
  // Measurements
  measurementDiagramUrl: string;
  measurementLabel: string;
  measurementTitle: string;
  measurementWhatTitle: string;
  measurementPromiseTitle: string;
  validationTitle: string;
  validationDesc: string;
  diagramNote: string;
  // Process
  processLabel: string;
  processTitle: string;
  processNote: string;
  // Motor
  motorLabel: string;
  motorTitle: string;
  motorNote: string;
  // Specs
  specsLabel: string;
  specsTitle: string;
  specsCol1Title: string;
  specsCol2Title: string;
  // Install
  installLabel: string;
  installTitle: string;
  installSubtitle: string;
  // Testimonials
  testimonialsLabel: string;
  testimonialsTitle: string;
  proofBadgeText: string;
  // Guarantee
  guaranteeLabel: string;
  guaranteeTitle: string;
  guaranteeNote: string;
  // Final CTA
  finalCtaTitle: string;
  finalCtaAccent: string;
  finalCtaPrimaryText: string;
  finalCtaSecondaryText: string;
  finalCtaMicrocopy: string;
  finalCtaNote: string;
  // Blocks
  painPoints: string[];
  differentiators: Differentiator[];
  shapeOptions: ShapeOption[];
  measurements: string[];
  promises: string[];
  processSteps: ProcessStep[];
  motorFeatures: MotorFeature[];
  specs: SpecItem[];
  installOptions: InstallOption[];
  testimonials: Testimonial[];
  guaranteePoints: string[];
}

// ─── Component ───────────────────────────────────────────────────────────────

const BUILDER_URL = '/builder';

export default function ShapeLandingPage({ data }: { data: ShapeLandingPageData }) {
  const specSpecs = data.specs.filter((s) => s.column === 'specifications');
  const specOptions = data.specs.filter((s) => s.column === 'options');

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1008 60%, #0c0c0c 100%)',
        color: '#fff',
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* subtle grid pattern */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(192,153,58,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {/* eyebrow */}
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#c0993a', marginBottom: 20,
          }}>
            {data.heroEyebrow}
          </p>

          {/* headline */}
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1.1,
            marginBottom: 24, maxWidth: 800,
          }}>
            {data.heroTitle}{' '}
            <em style={{ color: '#c0993a', fontStyle: 'italic' }}>{data.heroTitleAccent}</em>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#d4d0c8', maxWidth: 600, marginBottom: 40 }}>
            {data.heroSubtitle}
          </p>

          {/* stats row */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            {[
              { value: data.stat1Value, label: data.stat1Label },
              { value: data.stat2Value, label: data.stat2Label },
              { value: data.stat3Value, label: data.stat3Label },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 40, fontWeight: 700, color: '#c0993a', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            <Link href={BUILDER_URL} style={{
              display: 'inline-block',
              background: '#c0993a',
              color: '#0c0c0c',
              fontWeight: 700,
              fontSize: 15,
              padding: '14px 32px',
              borderRadius: 4,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              {data.ctaPrimaryText}
            </Link>
            <Link href="/pages/contact" style={{
              color: '#d4d0c8', fontSize: 14, textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}>
              Talk to a Measurement Expert
            </Link>
          </div>

          {/* microcopy */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[data.heroMicrocopy1, data.heroMicrocopy2].map((m) => (
              <span key={m} style={{ fontSize: 13, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#c0993a' }}>✓</span> {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qualifier ──────────────────────────────────────────────── */}
      <section style={{ background: '#f7f5f0', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {[
            { title: data.qualifierForTitle, text: data.qualifierForText, accent: '#c0993a', border: '#c0993a' },
            { title: data.qualifierNotTitle, text: data.qualifierNotText, accent: '#9ca3af', border: '#e5e7eb' },
          ].map((q) => (
            <div key={q.title} style={{
              padding: '32px 36px',
              background: '#fff',
              borderLeft: `4px solid ${q.border}`,
              borderRadius: '0 8px 8px 0',
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: q.accent, marginBottom: 12 }}>
                {q.title}
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#374151' }}>{q.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.problemLabel}</p>
          <h2 style={{ ...h2Style, maxWidth: 700, marginBottom: 32 }}>{data.problemTitle}</h2>

          {/* pain points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
            {data.painPoints.map((p, i) => (
              <div key={i} style={{
                padding: '20px 24px',
                background: '#f7f5f0',
                borderRadius: 8,
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
                <span style={{ color: '#ef4444', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✗</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: '#374151' }}>{p}</span>
              </div>
            ))}
          </div>

          {/* problem quote */}
          <blockquote style={{
            borderLeft: '4px solid #c0993a',
            paddingLeft: 24,
            margin: '0 0 0 0',
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 22,
            fontStyle: 'italic',
            color: '#374151',
            lineHeight: 1.5,
          }}>
            &ldquo;{data.problemQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Solution / Differentiators ──────────────────────────────── */}
      <section style={{ background: '#0c0c0c', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ ...labelStyle, color: '#c0993a' }}>{data.solutionLabel}</p>
          <h2 style={{ ...h2Style, color: '#fff', marginBottom: 12 }}>{data.solutionTitle}</h2>
          <p style={{ color: '#9ca3af', marginBottom: 56, maxWidth: 600, lineHeight: 1.6 }}>{data.solutionSubtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {data.differentiators.map((d, i) => (
              <div key={i} style={{
                padding: '28px 32px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(192,153,58,0.2)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{d.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: 20, fontWeight: 400, color: '#fff', marginBottom: 10,
                }}>{d.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9ca3af' }}>{d.desc}</p>
              </div>
            ))}
          </div>

          {/* authority text */}
          <div style={{
            marginTop: 56,
            padding: '28px 32px',
            background: 'rgba(192,153,58,0.08)',
            border: '1px solid rgba(192,153,58,0.3)',
            borderRadius: 8,
          }}>
            <strong style={{ color: '#c0993a' }}>{data.authorityHighlight}</strong>
            <span style={{ color: '#d4d0c8' }}> — {data.authorityText}</span>
          </div>
        </div>
      </section>

      {/* ── Video ──────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#f7f5f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={labelStyle}>{data.videoLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 32 }}>{data.videoTitle}</h2>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: '#0c0c0c', aspectRatio: '16/9' }}>
            <video
              src={data.videoUrl}
              controls
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>{data.videoCaption}</p>
        </div>
      </section>

      {/* ── Shape Options ───────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.shapesLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 12 }}>{data.shapesTitle}</h2>
          <p style={{ color: '#6b7280', marginBottom: 48, lineHeight: 1.6 }}>{data.shapesSubtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
            {data.shapeOptions.map((s, i) => (
              <div key={i} style={{
                padding: '28px 24px',
                border: i === 0 ? '2px solid #c0993a' : '2px solid #e5e7eb',
                borderRadius: 12,
                textAlign: 'center',
                background: i === 0 ? 'rgba(192,153,58,0.04)' : '#fff',
              }}>
                {s.image && (
                  <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Image src={s.image} alt={s.name} width={90} height={90} style={{ objectFit: 'contain' }} />
                  </div>
                )}
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.name}</p>
                <p style={{ fontSize: 13, color: '#6b7280' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: '#6b7280' }}>
            <strong style={{ color: '#c0993a' }}>{data.shapesHelpHighlight}</strong> {data.shapesHelpText}
          </p>
        </div>
      </section>

      {/* ── Measurements ────────────────────────────────────────────── */}
      <section style={{ background: '#f7f5f0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.measurementLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 56 }}>{data.measurementTitle}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            {/* diagram */}
            <div>
              <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
                border: '1px solid #e5e7eb',
              }}>
                {data.measurementDiagramUrl ? (
                  <Image
                    src={data.measurementDiagramUrl}
                    alt={`${data.shapeName} measurement diagram`}
                    width={360}
                    height={320}
                    style={{ objectFit: 'contain', maxHeight: 300 }}
                  />
                ) : (
                  <p style={{ color: '#9ca3af', fontSize: 14 }}>Measurement diagram</p>
                )}
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>{data.diagramNote}</p>
            </div>

            {/* what to measure + promises */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{data.measurementWhatTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px' }}>
                {data.measurements.map((m, i) => (
                  <li key={i} style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: 15,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#0c0c0c', color: '#c0993a',
                      fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{data.measurementPromiseTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                {data.promises.map((p, i) => (
                  <li key={i} style={{ padding: '8px 0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#c0993a', fontSize: 16 }}>✓</span> {p}
                  </li>
                ))}
              </ul>

              {/* validation card */}
              <div style={{
                padding: '20px 24px',
                background: '#fff',
                border: '1px solid #c0993a',
                borderRadius: 8,
              }}>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#c0993a' }}>{data.validationTitle}</p>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#374151' }}>{data.validationDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.processLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 56 }}>{data.processTitle}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
            {data.processSteps.map((step, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: '#0c0c0c',
                  color: '#c0993a',
                  fontWeight: 700,
                  fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>{data.processNote}</p>
        </div>
      </section>

      {/* ── Motorization ─────────────────────────────────────────────── */}
      <section style={{ background: '#0c0c0c', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ ...labelStyle, color: '#c0993a' }}>{data.motorLabel}</p>
          <h2 style={{ ...h2Style, color: '#fff', maxWidth: 720, marginBottom: 56 }}>{data.motorTitle}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24, marginBottom: 32 }}>
            {data.motorFeatures.map((f, i) => (
              <div key={i} style={{
                padding: '24px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>{data.motorNote}</p>
        </div>
      </section>

      {/* ── Technical Specs ───────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#f7f5f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.specsLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 48 }}>{data.specsTitle}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { title: data.specsCol1Title, items: specSpecs },
              { title: data.specsCol2Title, items: specOptions },
            ].map((col) => (
              <div key={col.title}>
                <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>
                  {col.title}
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {col.items.map((spec, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 0', fontSize: 14, color: '#6b7280', width: '50%' }}>{spec.label}</td>
                        <td style={{ padding: '12px 0', fontSize: 14, fontWeight: 600, color: '#171717' }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Installation Options ─────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.installLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 12 }}>{data.installTitle}</h2>
          <p style={{ color: '#6b7280', marginBottom: 48, lineHeight: 1.6 }}>{data.installSubtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {data.installOptions.map((opt, i) => (
              <div key={i} style={{
                padding: '32px 36px',
                border: i === 0 ? '2px solid #c0993a' : '2px solid #e5e7eb',
                borderRadius: 12,
                background: i === 0 ? 'rgba(192,153,58,0.03)' : '#fff',
              }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: i === 0 ? '#c0993a' : '#0c0c0c',
                  color: i === 0 ? '#0c0c0c' : '#fff',
                  padding: '4px 12px', borderRadius: 100,
                  marginBottom: 20,
                }}>
                  {opt.badge}
                </span>
                <h3 style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontSize: 22, fontWeight: 400, marginBottom: 12 }}>{opt.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>{opt.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {opt.features.map((f, j) => (
                    <li key={j} style={{ padding: '8px 0', fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 10, borderBottom: '1px solid #f0f0ee' }}>
                      <span style={{ color: '#c0993a', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section style={{ background: '#f7f5f0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={labelStyle}>{data.testimonialsLabel}</p>
          <h2 style={{ ...h2Style, marginBottom: 16 }}>{data.testimonialsTitle}</h2>
          <p style={{ color: '#6b7280', marginBottom: 48, maxWidth: 640, lineHeight: 1.6 }}>{data.proofBadgeText}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {data.testimonials.map((t, i) => (
              <div key={i} style={{
                padding: '32px 36px',
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ color: '#c0993a', fontSize: 24, marginBottom: 16, lineHeight: 1 }}>&ldquo;</div>
                <p style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: 17, lineHeight: 1.7, color: '#374151', marginBottom: 24,
                }}>
                  {t.text}
                </p>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{t.author}</p>
                  <p style={{ fontSize: 13, color: '#9ca3af' }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee ────────────────────────────────────────────────── */}
      <section style={{ background: '#0c0c0c', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ ...labelStyle, color: '#c0993a' }}>{data.guaranteeLabel}</p>
          <h2 style={{ ...h2Style, color: '#fff', marginBottom: 48 }}>{data.guaranteeTitle}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
            {data.guaranteePoints.map((g, i) => (
              <div key={i} style={{
                padding: '20px 24px',
                background: 'rgba(192,153,58,0.08)',
                border: '1px solid rgba(192,153,58,0.2)',
                borderRadius: 8,
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <span style={{ color: '#c0993a', fontSize: 18, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 15, color: '#d4d0c8', lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>{data.guaranteeNote}</p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1008 0%, #0c0c0c 100%)',
        color: '#fff',
        padding: '100px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 400, lineHeight: 1.2,
            marginBottom: 32,
          }}>
            {data.finalCtaTitle}{' '}
            <em style={{ color: '#c0993a' }}>{data.finalCtaAccent}</em>
          </h2>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <Link href={BUILDER_URL} style={{
              display: 'inline-block',
              background: '#c0993a',
              color: '#0c0c0c',
              fontWeight: 700,
              fontSize: 16,
              padding: '16px 36px',
              borderRadius: 4,
              textDecoration: 'none',
            }}>
              {data.finalCtaPrimaryText}
            </Link>
            <Link href="/pages/contact" style={{
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              padding: '16px 28px',
              borderRadius: 4,
              textDecoration: 'none',
            }}>
              {data.finalCtaSecondaryText}
            </Link>
          </div>

          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{data.finalCtaMicrocopy}</p>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>{data.finalCtaNote}</p>
        </div>
      </section>

      {/* ── Responsive styles ────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .slp-grid-2 { grid-template-columns: 1fr !important; }
          .slp-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .slp-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Shared style helpers ──────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#c0993a',
  marginBottom: 12,
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
  fontSize: 'clamp(26px, 4vw, 44px)',
  fontWeight: 400,
  lineHeight: 1.15,
  marginBottom: 24,
};
