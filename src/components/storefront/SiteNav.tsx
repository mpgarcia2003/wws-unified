'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const SHAPE_GROUPS = [
  {
    label: 'Rectangles',
    items: [
      { name: 'Standard Rectangle', slug: 'standard-rectangle' },
    ],
  },
  {
    label: 'Triangles',
    items: [
      { name: 'Right Triangle – Left', slug: 'right-triangle-left' },
      { name: 'Right Triangle – Right', slug: 'right-triangle-right' },
      { name: 'Acute Triangle', slug: 'acute-triangle' },
    ],
  },
  {
    label: 'Trapezoids',
    items: [
      { name: 'Trapezoid – Left', slug: 'trapezoid-left' },
      { name: 'Trapezoid – Right', slug: 'trapezoid-right' },
    ],
  },
  {
    label: 'Flat Top Trapezoids',
    items: [
      { name: 'Flat Top Trap. – Right', slug: 'flat-top-trapezoid-right' },
      { name: 'Flat Top Trap. – Left', slug: 'flat-top-trapezoid-left' },
    ],
  },
  {
    label: 'Specialty',
    items: [
      { name: 'Pentagon', slug: 'pentagon' },
      { name: 'Flat Top Hexagon', slug: 'flat-top-hexagon' },
    ],
  },
];

