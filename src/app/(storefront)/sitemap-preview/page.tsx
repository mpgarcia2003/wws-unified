'use client';

import { useState } from 'react';
import { CITIES, PRODUCTS } from '@/data/cities';
import { STATES } from '@/data/states';

type Tab = 'products' | 'cities' | 'states' | 'landing';

const LANDING_PAGES = [
  { label: 'Homepage', url: '/' },
  { label: 'Triangle Shades', url: '/pages/triangle-shades' },
  { label: 'Trapezoid Shades', url: '/pages/trapezoid-shades' },
  { label: 'Hexagon Shades', url: '/pages/hexagon-shades' },
  { label: 'Pentagon Shades', url: '/pages/pentagon-shades' },
  { label: 'Blackout Shades', url: '/pages/blackout-shades' },
  { label: 'Solar Roller Shades', url: '/pages/solar-roller-shades' },
  { label: 'Motorized Shades', url: '/pages/motorized-shades' },
  { label: 'Exterior Shades', url: '/pages/exterior-shades' },
  { label: 'Specialty Shades', url: '/pages/specialty-shades' },
  { label: 'Shade Builder', url: '/builder' },
  { label: 'FAQ', url: '/pages/faq' },
  { label: 'Contact', url: '/pages/contact' },
  { label: 'Collections', url: '/collections/all' },
  { label: 'Blog', url: '/blogs/news' },
  { label: 'Cart', url: '/cart' },
  { label: 'Sitemap Preview', url: '/sitemap-preview' },
];

const CITY_COUNT = CITIES.length;
const STATE_COUNT = STATES.length;
const PRODUCT_COUNT = PRODUCTS.length;
const CITY_PRODUCT_PAGES = CITY_COUNT * PRODUCT_COUNT;
const STATE_PRODUCT_PAGES = STATE_COUNT * PRODUCT_COUNT;
const TOTAL = CITY_PRODUCT_PAGES + STATE_PRODUCT_PAGES + LANDING_PAGES.length;

