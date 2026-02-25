import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, ALL_BLOG_SLUGS } from './blogData';

export const metadata: Metadata = {
  title: 'Blog | Window Shade Guides & Tips',
  description: 'Guides, comparisons, and tips for custom window shades — specialty shapes, fabric choices, measurement guides, and installation advice.',
  alternates: { canonical: 'https://worldwideshades.com/blog' },
};

const posts = ALL_BLOG_SLUGS.map((s) => BLOG_POSTS[s]);

export default function BlogHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'World Wide Shades Blog',
    description: 'Guides, comparisons, and tips for custom window shades.',
    url: 'https://worldwideshades.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'World Wide Shades',
      url: 'https://worldwideshades.com',
    },
  };

  return (
    <div className="blog-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bh-hero">
        <div className="bh-hero-glow" aria-hidden="true" />
        <div className="bh-hero-inner">
          <p className="bh-kicker">Guides & Tips</p>
          <h1>The World Wide Shades <em>Blog</em></h1>
          <p className="bh-sub">Everything you need to know about custom window shades — measuring specialty shapes, choosing fabrics, and getting the perfect fit.</p>
        </div>
      </section>

      <section className="bh-grid-section">
        <div className="bh-grid-inner">
          <div className="bh-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bh-card">
                <div className="bh-card-img">
                  <Image src={post.heroImage} alt={post.title} width={400} height={240} className="bh-img" />
                </div>
                <div className="bh-card-body">
                  <div className="bh-card-meta">
                    <span className="bh-cat">{post.category}</span>
                    <span className="bh-read">{post.readTime}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="bh-link">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-hub {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }
        .bh-hero { padding: 5rem 2rem 3rem; text-align: center; position: relative; overflow: hidden; }
        .bh-hero-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 80vw; height: 50vw; background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream)); border-radius: 50%; filter: blur(80px); z-index: 0; }
        .bh-hero-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .bh-kicker { font-size: .72rem; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .bh-hero h1 { font-family: var(--fs); font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; margin-bottom: 1rem; }
        .bh-hero h1 em { font-style: italic; color: var(--gold-dk); }
        .bh-sub { font-size: 1rem; color: var(--ink2); line-height: 1.7; }

        .bh-grid-section { padding: 2rem 2rem 6rem; }
        .bh-grid-inner { max-width: 1000px; margin: 0 auto; }
        .bh-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .bh-card { background: var(--white); border: 1.5px solid var(--sand); border-radius: 12px; overflow: hidden; transition: all .3s; }
        .bh-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 36px rgba(192,153,58,.08); }
        .bh-card-img { height: 200px; overflow: hidden; }
        .bh-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
        .bh-card:hover .bh-img { transform: scale(1.04); }
        .bh-card-body { padding: 1.25rem 1.5rem 1.5rem; }
        .bh-card-meta { display: flex; gap: .75rem; margin-bottom: .6rem; }
        .bh-cat { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--gold); }
        .bh-read { font-size: .7rem; color: var(--ink3); }
        .bh-card h2 { font-family: var(--ff); font-size: 1.05rem; font-weight: 700; line-height: 1.35; margin-bottom: .5rem; }
        .bh-card p { font-size: .88rem; color: var(--ink2); line-height: 1.6; margin-bottom: .75rem; }
        .bh-link { font-size: .82rem; font-weight: 600; color: var(--gold-dk); }
        .bh-card:hover .bh-link { color: var(--gold); }

        @media (max-width: 640px) { .bh-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
