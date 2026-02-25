import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="nf">
      <div className="nf-glow" aria-hidden="true" />
      <div className="nf-inner">
        <span className="nf-code">404</span>
        <h1>This Window Shape<br />Doesn&apos;t Exist. <em>Yet.</em></h1>
        <p>The page you&apos;re looking for isn&apos;t here. But we do make shades for 10 window shapes — maybe you were looking for one of these?</p>
        <div className="nf-links">
          <Link href="/" className="nf-cta">Back to Home</Link>
          <Link href="/shades" className="nf-ghost">Browse All Shapes →</Link>
          <Link href="/builder" className="nf-ghost">Open the Builder →</Link>
        </div>
      </div>

      <style>{`
        .nf {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink);
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 4rem 2rem; text-align: center; position: relative; overflow: hidden;
        }
        .nf-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 80vw; height: 80vw;
          background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream), rgba(192,153,58,.06), var(--cream));
          border-radius: 50%; filter: blur(100px); z-index: 0;
        }
        .nf-inner { position: relative; z-index: 1; max-width: 500px; }
        .nf-code { font-family: var(--fs); font-size: clamp(4rem, 10vw, 8rem); color: var(--sand); line-height: 1; display: block; margin-bottom: 1rem; }
        .nf h1 { font-family: var(--fs); font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 400; line-height: 1.15; margin-bottom: 1rem; }
        .nf h1 em { font-style: italic; color: var(--gold-dk); }
        .nf p { font-size: 1rem; color: var(--ink2); line-height: 1.7; margin-bottom: 2rem; }
        .nf-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .nf-cta { padding: .8rem 1.8rem; background: var(--ink); color: #fff; font-weight: 600; font-size: .9rem; border-radius: 8px; transition: all .3s; }
        .nf-cta:hover { background: var(--gold-dk); transform: translateY(-2px); }
        .nf-ghost { font-size: .88rem; font-weight: 600; color: var(--ink2); border-bottom: 1.5px solid var(--sand); padding-bottom: 2px; transition: all .2s; display: flex; align-items: center; }
        .nf-ghost:hover { color: var(--gold-dk); border-color: var(--gold); }
      `}</style>
    </div>
  );
}