export function SiteNav() {
  const [shapesOpen, setShapesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShapesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openDrop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShapesOpen(true);
  };
  const closeDrop = () => {
    timerRef.current = setTimeout(() => setShapesOpen(false), 180);
  };

  const closeAll = () => { setShapesOpen(false); setMobileOpen(false); };

  return (
    <>
      <nav className="sn">
        <Link href="/" className="sn-logo">
          World Wide <em>Shades</em>
        </Link>

        <div className={`sn-links ${mobileOpen ? 'sn-links--open' : ''}`}>
          <Link href="/" className="sn-link" onClick={closeAll}>Home</Link>

          {/* ── Shades by Shape dropdown ── */}
          <div className="sn-drop" ref={dropRef} onMouseEnter={openDrop} onMouseLeave={closeDrop}>
            <button
              className={`sn-link sn-drop-trigger ${shapesOpen ? 'sn-link--active' : ''}`}
              onClick={() => setShapesOpen(!shapesOpen)}
              aria-expanded={shapesOpen}
              aria-haspopup="true"
            >
              Shades by Shape
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`sn-chev ${shapesOpen ? 'sn-chev--open' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
            </button>

            <div className={`sn-dropdown ${shapesOpen ? 'sn-dropdown--open' : ''}`}>
              <div className="sn-dd-head">
                <Link href="/shades" className="sn-dd-all" onClick={closeAll}>
                  View All 10 Shapes →
                </Link>
              </div>

              <div className="sn-dd-body">
                {SHAPE_GROUPS.map((group) => (
                  <div key={group.label} className="sn-dd-group">
                    <span className="sn-dd-group-label">{group.label}</span>
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shades/${item.slug}`}
                        className="sn-dd-item"
                        onClick={closeAll}
                      >
                        <span className="sn-dd-name">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className="sn-link" onClick={closeAll}>Blog</Link>
          <Link href="/about" className="sn-link" onClick={closeAll}>About</Link>
          <Link href="/contact" className="sn-link" onClick={closeAll}>Contact</Link>

          {/* Mobile-only CTA */}
          <Link href="/builder" className="sn-cta sn-cta--mobile" onClick={closeAll}>Design Your Shade →</Link>
        </div>

        <Link href="/builder" className="sn-cta sn-cta--desktop">Design Your Shade</Link>

        <button
          className={`sn-burger ${mobileOpen ? 'sn-burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <style>{`
        /* ═══════════════ NAV BAR ═══════════════ */
        .sn {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: 64px; padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(254,253,251,.92);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,0,0,.05);
          font-family: var(--font-sans, 'DM Sans', 'Inter', -apple-system, sans-serif);
        }

        .sn-logo {
          font-family: var(--font-serif, 'Instrument Serif', 'Playfair Display', Georgia, serif);
          font-size: 1.3rem; text-decoration: none; color: #0c0c0c;
          white-space: nowrap; flex-shrink: 0;
        }
        .sn-logo em { font-style: italic; color: #c0993a; }

        /* ═══════════════ LINKS ROW ═══════════════ */
        .sn-links {
          display: flex; align-items: center; gap: .15rem;
        }
        .sn-link {
          padding: .5rem .9rem; font-size: .85rem; font-weight: 500;
          color: #444; border-radius: 6px; transition: all .2s;
          background: none; border: none; cursor: pointer;
          font-family: inherit; display: inline-flex; align-items: center;
          gap: .35rem; text-decoration: none; white-space: nowrap;
        }
        .sn-link:hover, .sn-link--active { background: rgba(0,0,0,.04); color: #0c0c0c; }

        .sn-chev { transition: transform .25s ease; }
        .sn-chev--open { transform: rotate(180deg); }

        /* ═══════════════ DROPDOWN ═══════════════ */
        .sn-drop { position: relative; }

        .sn-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%) translateY(-6px);
          width: 480px; background: #fefdfb;
          border: 1px solid rgba(0,0,0,.08);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,.1), 0 2px 8px rgba(0,0,0,.04);
          padding: .5rem;
          opacity: 0; pointer-events: none;
          transition: opacity .2s ease, transform .2s ease;
        }
        .sn-dropdown--open {
          opacity: 1; pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* ── Header ── */
        .sn-dd-head {
          padding: .6rem .75rem .65rem;
          border-bottom: 1px solid rgba(0,0,0,.06);
          margin-bottom: .35rem;
        }
        .sn-dd-all {
          font-size: .72rem; font-weight: 700; color: #c0993a;
          text-decoration: none; letter-spacing: .06em;
          text-transform: uppercase; transition: color .2s;
        }
        .sn-dd-all:hover { color: #9a7a2a; }

        /* ── Body ── */
        .sn-dd-body {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .25rem .5rem; padding: .25rem .25rem .5rem;
        }

        /* ── Group ── */
        .sn-dd-group { }
        .sn-dd-group-label {
          display: block;
          font-size: .65rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: #999;
          padding: .55rem .65rem .2rem;
        }

        .sn-dd-item {
          padding: .45rem .65rem; border-radius: 7px;
          text-decoration: none; transition: all .15s;
          display: flex; align-items: center; gap: .5rem;
        }
        .sn-dd-item:hover { background: #f4f1eb; }
        .sn-dd-name { font-size: .82rem; font-weight: 500; color: #333; line-height: 1.3; }
        .sn-dd-item:hover .sn-dd-name { color: #0c0c0c; }

        /* ═══════════════ CTA BUTTON ═══════════════ */
        .sn-cta {
          padding: .55rem 1.3rem; background: #0c0c0c; color: #fff;
          font-size: .82rem; font-weight: 600; border-radius: 7px;
          text-decoration: none; transition: background .2s;
          white-space: nowrap; flex-shrink: 0;
        }
        .sn-cta:hover { background: #9a7a2a; }
        .sn-cta--mobile { display: none; }
        .sn-cta--desktop { display: inline-flex; }

        /* ═══════════════ BURGER ═══════════════ */
        .sn-burger {
          display: none; background: none; border: none;
          cursor: pointer; padding: .5rem; flex-direction: column;
          gap: 5px; z-index: 10;
        }
        .sn-burger span {
          display: block; width: 22px; height: 2px;
          background: #0c0c0c; border-radius: 2px;
          transition: all .3s ease;
        }
        .sn-burger--open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .sn-burger--open span:nth-child(2) { opacity: 0; }
        .sn-burger--open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* ═══════════════ MOBILE ═══════════════ */
        @media (max-width: 768px) {
          .sn { padding: 0 1.25rem; }
          .sn-burger { display: flex; }
          .sn-cta--desktop { display: none; }

          .sn-links {
            display: none; position: fixed;
            top: 64px; left: 0; right: 0; bottom: 0;
            background: #fefdfb; flex-direction: column;
            align-items: stretch; padding: 1.5rem;
            gap: .25rem; overflow-y: auto;
            border-top: 1px solid rgba(0,0,0,.06);
          }
          .sn-links--open { display: flex; }
          .sn-link { width: 100%; padding: .85rem .75rem; font-size: 1rem; justify-content: space-between; }

          .sn-dropdown {
            position: static; transform: none; width: 100%;
            box-shadow: none; border: none; background: #f7f5f0;
            border-radius: 10px; margin: .25rem 0 .5rem;
            opacity: 1; pointer-events: auto; padding: .75rem;
          }
          .sn-dd-body { grid-template-columns: 1fr; gap: 0; }
          .sn-dd-group-label { padding-top: .75rem; }
          .sn-dd-item { padding: .65rem .75rem; }
          .sn-dd-name { font-size: .9rem; }

          .sn-cta--mobile {
            display: block; text-align: center;
            margin-top: 1rem; padding: .85rem 1.5rem;
            font-size: .95rem; border-radius: 8px;
          }
        }
      `}</style>
    </>
  );
}
