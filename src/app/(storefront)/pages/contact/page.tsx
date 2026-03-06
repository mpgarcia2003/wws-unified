'use client';

import { useState } from 'react';

// Note: metadata export requires server component — for client components,
// handle via generateMetadata or a parent server component layout.
// For now, metadata is handled by the parent layout/segment.

const CONTACT_METHODS = [
  {
    icon: '📞',
    title: 'Call Us',
    detail: '(844) 674-2716',
    sub: 'Mon–Fri 9am–6pm ET',
    href: 'tel:+18446742716',
  },
  {
    icon: '📧',
    title: 'Email Us',
    detail: 'support@worldwideshades.com',
    sub: 'We reply within 1 business day',
    href: 'mailto:support@worldwideshades.com',
  },
  {
    icon: '📍',
    title: 'Visit Us',
    detail: '26 Broadway Suite 934',
    sub: 'New York, NY 10004',
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // In production, this would POST to /api/contact
    // For now, simulate success
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('sent');
  };

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

      {/* Hero */}
      <section style={{
        background: '#0c0c0c', color: '#fff',
        padding: '80px 24px 64px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 16 }}>
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 16,
          }}>
            Contact World Wide Shades
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.6, maxWidth: 560 }}>
            Specialty window project? Measurement question? Need a quote? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'start' }}>

          {/* Left: contact methods */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 32,
            }}>
              Ways to Reach Us
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
              {CONTACT_METHODS.map((method) => (
                <div key={method.title} style={{
                  padding: '20px 24px',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{method.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{method.title}</p>
                    {method.href ? (
                      <a href={method.href} style={{ fontSize: 16, fontWeight: 600, color: '#c0993a', textDecoration: 'none' }}>
                        {method.detail}
                      </a>
                    ) : (
                      <p style={{ fontSize: 15, fontWeight: 600 }}>{method.detail}</p>
                    )}
                    <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{method.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '24px 28px',
              background: 'rgba(192,153,58,0.06)',
              border: '1px solid rgba(192,153,58,0.2)',
              borderRadius: 8,
            }}>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#c0993a' }}>Measurement Validation</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>
                For specialty shape orders (triangle, trapezoid, hexagon, pentagon), we offer a complimentary measurement validation call before production begins. Just order online and we&apos;ll reach out to schedule.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 32,
            }}>
              Send Us a Message
            </h2>

            {status === 'sent' ? (
              <div style={{
                padding: '40px 32px',
                background: '#fff',
                border: '1px solid #c0993a',
                borderRadius: 8,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  Thank you for reaching out. We&apos;ll get back to you within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      placeholder="(optional)"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="">Select a topic...</option>
                      <option value="measurement">Measurement question</option>
                      <option value="specialty">Specialty shape inquiry</option>
                      <option value="quote">Request a quote</option>
                      <option value="order">Order question</option>
                      <option value="installation">Installation help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    placeholder="Tell us about your project — window shape, size, location, and any questions..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '15px 32px',
                    background: status === 'sending' ? '#9ca3af' : '#0c0c0c',
                    color: '#fff',
                    fontWeight: 700, fontSize: 15,
                    border: 'none', borderRadius: 4,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  fontSize: 15,
  color: '#171717',
  background: '#fff',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};
