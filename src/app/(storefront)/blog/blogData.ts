/**
 * Blog post data — topical authority content for SEO.
 * Each post targets a keyword cluster and links back to relevant shape pages.
 */

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;           // ISO date
  updatedAt: string;
  author: string;
  category: 'guides' | 'comparisons' | 'inspiration' | 'tips';
  readTime: string;
  heroImage: string;
  excerpt: string;
  content: string;               // markdown-style content (rendered as HTML)
  relatedShapes: string[];       // slug references
  keywords: string[];
}

export const BLOG_POSTS: Record<string, BlogPost> = {

  'how-to-shade-a-frame-windows': {
    slug: 'how-to-shade-a-frame-windows',
    title: 'How to Shade A-Frame Windows (Without Losing Your Mind)',
    metaTitle: 'How to Shade A-Frame Windows | Complete Guide',
    metaDescription: 'A-frame windows are gorgeous but impossible to shade with standard products. Here\'s how to measure, choose fabrics, and order custom triangle shades that actually fit.',
    publishedAt: '2026-02-10',
    updatedAt: '2026-02-10',
    author: 'World Wide Shades',
    category: 'guides',
    readTime: '7 min read',
    heroImage: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525900/Acute_triangle_wdhqve.webp',
    excerpt: 'A-frame windows are gorgeous — until you try to shade them. Here\'s the complete guide to measuring, choosing fabrics, and ordering triangle shades that actually fit your peaked windows.',
    content: `
A-frame windows are one of the most striking architectural features in any home. Cathedral ceilings, ski cabins, modern A-frame builds — they flood rooms with natural light and create a dramatic sense of space.

They're also a nightmare to shade.

If you've ever searched "A-frame window shades" or "triangle window blinds," you've probably found pages of stock photos, vague "call for quote" buttons, and companies that simply refuse triangle shapes altogether.

Here's what you actually need to know.

## The Problem With Standard Shades on A-Frame Windows

Standard roller shades are designed for rectangles. They mount on a horizontal tube at the top and roll down vertically. An A-frame window has two angled sides meeting at a peak — there's no flat horizontal surface to mount a roller.

This means you need a stationary shade: a piece of fabric cut to the exact shape of your window, stretched taut across the frame, and mounted permanently. No rolling up, no raising and lowering.

For most people, that's fine. A-frame windows are typically high up and don't need daily adjustment.

## Which Triangle Shape Do You Need?

Stand inside and face your A-frame window:

**Acute Triangle** — Both sides slope inward to a peak. No right angles. This is the classic A-frame shape. Most symmetrical gable windows are acute triangles.

**Right Triangle (Left or Right)** — One side is perfectly vertical, the other slopes. Common on split gable windows or where a roofline meets a wall. If the vertical side is on your left, it's a "left right triangle." On your right, it's a "right right triangle."

## How to Measure an A-Frame Window

You need three measurements:

1. **Bottom width** — Measure the horizontal base from corner to corner
2. **Left side length** — From bottom-left corner up along the slope to the peak
3. **Right side length** — From bottom-right corner up along the slope to the peak

Use a laser measure if possible. The angled sides are hard to measure accurately with a tape — you need to hold one end at the bottom corner while reaching to the peak. A laser makes this a one-person job.

For symmetrical A-frames, the left and right sides should be equal (or very close). If they differ by more than 1", double-check — the framing may have settled unevenly over time.

## Choosing the Right Fabric

A-frame windows often face south and get brutal direct sun. The fabric choice matters more here than almost any other window.

**Solar fabrics** (like our UltraShield 4 or SolarLite 4P) block 90-95% of solar heat while preserving your view. You can still see the trees and mountains — but your room doesn't turn into a greenhouse.

**Blackout fabrics** block 100% of light. Great for A-frame bedrooms where the peaked window lets in early morning sun.

**Light filtering** splits the difference — diffuses harsh light without full blackout.

## What It Costs

Triangle shades use our specialty pricing grid, which runs roughly 15-25% more than a comparable-size rectangle. The premium covers precision angle cutting. Factory-direct pricing means no dealer markup on top of that.

Enter your measurements in our builder to see your exact price before committing — no quote forms, no waiting.
    `.trim(),
    relatedShapes: ['acute-triangle', 'right-triangle-left', 'right-triangle-right'],
    keywords: ['a-frame window shades', 'triangle window blinds', 'how to shade a-frame windows', 'cathedral ceiling window coverings'],
  },

  'solar-vs-blackout-fabrics': {
    slug: 'solar-vs-blackout-fabrics',
    title: 'Solar vs. Blackout Fabrics: Which One Do You Actually Need?',
    metaTitle: 'Solar vs Blackout Shades | Which Fabric Is Right?',
    metaDescription: 'Solar shades reduce heat and glare while preserving your view. Blackout shades block 100% of light. Here\'s how to choose the right fabric for each room.',
    publishedAt: '2026-02-12',
    updatedAt: '2026-02-12',
    author: 'World Wide Shades',
    category: 'comparisons',
    readTime: '5 min read',
    heroImage: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1759514020/fabrics/breezeguard-blackout-shades/charcoal.jpg',
    excerpt: 'Solar shades preserve your view while cutting heat. Blackout shades block all light. Here\'s how to pick the right fabric for bedrooms, living rooms, and problem windows.',
    content: `
This is the most common question we get: "Should I go solar or blackout?"

The answer depends on the room, the window orientation, and what's driving you crazy about the current situation.

## Solar / Sun Control Fabrics

Solar fabrics are engineered to block UV radiation and reduce solar heat gain while maintaining outward visibility. During the day, you can see through them — trees, sky, neighbors — but they cut glare and keep your room from overheating.

**Best for:**
- Living rooms where you want natural light without the heat
- South and west-facing windows that get direct afternoon sun
- Home offices where screen glare is a problem
- Any window where you want to preserve the view

**The numbers that matter:**
- Openness factor: ranges from 1% to 14% (lower = tighter weave = more heat blocking, less view)
- UV blocking: our commercial-grade solars block 90-99% of UV
- Heat reduction: up to 95% solar heat gain reduction on our best performers

## Blackout Fabrics

Blackout fabrics are exactly what they sound like — zero light transmission. Complete darkness. The fabric is opaque and coated or woven to prevent any light from passing through.

**Best for:**
- Bedrooms (especially if you're a light sleeper or work nights)
- Media rooms and home theaters
- Nurseries and kids' rooms
- Any room where you need total darkness

**Important caveat:** Even blackout fabric doesn't create 100% darkness if light leaks around the edges. For rectangular shades, we recommend adding side channels to seal the gaps. For specialty shapes (triangles, trapezoids), the shade mounts flush against the frame, which naturally minimizes edge light.

## Light Filtering: The Middle Ground

Light filtering fabrics diffuse and soften incoming light without blocking it entirely. They provide daytime privacy (people outside can't see in clearly) while still letting the room feel bright and airy.

**Best for:**
- Bathrooms and kitchens where you want privacy without darkness
- North-facing windows that don't get direct sun
- Decorative or architectural windows where the shade is mainly aesthetic

## Room-by-Room Recommendations

**Bedroom:** Blackout. No question. Even people who think they don't need blackout usually prefer it once they experience complete darkness.

**Living room:** Solar (3-5% openness). Cuts heat and glare while keeping the room connected to the outdoors.

**Home office:** Solar (1-3% openness). The tighter weave kills screen glare without making the room feel like a cave.

**Kitchen:** Light filtering. Easy to clean, lets in ambient light, provides privacy from neighbors.

**Bathroom:** Light filtering or blackout depending on privacy needs.

**Media room:** Blackout with side channels. Maximum darkness for the best picture quality.

All 649 of our fabrics are available for every window shape. Filter by category in our builder to narrow your options.
    `.trim(),
    relatedShapes: ['standard-rectangle', 'acute-triangle', 'pentagon'],
    keywords: ['solar vs blackout shades', 'solar shades', 'blackout shades', 'window shade fabrics', 'sun control shades'],
  },

  'gable-window-shades-guide': {
    slug: 'gable-window-shades-guide',
    title: 'The Complete Guide to Gable Window Shades',
    metaTitle: 'Gable Window Shades Guide | Triangle & Pentagon',
    metaDescription: 'Gable windows come in triangles, pentagons, and half-rounds. Here\'s how to identify your gable shape, measure it, and order custom shades that fit perfectly.',
    publishedAt: '2026-02-15',
    updatedAt: '2026-02-15',
    author: 'World Wide Shades',
    category: 'guides',
    readTime: '6 min read',
    heroImage: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Pentagon_s61whw.webp',
    excerpt: 'Gable windows are the triangular or peaked windows at the top of your roofline. This guide covers how to identify your gable shape, measure it, and order shades that actually fit.',
    content: `
Gable windows sit at the peak of your roofline — that triangular or pentagonal window high up on your wall that floods the room with light. They're architecturally beautiful and functionally annoying to shade.

## Identifying Your Gable Shape

Not all gable windows are the same. Here's how to figure out which shape you have:

**Pure triangle gable** — The window fills the entire gable end from wall to wall, with two sloped sides meeting at a peak. If both sides are the same angle, it's an acute triangle. If one side is vertical, it's a right triangle.

**Pentagon gable** — The window has a rectangular section below with a triangular peak on top. Five sides total. This is extremely common in two-story homes where the gable window sits above a set of rectangular windows.

**Split gable** — Two separate triangle windows on either side of a center beam. You need a left and right triangle, ordered as a matching pair.

## Why Gable Windows Are Hard to Shade

Three reasons:

1. **Height** — Most gable windows are 15-25 feet off the floor. They're hard to reach for measurement and installation.

2. **Angles** — Every gable has a different pitch. A 6/12 pitch creates different angles than a 10/12 pitch. Off-the-shelf products don't accommodate variable angles.

3. **Refusal** — Most shade companies simply say no. The specialty cutting, custom hardware, and variable geometry make gable windows unprofitable for manufacturers who optimize for volume rectangle production.

## Measuring Tips for High Gable Windows

Since gable windows are typically high up, measuring requires some planning:

- **Use a laser measure** — Point-and-shoot from the floor if you have a clear line of sight to the corners
- **Use a ladder safely** — For windows under 15 feet, a tall ladder works. Always have a spotter.
- **Consider a professional measurement** — For windows over 15 feet, hiring a handyperson with a tall ladder for 30 minutes is worth the insurance

Measure each side independently. Gable framing settles over time and is rarely perfectly symmetrical.

## Fabric Recommendations for Gable Windows

Most gable windows face the front or back of the house, so orientation varies. Here's the general guidance:

**South-facing gable:** Solar fabric with high heat rejection. These windows get all-day direct sun.

**North-facing gable:** Light filtering is usually sufficient. North-facing windows get ambient light, not direct sun.

**East/west-facing gable:** Solar or light filtering depending on how much morning/afternoon heat bothers you.

**Bedroom gable:** Blackout if the gable is in a bedroom, regardless of orientation.

## Installation

Gable shades are stationary — they mount flat against the window frame with brackets along the straight edges. The peak uses tensioned cable or rod hardware to keep the fabric taut.

For high gable windows, installation typically requires scaffolding or a very tall ladder. Many customers hire a handyperson for the install — it's usually a 30-60 minute job with the right equipment.

We include all mounting hardware and shape-specific installation instructions with every order.
    `.trim(),
    relatedShapes: ['acute-triangle', 'right-triangle-left', 'right-triangle-right', 'pentagon'],
    keywords: ['gable window shades', 'gable window coverings', 'peaked window shades', 'gable end window blinds'],
  },

  'trapezoid-staircase-windows': {
    slug: 'trapezoid-staircase-windows',
    title: 'How to Shade Staircase Windows: Trapezoid Shades Explained',
    metaTitle: 'Staircase Window Shades | Trapezoid Guide',
    metaDescription: 'Staircase windows follow the slope of your stairs, creating trapezoid shapes. Learn how to measure, order, and install custom trapezoid shades.',
    publishedAt: '2026-02-18',
    updatedAt: '2026-02-18',
    author: 'World Wide Shades',
    category: 'guides',
    readTime: '5 min read',
    heroImage: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Trapezoid_Left_ruvoph.webp',
    excerpt: 'Windows along staircases follow the slope, creating trapezoid shapes that no standard shade fits. Here\'s how to measure each window and order matching shades.',
    content: `
If your staircase has windows, chances are they follow the slope of the stairs. That means each window has a slight angle at the top — creating a trapezoid shape instead of a perfect rectangle.

Standard shades don't fit. The straight top edge leaves a triangular gap along the slope. It looks wrong, it lets in light, and it defeats the purpose of the shade.

## Identifying Left vs. Right Trapezoids

Stand inside, face the window. The angled side (the shorter side) determines the direction:

- **Left Trapezoid** — the shorter, angled side is on your left
- **Right Trapezoid** — the shorter, angled side is on your right

As you walk up the staircase, the windows may alternate — or they may all angle the same way depending on which wall the staircase follows.

## Measuring Staircase Windows

Each window in a staircase series needs four measurements:

1. **Top width** — horizontal distance across the top
2. **Bottom width** — horizontal distance across the bottom (should match or be very close to top width)
3. **Left height** — the height on the left side
4. **Right height** — the height on the right side

The difference between left and right height determines the angle. Even a 1-inch difference creates a noticeable angle that a standard rectangular shade can't match.

**Critical:** Measure each window individually. Staircase framing is rarely consistent — each step shifts the angle slightly.

## Ordering a Matching Set

For staircase windows, consistency is everything. You want:

- **Same fabric** across all windows — order them together so we cut from the same roll (dye lots vary between rolls)
- **Correct left/right designation** for each window
- **Individual measurements** for each window (don't assume they're all the same)

## Flat Top vs. Regular Trapezoid

There's an important distinction:

**Regular trapezoid** — the angle is at the top. The shade is stationary (fixed).

**Flat top trapezoid** — the top is flat and level, the angle is at the bottom. Because the top is flat, this shade CAN roll up and down on a standard roller tube.

Most staircase windows are regular trapezoids (angle at top). But if your windows have a level header and the sill follows the staircase slope, you have flat top trapezoids — and you get the bonus of operable shades.

## Installation Tips

Staircase windows are usually at an awkward height — too high for comfortable reach, too low for scaffolding. A step ladder on the stairs works for most installations, but be careful about stability.

Mount the brackets along the straight edges first, then attach the shade and tension it against the angled edge. We include angle-specific templates with every trapezoid order.
    `.trim(),
    relatedShapes: ['trapezoid-left', 'trapezoid-right', 'flat-top-trapezoid-left', 'flat-top-trapezoid-right'],
    keywords: ['staircase window shades', 'trapezoid window blinds', 'angled window shades', 'sloped window coverings'],
  },

  'specialty-shape-window-guide': {
    slug: 'specialty-shape-window-guide',
    title: 'Pentagon & Hexagon Window Shades: The Shapes No One Else Makes',
    metaTitle: 'Pentagon & Hexagon Shades | Specialty Shapes',
    metaDescription: 'Pentagon and hexagon windows are the hardest shapes to shade. We make both. Here\'s how these rare specialty shape shades work.',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    author: 'World Wide Shades',
    category: 'guides',
    readTime: '5 min read',
    heroImage: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525899/Flat_Top_Hexagon_hrxsvt.webp',
    excerpt: 'Pentagon and hexagon windows are architectural statements — and the hardest shapes to shade. Here\'s what makes these specialty shapes unique and how we manufacture them.',
    content: `
If you have a pentagon or hexagon window, you're in rarefied territory. These are the shapes that make shade companies say "we've never even been asked about that."

We have. And we make them.

## Pentagon Windows

A pentagon has five sides — a rectangular base topped by a triangular peak. Common locations:

- Above front doors in two-story foyers
- As the centerpiece of great rooms
- At the top of staircase walls where a gable meets a flat wall

**The one-piece advantage:** Most people who try to shade pentagons end up with a two-piece solution — a rectangle shade for the bottom and a triangle for the top. This leaves a visible gap at the seam, different mounting hardware, and often a slight color mismatch between pieces.

We cut a single seamless shade covering all five sides. One piece. No gap. Continuous fabric from the base to the peak.

## Hexagon Windows

Flat top hexagons have six sides: a flat top, two vertical sides, and two angled bottom edges tapering to a narrower base. Found in:

- Tudor revival homes
- Craftsman bungalows
- Contemporary homes with geometric architectural elements

Hexagons are the rarest shape we manufacture. The six precision cuts — each at a calculated angle from your specific measurements — make them the most complex piece we produce. That's why the lead time is 10-14 business days instead of our standard 7.

## Why These Shapes Are Hard

Every additional side multiplies the complexity:

- **Rectangles:** 2 precision cuts (top and bottom)
- **Triangles:** 3 cuts with exact angle calculation
- **Trapezoids:** 4 cuts with one calculated angle
- **Pentagons:** 5 cuts combining rectangle and triangle geometry
- **Hexagons:** 6 cuts with multiple calculated angles

Each angled cut must be within millimeters of your measurements. There's no margin for error — even a small deviation shows as a gap or overhang.

## Pricing

Pentagon and hexagon shades use our specialty pricing grid. The complexity premium runs 15-25% above a comparable-size rectangle. Given that the alternative is either no shade at all or a $1,500+ dealer quote with a 6-week wait, the math usually works out heavily in your favor.

Enter your measurements in our builder to see the exact price instantly.
    `.trim(),
    relatedShapes: ['pentagon', 'flat-top-hexagon', 'acute-triangle'],
    keywords: ['pentagon window shades', 'hexagon window shades', 'specialty shape windows', 'unusual window shapes'],
  },
};

export const ALL_BLOG_SLUGS = Object.keys(BLOG_POSTS);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS[slug];
}