export default function SitemapPreviewPage() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [expandedState, setExpandedState] = useState<string | null>(null);

  return (
    <>
      {/* noindex — internal tool only */}
      <meta name="robots" content="noindex,nofollow" />

      <div style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        color: '#171717',
        background: '#fefdfb',
        minHeight: '100vh',
        padding: '48px 24px 80px',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 40, borderBottom: '1px solid #e5e7eb', paddingBottom: 32 }}>
            <div style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#c0993a',
              background: 'rgba(192,153,58,0.1)',
              padding: '4px 12px', borderRadius: 100,
              marginBottom: 16,
            }}>
              Internal Tool — Not Indexed
            </div>
            <h1 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400, lineHeight: 1.2,
              marginBottom: 8,
            }}>
              World Wide Shades — Full Page Directory
            </h1>
            <p style={{ color: '#6b7280', fontSize: 16 }}>
              {TOTAL.toLocaleString()}+ pages across cities, states, and products
            </p>
          </div>

          {/* Stats bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 40,
          }}>
            {[
              { value: CITY_PRODUCT_PAGES.toLocaleString(), label: 'City × Product Pages', sub: `${CITY_COUNT} cities × ${PRODUCT_COUNT} products` },
              { value: STATE_PRODUCT_PAGES.toLocaleString(), label: 'State × Product Pages', sub: `${STATE_COUNT} states × ${PRODUCT_COUNT} products` },
              { value: LANDING_PAGES.length.toString(), label: 'Landing Pages', sub: 'Static pages' },
              { value: TOTAL.toLocaleString() + '+', label: 'Total URLs', sub: 'Auto-generated at build' },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: '20px 24px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#c0993a', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '2px solid #e5e7eb' }}>
            {([
              { id: 'products', label: 'By Product' },
              { id: 'cities', label: 'By City' },
              { id: 'states', label: 'By State' },
              { id: 'landing', label: 'Landing Pages' },
            ] as { id: Tab; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? '#c0993a' : '#6b7280',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #c0993a' : '2px solid transparent',
                  marginBottom: -2,
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── BY PRODUCT tab ── */}
          {activeTab === 'products' && (
            <div>
              {PRODUCTS.map((product) => (
                <div key={product.slug} style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    {product.name}
                    <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 400 }}>
                      {CITY_COUNT} city pages + {STATE_COUNT} state pages = {CITY_COUNT + STATE_COUNT} total
                    </span>
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 6,
                    marginBottom: 12,
                  }}>
                    {CITIES.map((city) => {
                      const url = `/shades/${city.slug}/${product.slug}`;
                      return (
                        <a
                          key={city.slug}
                          href={url}
                          style={{
                            fontSize: 12,
                            color: '#374151',
                            textDecoration: 'none',
                            padding: '5px 10px',
                            background: '#f7f5f0',
                            borderRadius: 4,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span>{city.name}, {city.stateCode}</span>
                          <span style={{ color: '#9ca3af', fontSize: 10 }}>{url}</span>
                        </a>
                      );
                    })}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 6,
                  }}>
                    {STATES.map((state) => {
                      const url = `/shades/${state.slug}/${product.slug}`;
                      return (
                        <a
                          key={state.slug}
                          href={url}
                          style={{
                            fontSize: 12,
                            color: '#374151',
                            textDecoration: 'none',
                            padding: '5px 10px',
                            background: 'rgba(192,153,58,0.06)',
                            borderRadius: 4,
                            border: '1px solid rgba(192,153,58,0.15)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span>{state.name}</span>
                          <span style={{ color: '#9ca3af', fontSize: 10 }}>{url}</span>
                        </a>
                      );
                    })}
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginTop: 32 }} />
                </div>
              ))}
            </div>
          )}

          {/* ── BY CITY tab ── */}
          {activeTab === 'cities' && (
            <div>
              <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
                {CITY_COUNT} cities × {PRODUCT_COUNT} products = {CITY_PRODUCT_PAGES.toLocaleString()} pages.
                Click a city to see all 12 product URLs.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
                {CITIES.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                  <div key={city.slug}>
                    <button
                      onClick={() => setExpandedCity(expandedCity === city.slug ? null : city.slug)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: expandedCity === city.slug ? '#0c0c0c' : '#f7f5f0',
                        color: expandedCity === city.slug ? '#fff' : '#171717',
                        border: 'none',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                        textAlign: 'left',
                      }}
                    >
                      <span>{city.name}, {city.stateCode}</span>
                      <span style={{ opacity: 0.5, fontSize: 10 }}>
                        {expandedCity === city.slug ? '▲' : `${PRODUCT_COUNT} pages ▼`}
                      </span>
                    </button>
                    {expandedCity === city.slug && (
                      <div style={{ marginTop: 4, paddingLeft: 8 }}>
                        {PRODUCTS.map((product) => (
                          <a
                            key={product.slug}
                            href={`/shades/${city.slug}/${product.slug}`}
                            style={{
                              display: 'block',
                              fontSize: 12,
                              color: '#374151',
                              textDecoration: 'none',
                              padding: '5px 10px',
                              borderBottom: '1px solid #f0f0ee',
                            }}
                          >
                            /shades/{city.slug}/{product.slug}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BY STATE tab ── */}
          {activeTab === 'states' && (
            <div>
              <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
                {STATE_COUNT} states × {PRODUCT_COUNT} products = {STATE_PRODUCT_PAGES.toLocaleString()} pages.
                Click a state to see all 12 product URLs.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
                {STATES.sort((a, b) => a.name.localeCompare(b.name)).map((state) => (
                  <div key={state.slug}>
                    <button
                      onClick={() => setExpandedState(expandedState === state.slug ? null : state.slug)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: expandedState === state.slug ? '#0c0c0c' : 'rgba(192,153,58,0.06)',
                        color: expandedState === state.slug ? '#fff' : '#171717',
                        border: '1px solid rgba(192,153,58,0.2)',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                        textAlign: 'left',
                      }}
                    >
                      <span>{state.name} ({state.code})</span>
                      <span style={{ opacity: 0.5, fontSize: 10 }}>
                        {expandedState === state.slug ? '▲' : `${PRODUCT_COUNT} pages ▼`}
                      </span>
                    </button>
                    {expandedState === state.slug && (
                      <div style={{ marginTop: 4, paddingLeft: 8 }}>
                        {PRODUCTS.map((product) => (
                          <a
                            key={product.slug}
                            href={`/shades/${state.slug}/${product.slug}`}
                            style={{
                              display: 'block',
                              fontSize: 12,
                              color: '#374151',
                              textDecoration: 'none',
                              padding: '5px 10px',
                              borderBottom: '1px solid #f0f0ee',
                            }}
                          >
                            /shades/{state.slug}/{product.slug}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── LANDING PAGES tab ── */}
          {activeTab === 'landing' && (
            <div>
              <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
                {LANDING_PAGES.length} static pages — hompage, specialty shape pages, utility pages.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 8 }}>
                {LANDING_PAGES.map((page) => (
                  <a
                    key={page.url}
                    href={page.url}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: 6,
                      textDecoration: 'none',
                      color: '#171717',
                      fontSize: 14,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{page.label}</span>
                    <span style={{ color: '#9ca3af', fontSize: 12 }}>{page.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
