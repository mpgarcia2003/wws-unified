import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, ALL_BLOG_SLUGS, getBlogPost } from '../blogData';
import { SHAPE_PAGES } from '../../shades/shapeData';

export function generateStaticParams() {
  return ALL_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: { title: post.metaTitle, description: post.metaDescription, type: 'article', images: [{ url: post.heroImage }] },
    alternates: { canonical: `https://worldwideshades.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = post.relatedShapes.map((s) => SHAPE_PAGES[s]).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.heroImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'World Wide Shades', url: 'https://worldwideshades.com' },
    publisher: { '@type': 'Organization', name: 'World Wide Shades', url: 'https://worldwideshades.com' },
    mainEntityOfPage: `https://worldwideshades.com/blog/${post.slug}`,
  };

  /* Simple markdown-to-HTML: ## headings, **bold**, paragraphs */
  const contentHtml = post.content
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith('### ')) return `<h3>${trimmed.slice(4)}</h3>`;
      const withBold = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (withBold.includes('\n- ')) {
        const [intro, ...items] = withBold.split('\n- ');
        return `<p>${intro}</p><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
      }
      return `<p>${withBold}</p>`;
    })
    .join('');

  return (
    <article className="bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="bp-bread" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span className="bp-bread-current">{post.title.length > 40 ? post.title.slice(0, 40) + '...' : post.title}</span>
      </nav>

      <header className="bp-header">
        <div className="bp-meta">
          <span className="bp-cat">{post.category}</span>
          <span className="bp-read">{post.readTime}</span>
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </div>
        <h1>{post.title}</h1>
        <p className="bp-excerpt">{post.excerpt}</p>
      </header>

      <div className="bp-hero-img">
        <Image src={post.heroImage} alt={post.title} width={800} height={400} className="bp-img" priority />
      </div>

      <div className="bp-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* Related shapes */}
      {related.length > 0 && (
        <aside className="bp-related">
          <h3>Related Shade Shapes</h3>
          <div className="bp-related-grid">
            {related.map((r) => (
              <Link key={r.slug} href={`/shades/${r.slug}`} className="bp-related-card">
                <Image src={r.mask} alt={r.name} width={48} height={48} className="bp-related-img" />
                <span>{r.name}</span>
              </Link>
            ))}
          </div>
        </aside>
      )}

      <div className="bp-cta-bar">
        <p>Ready to shade your window?</p>
        <Link href="/builder" className="bp-cta">Open the Builder →</Link>
      </div>

      <style>{`
        .bp {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); max-width: 740px; margin: 0 auto; padding: 2rem 2rem 4rem;
        }
        .bp-bread { font-size: .78rem; color: var(--ink3); margin-bottom: 2rem; display: flex; gap: .4rem; flex-wrap: wrap; }
        .bp-bread a { color: var(--ink3); transition: color .2s; }
        .bp-bread a:hover { color: var(--gold-dk); }
        .bp-bread-current { color: var(--ink2); font-weight: 500; }
        .bp-header { margin-bottom: 2rem; }
        .bp-meta { display: flex; gap: .75rem; margin-bottom: 1rem; font-size: .75rem; color: var(--ink3); }
        .bp-cat { font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--gold); }
        .bp h1 { font-family: var(--fs); font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 400; line-height: 1.12; margin-bottom: .75rem; }
        .bp-excerpt { font-size: 1.05rem; color: var(--ink2); line-height: 1.7; }
        .bp-hero-img { margin-bottom: 2.5rem; border-radius: 12px; overflow: hidden; }
        .bp-img { width: 100%; height: auto; display: block; }

        .bp-content h2 { font-family: var(--fs); font-size: 1.5rem; font-weight: 400; margin: 2.5rem 0 .75rem; line-height: 1.2; }
        .bp-content h3 { font-size: 1.1rem; font-weight: 700; margin: 2rem 0 .5rem; }
        .bp-content p { font-size: 1rem; color: var(--ink2); line-height: 1.85; margin-bottom: 1.15rem; }
        .bp-content strong { color: var(--ink); font-weight: 600; }
        .bp-content ul { padding-left: 1.5rem; margin-bottom: 1.15rem; }
        .bp-content li { font-size: .95rem; color: var(--ink2); line-height: 1.7; margin-bottom: .35rem; }

        .bp-related { margin: 3rem 0; padding: 1.5rem; background: var(--cream); border-radius: 10px; }
        .bp-related h3 { font-size: .9rem; font-weight: 700; margin-bottom: 1rem; }
        .bp-related-grid { display: flex; gap: .75rem; flex-wrap: wrap; }
        .bp-related-card { display: flex; align-items: center; gap: .5rem; padding: .5rem .75rem; background: var(--white); border: 1px solid var(--sand); border-radius: 8px; font-size: .82rem; font-weight: 500; transition: all .2s; }
        .bp-related-card:hover { border-color: var(--gold); }
        .bp-related-img { width: 36px; height: 36px; object-fit: contain; filter: brightness(0) opacity(.5); }

        .bp-cta-bar { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; background: var(--ink); border-radius: 10px; margin-top: 2.5rem; }
        .bp-cta-bar p { color: rgba(255,255,255,.7); font-size: .95rem; font-weight: 500; margin: 0; }
        .bp-cta { padding: .6rem 1.4rem; background: var(--gold-dk); color: #fff; font-size: .85rem; font-weight: 600; border-radius: 7px; transition: all .2s; }
        .bp-cta:hover { background: var(--gold); }
      `}</style>
    </article>
  );
}
