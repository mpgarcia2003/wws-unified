'use client';

import { useState } from 'react';

interface FAQ { q: string; a: string; }

export function ShapeFaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="lp-faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className={`lp-faq-item${openIdx === i ? ' open' : ''}`}>
          <button
            className="lp-faq-q"
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            aria-expanded={openIdx === i}
          >
            {faq.q}
            <span className="lp-faq-plus">+</span>
          </button>
          <p className="lp-faq-a">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
