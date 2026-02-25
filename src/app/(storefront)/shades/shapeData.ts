/**
 * Shape landing page data — unique SEO content for each of the 10 window shapes.
 * 
 * Each shape has:
 * - Unique title, meta description, H1, and body copy
 * - Targeted keyword cluster
 * - Shape-specific FAQ content
 * - Measurement guidance
 * - Internal links to related shapes
 */

export interface ShapePageData {
  slug: string;
  builderSlug: string;          // maps to ?shape= param in builder
  name: string;                  // display name
  headline: string;              // H1
  subhead: string;               // below H1
  metaTitle: string;             // <title> — under 60 chars
  metaDescription: string;       // meta desc — under 160 chars
  heroKicker: string;            // eyebrow above H1
  img: string;                   // shape diagram from Cloudinary
  mask: string;                  // shape silhouette from Cloudinary
  intro: string[];               // 2-3 paragraphs of intro copy
  painPoint: string;             // the core frustration this shape solves
  solution: string;              // how WWS solves it
  measureGuide: {
    steps: string[];
    tip: string;
  };
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];        // links to other shape pages
  keywords: string[];            // for internal reference / schema
}

export const SHAPE_PAGES: Record<string, ShapePageData> = {

  'standard-rectangle': {
    slug: 'standard-rectangle',
    builderSlug: 'Standard',
    name: 'Standard Rectangle',
    headline: 'Custom Rectangular Window Shades',
    subhead: 'The most popular shape — now with 649 premium fabrics, factory-direct pricing, and 7-day shipping.',
    metaTitle: 'Custom Rectangular Window Shades | 649 Fabrics',
    metaDescription: 'Design custom rectangular window shades online. 649 premium fabrics, instant pricing, factory-direct. Solar, blackout & light filtering. Ships in 7 days.',
    heroKicker: 'Standard Rectangle Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525899/Bottom_up_rectangle_jvenzj.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Bottom_Up_Rectangle_fuh9wo.png',
    intro: [
      'Standard rectangular shades are the backbone of every home — and the shape we build more than any other. But "standard" doesn\'t mean "generic." Every shade we make is precision-cut to your exact measurements, down to ⅛ of an inch, using the same commercial-grade fabrics installed in high-rises and luxury hotels.',
      'Most big-box retailers sell rectangles off a shelf in fixed sizes. You get "close enough" and deal with light gaps on the sides. We cut to your actual window dimensions — because a ½" gap defeats the purpose of a blackout shade.',
      'Choose from 649 fabrics across 47 collections from Phifer, Mermet, Ferrari, Copaco, Texstyle, and Senbesta. Solar, blackout, or light filtering. Manual chain, cassette valance, or rechargeable motorized. See your price the moment you enter your dimensions — no quote forms, no waiting.',
    ],
    painPoint: 'Big-box stores sell fixed sizes that leave light gaps. Local dealers charge a 40-60% markup for the same materials.',
    solution: 'We cut every rectangular shade to your exact ⅛" measurements using commercial-grade fabrics — factory-direct, no markup, shipped in 7 days.',
    measureGuide: {
      steps: [
        'Measure the width of your window opening at the top, middle, and bottom. Use the narrowest measurement for inside mount, or add 3" to the widest for outside mount.',
        'Measure the height from the top of the opening to the sill on the left, center, and right. Use the longest measurement.',
        'Enter your measurements in our builder — we accept fractions down to ⅛".',
      ],
      tip: 'For inside mount, deduct ¼" from the width so the shade operates freely. Our builder handles this automatically when you select "Inside Mount."',
    },
    specs: [
      { label: 'Shape', value: 'Standard Rectangle' },
      { label: 'Min Width', value: '12"' },
      { label: 'Max Width', value: '144"' },
      { label: 'Min Height', value: '12"' },
      { label: 'Max Height', value: '144"' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7 business days' },
    ],
    faqs: [
      { q: 'What\'s the difference between inside mount and outside mount?', a: 'Inside mount fits inside the window frame for a clean, built-in look. Outside mount attaches above the frame and covers the entire opening — better for light blocking or hiding an uneven frame. Our builder lets you select either option and adjusts pricing accordingly.' },
      { q: 'Can I get blackout shades for my bedroom windows?', a: 'Yes. Filter by "Blackout" in our builder to see all blackout-rated fabrics. For maximum light blocking on rectangular windows, we recommend pairing blackout fabric with side channels, which seal the edges and prevent light leakage.' },
      { q: 'How do your prices compare to Home Depot or Blinds.com?', a: 'Our fabrics are commercial-grade (Phifer, Mermet, Ferrari) — a tier above what big-box stores carry. Despite the higher material quality, our factory-direct model eliminates showroom rent and dealer commissions, putting us at or below retail pricing for comparable custom sizes.' },
      { q: 'Do you offer motorized rectangular shades?', a: 'Yes. Add a rechargeable battery motor to any rectangular shade during the builder process. The motor fits inside the roller tube and operates via remote control. Battery lasts 6-12 months on typical use before recharging via USB-C.' },
      { q: 'What if my window isn\'t perfectly square?', a: 'Most windows aren\'t. That\'s why we ask you to measure at multiple points and use the narrowest width. If your window is significantly out of square (more than ½" difference), consider an outside mount to ensure full coverage.' },
    ],
    relatedSlugs: ['right-triangle-left', 'trapezoid-left', 'pentagon'],
    keywords: ['custom rectangular shades', 'rectangle window shades', 'custom roller shades', 'window shades online', 'custom blinds'],
  },

  'right-triangle-left': {
    slug: 'right-triangle-left',
    builderSlug: 'Right Triangle Left',
    name: 'Right Triangle – Left',
    headline: 'Custom Left Right Triangle Window Shades',
    subhead: 'The right angle sits at the bottom-left. We build the shade most companies refuse to quote.',
    metaTitle: 'Left Right Triangle Window Shades | Custom Made',
    metaDescription: 'Custom shades for left right triangle windows. Precision-cut to your exact angles. 649 fabrics, instant pricing, 7-day shipping. Design online now.',
    heroKicker: 'Right Triangle – Left Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525899/Right_Triangle_Left_cxgpeb.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Right_Triangle_left_gcmcpz.png',
    intro: [
      'You\'ve got a triangle window with the right angle at the bottom-left corner and the angled side rising to the right. You called a few shade companies. They either said "we don\'t do triangles" or quoted you four figures with a 6-week lead time.',
      'We built our production line specifically for shapes like this. A left right triangle shade requires precision cutting at exact angles — the fabric must follow the slope of your roofline or architectural angle perfectly. Off by even ¼" and it looks wrong.',
      'Our builder walks you through measuring the bottom width, the left angled length, and the right height. Enter your dimensions, pick from 649 fabrics, and see your price instantly. No quote forms. No "call for pricing." Factory-direct and shipped in 7 days.',
    ],
    painPoint: 'Triangle windows in gable ends and A-frame walls get direct sun but are nearly impossible to shade with off-the-shelf products.',
    solution: 'We precision-cut right triangle shades to your exact angles and dimensions — the left side follows your roofline slope perfectly.',
    measureGuide: {
      steps: [
        'Measure the bottom width — the horizontal base of the triangle from the left corner to the right corner.',
        'Measure the left angled length — from the bottom-left corner up along the angled/sloped side to the peak.',
        'Measure the right height — the vertical side from the bottom-right corner straight up to where it meets the angled side.',
      ],
      tip: 'Use a laser measure if possible for the angled length. If you only have a tape measure, have someone hold the end at the bottom corner while you extend to the peak.',
    },
    specs: [
      { label: 'Shape', value: 'Right Triangle – Left' },
      { label: 'Right Angle', value: 'Bottom-left corner' },
      { label: 'Measurements Needed', value: 'Bottom width, left angled length, right height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'How do I know if my triangle is "left" or "right"?', a: 'Stand inside your room facing the window. If the right angle (the square corner) is at the bottom-left, it\'s a Left Right Triangle. If it\'s at the bottom-right, it\'s a Right Right Triangle. The angled side slopes in the opposite direction.' },
      { q: 'Can I get a motorized triangle shade?', a: 'Triangle shades are stationary — they mount in a fixed position covering the window. Motorization applies to rectangular shades that roll up and down. For triangles, the shade is permanently deployed.' },
      { q: 'What fabric works best for triangle windows?', a: 'It depends on the window\'s orientation. South-facing triangles in gable ends get intense direct sun — a solar fabric with high UV blocking (like our SkyShade 1P or EcoTherm collections) works well. For bedrooms, a blackout fabric prevents early morning light from the peak.' },
      { q: 'How is a triangle shade installed?', a: 'Triangle shades come with mounting brackets along the straight edges. The shade stretches taut across the frame using a tensioned cable or rod system. We include all hardware and detailed installation instructions specific to your shape.' },
    ],
    relatedSlugs: ['right-triangle-right', 'acute-triangle', 'trapezoid-left'],
    keywords: ['triangle window shades', 'right triangle shades', 'angled window coverings', 'gable window shades', 'triangular window blinds'],
  },

  'right-triangle-right': {
    slug: 'right-triangle-right',
    builderSlug: 'Right Triangle Right',
    name: 'Right Triangle – Right',
    headline: 'Custom Right Right Triangle Window Shades',
    subhead: 'The right angle sits at the bottom-right. Precision-cut to match your roofline exactly.',
    metaTitle: 'Right Right Triangle Window Shades | Custom Fit',
    metaDescription: 'Custom shades for right right triangle windows. Cut to your exact slope angle. 649 fabrics, instant online pricing. Ships in 7 days.',
    heroKicker: 'Right Triangle – Right Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Right_Triangle_Right_k5xwbe.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895723/Right_Triangle_Right_ewqoan.png',
    intro: [
      'Your window has a right angle at the bottom-right corner, with the angled side rising to the left — typically found on the opposite side of a gable from a left right triangle. These windows often come in mirrored pairs flanking a peak.',
      'If you\'re shading both sides of a gable, you need a matched pair: one left and one right triangle, cut from the same fabric, with angles that mirror each other precisely. Order them together and we\'ll cut from the same fabric roll to ensure perfect color matching.',
      'Measure the bottom width, left height, and right angled length. Our builder shows you exactly which dimension is which with a labeled diagram. Enter your numbers, pick your fabric, and see the price. That\'s it.',
    ],
    painPoint: 'Gable windows often come in mirrored pairs that need matching triangle shades cut from the same fabric lot for consistent color.',
    solution: 'We cut mirrored triangle pairs from the same fabric roll, guaranteeing exact color match and angle precision for both sides of your gable.',
    measureGuide: {
      steps: [
        'Measure the bottom width — the horizontal base from left corner to right corner.',
        'Measure the left height — the vertical side from the bottom-left corner straight up.',
        'Measure the right angled length — from the bottom-right corner up along the slope to where it meets the vertical side.',
      ],
      tip: 'If you\'re ordering a mirrored pair (left + right triangle for both sides of a gable), measure each window independently. Framing is rarely perfectly symmetrical.',
    },
    specs: [
      { label: 'Shape', value: 'Right Triangle – Right' },
      { label: 'Right Angle', value: 'Bottom-right corner' },
      { label: 'Measurements Needed', value: 'Bottom width, left height, right angled length' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'Can I order a matching pair of left and right triangles?', a: 'Yes — and we recommend it. Add both shapes to your cart and they\'ll be cut from the same fabric roll, guaranteeing identical color. Dye lots can vary between rolls, so ordering together ensures a perfect match.' },
      { q: 'My triangle window is very large (over 8 feet). Can you make it?', a: 'We can produce triangle shades with sides up to 144" (12 feet). For very large triangles, we may need to seam the fabric. Our team will contact you to discuss seam placement if needed — we always position seams along the least visible edge.' },
      { q: 'What if my angles aren\'t exactly 90 degrees?', a: 'Many "right triangle" windows are slightly off from a true 90° corner. That\'s fine — we cut to your actual measurements, not to theoretical angles. As long as you measure accurately, the shade will fit your actual window.' },
      { q: 'Do triangle shades block all light?', a: 'With blackout fabric, triangle shades block nearly all light through the fabric surface. However, because they\'re stationary (no side channels), some light may enter around the edges. For maximum light blocking, choose a slightly oversized outside mount.' },
    ],
    relatedSlugs: ['right-triangle-left', 'acute-triangle', 'trapezoid-right'],
    keywords: ['right triangle window shades', 'triangle window coverings', 'gable window blinds', 'angled window shades custom'],
  },

  'acute-triangle': {
    slug: 'acute-triangle',
    builderSlug: 'Acute Triangle',
    name: 'Acute Triangle',
    headline: 'Custom Acute Triangle Window Shades',
    subhead: 'No right angles. Both sides slope inward to a peak. The shape most manufacturers won\'t attempt.',
    metaTitle: 'Acute Triangle Window Shades | Precision Custom',
    metaDescription: 'Custom shades for acute triangle windows with no right angle. Precision-cut to your exact slope angles. 649 fabrics. Ships in 7 days.',
    heroKicker: 'Acute Triangle Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525900/Acute_triangle_wdhqve.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Acute_Triangle_tlw47x.png',
    intro: [
      'An acute triangle window has no right angle — both sides slope inward to meet at a peak. You\'ll find these in A-frame cabins, cathedral ceilings, and modern architectural homes where the roofline creates a symmetrical or asymmetrical triangular window.',
      'This is the shape that makes most shade companies say "sorry, can\'t help you." It requires cutting fabric along two angled sides simultaneously while maintaining tension across an irregular surface. The margin for error is measured in millimeters.',
      'We\'ve built our cutting process specifically for this. You provide the bottom width and both angled side lengths. Our builder calculates the angles, shows you a preview, and gives you instant pricing. The same 649 premium fabrics available for any other shape.',
    ],
    painPoint: 'Acute triangle windows in A-frames and cathedral ceilings are the hardest shape to shade. Most companies simply refuse.',
    solution: 'We engineered our cutting process specifically for multi-angle shapes. Two angled sides, no right angle, no problem.',
    measureGuide: {
      steps: [
        'Measure the bottom width — the horizontal base of the triangle.',
        'Measure the left angled length — from the bottom-left corner up along the left slope to the peak.',
        'Measure the right angled length — from the bottom-right corner up along the right slope to the peak.',
      ],
      tip: 'For A-frame windows where both sides are the same angle, the left and right angled lengths should be equal or very close. If they differ by more than 1", double-check your measurements — A-frame framing can settle unevenly over time.',
    },
    specs: [
      { label: 'Shape', value: 'Acute Triangle (no right angle)' },
      { label: 'Measurements Needed', value: 'Bottom width, left angled length, right angled length' },
      { label: 'Symmetrical or Asymmetrical', value: 'Both supported' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'What\'s the difference between an acute triangle and a right triangle shade?', a: 'A right triangle has one 90° corner — one side is perfectly vertical. An acute triangle has no 90° corner — both sides slope inward to a peak. If your window has a flat vertical side on either end, you need a right triangle (left or right). If both sides are angled, you need an acute triangle.' },
      { q: 'My A-frame window is 15 feet wide. Can you make that?', a: 'Our maximum dimension is 144" (12 feet) per side. For windows larger than that, we can produce a multi-panel solution where two shades meet at a center seam. Contact us and we\'ll design a clean split that minimizes visual interruption.' },
      { q: 'Can acute triangle shades open and close?', a: 'No — acute triangle shades are stationary. They mount in a fixed position covering the window permanently. If you need a shade that opens, consider whether your window might accept a rectangular shade mounted below the triangle portion.' },
      { q: 'What about solar heat in a south-facing A-frame window?', a: 'Large south-facing triangles can generate significant solar heat gain. We recommend our high-performance solar fabrics (UltraShield 4 or SolarLite 4P from Ferrari) which block up to 95% of solar heat while maintaining outward visibility. These fabrics are specifically engineered for high-exposure commercial installations.' },
    ],
    relatedSlugs: ['right-triangle-left', 'right-triangle-right', 'pentagon'],
    keywords: ['acute triangle window shades', 'A-frame window shades', 'triangle window coverings', 'cathedral ceiling window shades', 'peaked window shades'],
  },

  'trapezoid-left': {
    slug: 'trapezoid-left',
    builderSlug: 'Trapezoid Left',
    name: 'Trapezoid – Left',
    headline: 'Custom Left Trapezoid Window Shades',
    subhead: 'The left side is angled, the right side is vertical. Common alongside staircases and vaulted ceilings.',
    metaTitle: 'Left Trapezoid Window Shades | Custom Built',
    metaDescription: 'Custom shades for left trapezoid windows — angled left side, vertical right side. 649 fabrics, precision-cut. Instant pricing. Ships in 7 days.',
    heroKicker: 'Trapezoid – Left Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Trapezoid_Left_ruvoph.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Trapezoid_Left_ofrqqd.png',
    intro: [
      'A left trapezoid window has four sides: a horizontal top, a horizontal bottom, a vertical right side, and an angled left side that follows a roofline or staircase slope. You\'ll find these alongside staircases, under vaulted ceilings, and in rooms where one wall follows a roof pitch.',
      'The challenge with trapezoid shades is the angled top edge. Off-the-shelf shades are built for level tops. A trapezoid requires a precisely angled cut at the top and a mounting system that holds the fabric taut along the slope without sagging or bunching.',
      'Our builder asks for the top width, bottom width, left height (the short side), and right height (the tall side). From those four measurements, we calculate the exact angle and cut your fabric to match. Same 649 fabrics, same instant pricing, same 7-day shipping.',
    ],
    painPoint: 'Staircase and vaulted ceiling windows follow a slope that no standard shade fits. Ill-fitting shades sag, bunch, and look terrible.',
    solution: 'We calculate your exact slope angle from four simple measurements and cut the fabric to match — no sagging, no gaps.',
    measureGuide: {
      steps: [
        'Measure the top width — the horizontal distance across the top of the window.',
        'Measure the bottom width — the horizontal distance across the bottom.',
        'Measure the left height — the shorter vertical side on the left.',
        'Measure the right height — the taller vertical side on the right.',
      ],
      tip: 'The top and bottom widths should be the same (or very close) for a true trapezoid. If they differ significantly, your window may be a parallelogram — contact us and we\'ll help you figure out the right shape.',
    },
    specs: [
      { label: 'Shape', value: 'Trapezoid – Left (angled left side)' },
      { label: 'Measurements Needed', value: 'Top width, bottom width, left height, right height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'How do I know if I need a "left" or "right" trapezoid?', a: 'Stand inside the room facing the window. If the shorter side (angled side) is on your left, it\'s a Left Trapezoid. If it\'s on your right, it\'s a Right Trapezoid. The angled side is always the one that follows the roofline or staircase slope.' },
      { q: 'Can I get a trapezoid shade that rolls up?', a: 'Trapezoid shades with angled tops are stationary — they mount in a fixed position. The angled edge prevents a standard roller mechanism. However, if your window has a flat top and angled sides, it may be a Flat Top Trapezoid, which can operate differently. Check our Flat Top Trapezoid options.' },
      { q: 'I have a row of windows along a staircase. Can you do all of them?', a: 'Absolutely — staircase window series are one of our most common trapezoid orders. Each window may need slightly different dimensions as the slope progresses. Measure each window individually and add them all to your cart. We\'ll cut from the same fabric roll for consistent color.' },
      { q: 'What about mounting hardware for angled windows?', a: 'Every trapezoid shade ships with angle-specific mounting brackets. The brackets are designed to hold the shade flush against the angled portion of the frame. We include a template for bracket placement specific to your measurements.' },
    ],
    relatedSlugs: ['trapezoid-right', 'flat-top-trapezoid-left', 'standard-rectangle'],
    keywords: ['trapezoid window shades', 'angled window shades', 'staircase window coverings', 'sloped window blinds', 'trapezoid blinds custom'],
  },

  'trapezoid-right': {
    slug: 'trapezoid-right',
    builderSlug: 'Trapezoid Right',
    name: 'Trapezoid – Right',
    headline: 'Custom Right Trapezoid Window Shades',
    subhead: 'The right side is angled, the left side is vertical. The mirror of our left trapezoid — for the other side of the slope.',
    metaTitle: 'Right Trapezoid Window Shades | Custom Made',
    metaDescription: 'Custom shades for right trapezoid windows — angled right side, vertical left side. 649 premium fabrics. Instant pricing online. Ships in 7 days.',
    heroKicker: 'Trapezoid – Right Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525900/Trapezoid_Right_x7i9vk.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895719/Trapezoid_ksy87c.png',
    intro: [
      'A right trapezoid window is the mirror image of a left trapezoid — the right side follows the slope while the left side stays vertical. These show up on the opposite side of staircases, on the other half of a vaulted ceiling, or in asymmetrical architectural designs.',
      'If you\'re shading both sides of a vaulted space, you likely need one left and one right trapezoid, plus possibly a rectangle or triangle at the peak. We can handle the entire combination — order all pieces together and we\'ll cut from the same fabric lot.',
      'Four measurements: top width, bottom width, left height (the tall side), and right height (the short side). That\'s all we need. Our builder does the angle math, shows you a preview, and prices it in real time.',
    ],
    painPoint: 'The opposite side of a staircase or vault needs a mirror-matched shade from the same fabric. Most companies can\'t coordinate multi-shape orders.',
    solution: 'Order your entire multi-shape window set together — we cut all pieces from the same fabric roll for perfect color matching.',
    measureGuide: {
      steps: [
        'Measure the top width — horizontal distance across the top.',
        'Measure the bottom width — horizontal distance across the bottom.',
        'Measure the left height — the taller vertical side on the left.',
        'Measure the right height — the shorter side on the right (follows the slope).',
      ],
      tip: 'When ordering a matching set (left + right trapezoid), measure each window separately. Building framing often isn\'t perfectly symmetrical — what looks like a mirror may differ by ½" or more.',
    },
    specs: [
      { label: 'Shape', value: 'Trapezoid – Right (angled right side)' },
      { label: 'Measurements Needed', value: 'Top width, bottom width, left height, right height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'Can I order a left and right trapezoid together?', a: 'Yes, and we encourage it. Both shades will be cut from the same fabric roll for exact color matching. Add both shapes to your cart from the builder — each with their own measurements.' },
      { q: 'My trapezoid has a very slight angle — almost rectangular. Should I order a rectangle instead?', a: 'If the height difference between your two vertical sides is less than ½", a standard rectangle may work with outside mount. If the difference is more than ½", order a trapezoid — it\'ll follow the slope exactly without a visible gap at the angled top.' },
      { q: 'How much do trapezoid shades cost compared to rectangles?', a: 'Specialty shapes like trapezoids use our specialty pricing grid, which is roughly 15-25% more than a comparable-size rectangle. The premium covers the precision angle cutting and custom hardware. You\'ll see the exact price in our builder before committing.' },
      { q: 'Can trapezoid shades be automated?', a: 'Trapezoid shades with angled tops are stationary (fixed). They cover the window permanently. If you need a shade that opens and closes, a Flat Top Trapezoid may work — the flat top edge allows a roller mechanism.' },
    ],
    relatedSlugs: ['trapezoid-left', 'flat-top-trapezoid-right', 'standard-rectangle'],
    keywords: ['right trapezoid shades', 'trapezoid window blinds', 'angled window shades', 'sloped ceiling window shades'],
  },

  'flat-top-trapezoid-right': {
    slug: 'flat-top-trapezoid-right',
    builderSlug: 'Flat Top Trapezoid Right',
    name: 'Flat Top Trapezoid – Right',
    headline: 'Custom Flat Top Trapezoid Shades – Right',
    subhead: 'Flat top, angled bottom-right. A hybrid shape that combines the elegance of a trapezoid with functional roll-up operation.',
    metaTitle: 'Flat Top Trapezoid Right Shades | Custom',
    metaDescription: 'Custom flat top trapezoid shades — right angled bottom. Functional roll-up with specialty shape. 649 fabrics. Instant pricing. 7-day shipping.',
    heroKicker: 'Flat Top Trapezoid – Right',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525900/Flat_top_trapezoid_Right_ezlewd.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Flat_Top_Trapezoid_right_lvvk96.png',
    intro: [
      'A flat top trapezoid has a level top edge and an angled bottom — the right side is shorter than the left. This shape appears in modern architecture where windows follow a sloped sill or stepped foundation while maintaining a flat header.',
      'The flat top is the key difference from a standard trapezoid. Because the top is level, the shade can mount on a standard roller tube — meaning this specialty shape can actually operate like a traditional roll-up shade. Pull it down and the angled bottom edge follows the slope.',
      'This is one of the few specialty shapes where you get the aesthetic precision of a custom cut AND the functionality of a shade you can raise and lower. Choose manual chain, or add a rechargeable motor.',
    ],
    painPoint: 'Standard shades leave a triangular gap when your windowsill is angled. Stationary trapezoid shades can\'t be raised and lowered.',
    solution: 'Flat top trapezoids give you both — the angled bottom follows your sill slope, and the flat top allows functional roll-up operation.',
    measureGuide: {
      steps: [
        'Measure the top width — the flat horizontal top of the window.',
        'Measure the bottom width — the horizontal base.',
        'Measure the left height — the taller side.',
        'Measure the right height — the shorter side (where the slope is).',
      ],
      tip: 'Since this shade rolls up from the top, the roller tube sits at the flat top edge. Make sure your top measurement accounts for inside vs. outside mount just like a standard rectangle.',
    },
    specs: [
      { label: 'Shape', value: 'Flat Top Trapezoid – Right' },
      { label: 'Operation', value: 'Roll-up (chain or motorized)' },
      { label: 'Measurements Needed', value: 'Top width, bottom width, left height, right height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'Can flat top trapezoid shades roll up and down?', a: 'Yes — that\'s what makes them unique among specialty shapes. The flat top edge mounts on a standard roller tube. When raised, the shade rolls up normally. When lowered, the angled bottom edge follows your window\'s slope.' },
      { q: 'Can I add a motor to a flat top trapezoid shade?', a: 'Yes. Because the roller tube is standard at the flat top, motorized operation works exactly as it does for rectangular shades. Rechargeable or hardwired motors are both available.' },
      { q: 'What happens when the shade is partially raised?', a: 'The angled bottom edge remains angled as the shade rolls up — the excess fabric on the taller side simply wraps around the roller tube first. The shade looks best fully lowered or fully raised.' },
    ],
    relatedSlugs: ['flat-top-trapezoid-left', 'trapezoid-right', 'standard-rectangle'],
    keywords: ['flat top trapezoid shades', 'angled bottom window shades', 'sloped sill window coverings', 'trapezoid roller shades'],
  },

  'flat-top-trapezoid-left': {
    slug: 'flat-top-trapezoid-left',
    builderSlug: 'Flat Top Trapezoid Left',
    name: 'Flat Top Trapezoid – Left',
    headline: 'Custom Flat Top Trapezoid Shades – Left',
    subhead: 'Flat top, angled bottom-left. The mirror of the right — functional roll-up shade with a specialty angled cut.',
    metaTitle: 'Flat Top Trapezoid Left Shades | Custom Made',
    metaDescription: 'Custom flat top trapezoid shades — left angled bottom. Roll-up operation with specialty precision cut. 649 fabrics. Ships in 7 days.',
    heroKicker: 'Flat Top Trapezoid – Left',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Trapezoid_Left_ruvoph.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Trapezoid_Left_ofrqqd.png',
    intro: [
      'The left flat top trapezoid is the mirror image of the right — the top is flat and level, but the bottom angles with the shorter side on the left. This appears on the opposite side of sloped sills, stepped foundations, and paired architectural windows.',
      'Like its right-side counterpart, the flat top means this shade mounts on a standard roller tube and operates normally — you can raise and lower it. The angled bottom edge follows your window slope precisely.',
      'If you\'re covering a pair of windows with opposing slopes, order one left and one right flat top trapezoid from the same fabric. We\'ll cut both from the same roll for exact color matching.',
    ],
    painPoint: 'Pairing opposite-sloped windows requires mirror-matched flat top trapezoid shades from the same fabric lot.',
    solution: 'We cut matching left and right flat top trapezoid pairs from a single fabric roll — guaranteed color match, opposite angles.',
    measureGuide: {
      steps: [
        'Measure the top width — the flat horizontal top.',
        'Measure the bottom width — the horizontal base.',
        'Measure the left height — the shorter side (where the slope is).',
        'Measure the right height — the taller side.',
      ],
      tip: 'The left height should be shorter than the right height. If it\'s the other way around, you need the "Right" version.',
    },
    specs: [
      { label: 'Shape', value: 'Flat Top Trapezoid – Left' },
      { label: 'Operation', value: 'Roll-up (chain or motorized)' },
      { label: 'Measurements Needed', value: 'Top width, bottom width, left height, right height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'What\'s the difference between a flat top trapezoid and a regular trapezoid?', a: 'A regular trapezoid has the angle at the top (the top edge slopes). A flat top trapezoid has the angle at the bottom (the top edge is flat/level). The flat top version can roll up because the roller tube sits on the level top edge. Regular trapezoids are stationary.' },
      { q: 'Can I pair a left and right flat top trapezoid?', a: 'Yes — this is a common order for windows on either side of a sloped sill. Add both to your cart and select the same fabric. We\'ll cut from a single roll for exact color consistency.' },
      { q: 'Is the pricing the same as a regular trapezoid?', a: 'Flat top trapezoids use the same specialty pricing grid. Since they require more fabric than a comparable regular trapezoid (the angled bottom means more material on the longer side), the price may be slightly higher for the same overall dimensions.' },
    ],
    relatedSlugs: ['flat-top-trapezoid-right', 'trapezoid-left', 'standard-rectangle'],
    keywords: ['flat top trapezoid left shades', 'angled bottom left window shades', 'sloped sill blinds', 'trapezoid roller shades left'],
  },

  'pentagon': {
    slug: 'pentagon',
    builderSlug: 'Pentagon',
    name: 'Pentagon',
    headline: 'Custom Pentagon Window Shades',
    subhead: 'Five sides. Two angles meeting at a peak. The architectural statement window that most shade companies can\'t figure out.',
    metaTitle: 'Pentagon Window Shades | Custom 5-Sided Shades',
    metaDescription: 'Custom shades for pentagon (5-sided) windows. Two angled sides meet at a peak above a rectangle base. 649 fabrics. Instant pricing. Ships in 7 days.',
    heroKicker: 'Pentagon Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525902/Pentagon_s61whw.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Pentagon_cmdrjj.png',
    intro: [
      'A pentagon window has five sides — essentially a rectangle with a triangular peak on top. These are common above front doors, in grand foyers, and as the centerpiece of great rooms. They\'re designed to be architectural statements. Which makes it all the more frustrating when you can\'t find a shade to cover them.',
      'The problem is the peak. A rectangle shade stops short of the triangle portion, leaving a bright, uncovered gap above. A triangle shade covers the peak but not the rectangular base. You need a single shade that spans the full five-sided shape — and that\'s exactly what we build.',
      'Our builder asks for the bottom width, the height of the rectangular portion (from base to where the angles begin), and the total height to the peak. From those three measurements, we produce a single seamless shade that covers your entire pentagon window. No gap. No awkward two-piece solution.',
    ],
    painPoint: 'Pentagon windows need a single shade spanning 5 sides. Two-piece solutions (rectangle + triangle) leave a visible gap and look unprofessional.',
    solution: 'We build a single seamless shade covering all 5 sides — no gap between the rectangular base and the peaked top.',
    measureGuide: {
      steps: [
        'Measure the bottom width — the horizontal base of the window.',
        'Measure the rectangle height — from the bottom to where the angled sides begin.',
        'Measure the total height — from the bottom all the way to the peak.',
        'Measure the top width — the horizontal distance at the point where the angles begin (should match bottom width for a true pentagon).',
      ],
      tip: 'The transition from rectangle to peak should be clearly visible in your window frame. If the angles start gradually rather than at a defined point, measure to where you\'d want the shade to begin following the angle.',
    },
    specs: [
      { label: 'Shape', value: 'Pentagon (5-sided)' },
      { label: 'Structure', value: 'Rectangle base + peaked top' },
      { label: 'Measurements Needed', value: 'Width, rectangle height, total height to peak' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '7-10 business days' },
    ],
    faqs: [
      { q: 'Is the pentagon shade one piece or two pieces?', a: 'One piece. We cut a single shade that spans the full five-sided shape — the rectangular base and the peaked top are continuous. No seam, no gap, no two-piece assembly.' },
      { q: 'Can the rectangular portion roll up while the peak stays covered?', a: 'Pentagon shades are stationary — the entire shape is fixed. The combination of angles and straight edges prevents a traditional roll-up mechanism. If you need the lower portion to open, consider ordering a separate rectangle shade for the lower section and a triangle shade for the peak.' },
      { q: 'My pentagon window is above my front door. How is it installed?', a: 'Pentagon shades mount using a combination of brackets along the flat bottom and side edges, with tensioned cable hardware at the peak. For windows above doors, installation typically requires a ladder or scaffolding for the upper brackets. We include all hardware and detailed instructions.' },
      { q: 'Can I get a pentagon shade with blackout fabric?', a: 'Yes. All 649 fabrics are available for pentagon shapes, including blackout. For foyer and front door applications, many customers choose a light filtering fabric that provides daytime privacy while still letting natural light through the peaked portion.' },
    ],
    relatedSlugs: ['flat-top-hexagon', 'acute-triangle', 'standard-rectangle'],
    keywords: ['pentagon window shades', 'five sided window coverings', 'peaked window shades', 'arch top window shades', 'foyer window blinds'],
  },

  'flat-top-hexagon': {
    slug: 'flat-top-hexagon',
    builderSlug: 'Flat Top Hexagon',
    name: 'Flat Top Hexagon',
    headline: 'Custom Flat Top Hexagon Window Shades',
    subhead: 'Six sides. Two angled bottom edges tapering inward. The rarest shape we build — and the one we\'re most proud of.',
    metaTitle: 'Hexagon Window Shades | Custom 6-Sided Shades',
    metaDescription: 'Custom shades for hexagon windows with flat top and angled bottom edges. The rarest specialty shape. 649 fabrics. Instant pricing. Ships in 7 days.',
    heroKicker: 'Flat Top Hexagon Shades',
    img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764525899/Flat_Top_Hexagon_hrxsvt.webp',
    mask: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895722/Flat_Top_Hexagon_zlqbx3.png',
    intro: [
      'A flat top hexagon window has six sides — a flat top, two vertical sides, and two angled bottom edges that taper inward to a narrower base. These are rare, distinctive, and almost impossible to shade with anything off the shelf.',
      'We\'ve seen flat top hexagons in Tudor revival homes, Craftsman-style bungalows, and contemporary homes where the architect wanted a geometric statement. They\'re beautiful. They\'re also the shape that generates the most "sorry, we can\'t help you" responses from shade companies.',
      'Our builder accepts all six dimensions. The flat top edge means the shade can potentially mount on a roller, but due to the complex bottom geometry, most hexagon shades are built as fixed panels. Every fabric in our 649-option catalog is available. See your price the moment you enter your measurements.',
    ],
    painPoint: 'Hexagon windows are the ultimate "impossible" shape for shades. No off-the-shelf solution exists. Most custom shops won\'t even attempt it.',
    solution: 'We engineer six-sided shades with precision cuts on all angled edges. The rarest shape we build — and the one with zero competition.',
    measureGuide: {
      steps: [
        'Measure the top width — the flat horizontal top edge.',
        'Measure the bottom width — the narrower horizontal base.',
        'Measure the left height — from the top-left corner to the bottom-left corner.',
        'Measure the right height — from the top-right corner to the bottom-right corner.',
        'Measure the overall height — from the top edge to the lowest point.',
      ],
      tip: 'Hexagon windows often have slightly different left and right angles due to settling. Measure both sides independently rather than assuming symmetry.',
    },
    specs: [
      { label: 'Shape', value: 'Flat Top Hexagon (6-sided)' },
      { label: 'Structure', value: 'Flat top, vertical sides, angled bottom' },
      { label: 'Measurements Needed', value: 'Top width, bottom width, left height, right height, overall height' },
      { label: 'Fabrics', value: '649 options' },
      { label: 'Lead Time', value: '10-14 business days' },
    ],
    faqs: [
      { q: 'Is a hexagon shade fixed or operable?', a: 'Most hexagon shades are stationary (fixed). The complex bottom geometry with two angled edges makes a traditional roll-up mechanism impractical. The shade mounts as a fixed panel covering the full window. If you need the window to have adjustable light control, consider a pairing with operable interior shutters.' },
      { q: 'Why is the lead time longer for hexagons?', a: 'Hexagons require six precision cuts instead of two or four. Each angle must be calculated from your specific measurements and verified before cutting. The extra 3-7 days ensures every edge aligns perfectly with your window frame.' },
      { q: 'I\'m not sure if my window is a hexagon or something else. How can I tell?', a: 'Count the distinct sides. A hexagon has exactly six: flat top, left vertical, left angled bottom, horizontal base, right angled bottom, right vertical. If your window has a peaked top instead of a flat top, it might be a pentagon or an octagon. Take a photo and email it to us — we\'ll help you identify the shape.' },
      { q: 'Can I get a blackout hexagon shade?', a: 'Yes. All fabric types — blackout, solar, and light filtering — are available for hexagons. Blackout fabric for hexagons is especially popular in bedrooms with distinctive architectural windows where the shape is a design feature but light control is still needed.' },
    ],
    relatedSlugs: ['pentagon', 'trapezoid-left', 'trapezoid-right'],
    keywords: ['hexagon window shades', 'six sided window coverings', 'hexagonal window blinds', 'geometric window shades', 'specialty shape window treatments'],
  },
};

export const ALL_SHAPE_SLUGS = Object.keys(SHAPE_PAGES);

export function getShapeData(slug: string): ShapePageData | undefined {
  return SHAPE_PAGES[slug];
}
