// ---------------------------------------------------------------------------
// All real content pulled from the live site: https://www.zktechsolutions.org/
// ---------------------------------------------------------------------------

export const LIVE = 'https://www.zktechsolutions.org'

/* External business-profile site — opened in a new tab from the menu + services CTA */
export const BUSINESS_PROFILE = 'https://zktech-business-profile.vercel.app/'

export const contact = {
  email: 'support@zktechsolutions.org',
  phoneLabel: '+1 (346) 904-4486',
  phoneHref: 'tel:+13469044486',
  address: '16927 Kaitlyn Kerria Ct., Richmond, TX 77407',
  maps: 'https://www.google.com/maps/search/?api=1&query=16927%20Kaitlyn%20Kerria%20Ct%2C%20Richmond%20TX%2077407',
  facebook: 'https://www.facebook.com/profile.php?id=61590346173208',
  instagram: 'https://www.instagram.com/zktechsolutions/',
  since: '1999',
}

export const navLinks = [
  { label: 'Home', href: '#home', index: '01' },
  { label: 'About Us', href: '#manifesto' },
  { label: 'Portfolio', href: BUSINESS_PROFILE, external: true },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

export const menuServices = [
  { label: 'Website Development', href: '#services' },
  { label: 'Mobile Applications', href: '#services' },
  { label: 'SEO Optimization', href: '#services' },
  { label: 'Logo & Brand Identity', href: '#services' },
  { label: 'Social Media Marketing', href: '#services' },
  { label: 'Motion Graphics', href: '#services' },
]

// ---- Hero (image-1 reference: 3D cluster + floating service labels) --------
export const heroWords = [
  { label: 'Web Development', pos: 'w1' },
  { label: 'Mobile Apps', pos: 'w2' },
  { label: 'SEO & Growth', pos: 'w3' },
  { label: 'Brand Identity', pos: 'w4' },
]

export const heroIntro =
  'ZK Tech Solutions is the studio founders call when their brand and website need to catch up to the business they are building.'

export const heroTicker = [
  'Web Platforms',
  'Mobile Apps',
  'SEO & Growth',
  'Brand Identity',
  'E-Commerce',
  'Motion Design',
]


// ---- Section 2 (Timely Service Delivery / Brand Identity) ----
export const manifesto = {
  kicker: 'Timely Service Delivery & Incident Resolutions!',
  title: 'Create A Distinctive Brand Identity',
  lines: [
    "Booming with competition, the business can't afford not to have a distinctive brand name anymore. At ZK Tech Solutions we're not just branding experts; we are your strategic partners, focused not on copying brand, but rather carefully creating unique solutions that will propel your brand forward and cause you to stand out from the crowd.",
    'Make your potential consumers whom you target recall your distinctive branding brands for a long time with our branding solutions.',
  ],
  bullets: [
    'High Customer Satisfaction',
    'Customized Designs',
    'Money-Back Guarantee',
    '24/7 Customer Support',
    'Expert Design Team',
    'Flexible Timelines',
  ],
  media: '/images/home_2.jpg',
}

// ---- Section 3 (image-3 reference: full-bleed accent panel + work cards) ---
export const featured = {
  name: 'CapoChain',
  blurb: 'Countdown first, token details next. The dark layout makes the launch easy to scan.',
  tags: ['BRANDING', 'WEB DESIGN', 'DEVELOPMENT', 'SEO'],
  location: 'RICHMOND, USA',
  year: '2025',
  cover: '/images/work/web-4.webp',
}

export const projects = [
  {
    index: '01',
    name: 'CapoChain',
    category: 'Crypto Platform · Web Design',
    location: 'Richmond, USA',
    year: '2025',
    image: '/images/work/mockup_04_cargochain.webp',
    description: 'Countdown first, token details next. The dark layout makes the launch easy to scan.',
    href: `${LIVE}/pages/website-dev.php`,
  },
  {
    index: '02',
    name: 'TAP Esports Centre',
    category: 'Gaming Venue · Website',
    location: 'Texas, USA',
    year: '2025',
    image: '/images/work/mockup_03_esports.webp',
    description: 'Game art opens the site, followed by a Book Now button, venue information, and a gallery.',
    href: `${LIVE}/pages/website-dev.php`,
  },
  {
    index: '03',
    name: 'Quick IT Needs LLC',
    category: 'Enterprise IT · Development',
    location: 'Houston, USA',
    year: '2024',
    image: '/images/work/mockup_01_repair.webp',
    description: 'Repair help is easy to find, with separate paths for managed IT, desktop, and laptop service.',
    href: `${LIVE}/pages/website-dev.php`,
  },
  {
    index: '04',
    name: 'Prime Motors',
    category: 'Automotive · Web Design',
    location: 'Dallas, USA',
    year: '2024',
    image: '/images/work/mockup_02_auto_detailing.webp',
    description: 'Big car photography sets the tone before the page moves into the services on offer.',
    href: `${LIVE}/pages/website-dev.php`,
  },
  {
    index: '05',
    name: 'Flared Rooter & Septic',
    category: 'Home Services · SEO',
    location: 'Austin, USA',
    year: '2024',
    image: '/images/work/mockup_05_roofing.webp',
    description: 'A quote form sits up front, with a simple grid of home-service options directly below.',
    href: `${LIVE}/pages/seo-optimization.php`,
  },
  {
    index: '06',
    name: 'Adventure Gear',
    category: 'E-Commerce · Shopify',
    location: 'Denver, USA',
    year: '2023',
    image: '/images/work/mockup_06_travel.webp',
    description: 'A colorful hero leads into search and image-led categories for easy browsing.',
    href: `${LIVE}/pages/website-dev.php`,
  },
]

// ---- Section 4: services list with hover image reveal ----------------------
// export const services = [
//   {
//     index: '01',
//     title: 'Website Development',
//     desc: 'Enterprise grade websites and web platforms built for performance, security and measurable growth.',
//     image: '/images/work/mockup_01_repair.webp',
//     href: `${LIVE}/pages/website-dev.php`,
//     coords: 'a',
//   },
//   {
//     index: '02',
//     title: 'Mobile Applications',
//     desc: 'Native and cross platform apps engineered for scale and long-term reliability.',
//     image: '/images/work/mockup_03_esports.webp',
//     href: `${LIVE}/pages/mobile-application.php`,
//     coords: 'b',
//   },
//   {
//     index: '03',
//     title: 'SEO & Digital Growth',
//     desc: 'Data-driven SEO and marketing that increases visibility, traffic and conversions.',
//     image: '/images/work/mockup_04_cargochain.webp',
//     href: `${LIVE}/pages/seo-optimization.php`,
//     coords: 'c',
//   },
//   {
//     index: '04',
//     title: 'Logo & Brand Identity',
//     desc: 'Distinctive brand systems logo, guidelines and collateral that people remember.',
//     image: '/images/work/mockup_02_auto_detailing.webp',
//     href: `${LIVE}/pages/logo.php`,
//     coords: 'd',
//   },
//   {
//     index: '05',
//     title: 'Motion Graphics',
//     desc: 'Product films, whiteboard animation and motion assets that explain and sell.',
//     image: '/images/work/mockup_05_roofing.webp',
//     href: `${LIVE}/pages/motion-graphics.php`,
//     coords: 'e',
//   },
//   {
//     index: '06',
//     title: 'Books & Publishing',
//     desc: 'Manuscripts, editing, eBooks and publishing support for print and digital releases.',
//     image: '/images/work/mockup_06_travel.webp',
//     href: `${LIVE}/pages/book-writing.php`,
//     coords: 'f',
//   },
// ]

export const services = [
  {
    index: '01',
    title: 'Website Development',
    desc: 'Enterprise-grade websites and web platforms built for performance, security, and measurable growth.',
    image: '/images/work/service_01_website_development.webp',
    href: `${LIVE}/pages/website-dev.php`,
    coords: 'a',
  },
  {
    index: '02',
    title: 'Mobile Applications',
    desc: 'Native and cross-platform apps engineered for scale and long-term reliability.',
    image: '/images/work/service_02_mobile_applications.webp',
    href: `${LIVE}/pages/mobile-application.php`,
    coords: 'b',
  },
  {
    index: '03',
    title: 'SEO & Digital Growth',
    desc: 'Data-driven SEO and marketing that increases visibility, traffic, and conversions.',
    image: '/images/work/service_03_seo_digital_growth.webp',
    href: `${LIVE}/pages/seo-optimization.php`,
    coords: 'c',
  },
  {
    index: '04',
    title: 'Logo & Brand Identity',
    desc: 'Distinctive brand systems, logos, guidelines, and collateral that people remember.',
    image: '/images/work/service_04_logo_brand_identity.webp',
    href: `${LIVE}/pages/logo.php`,
    coords: 'd',
  },
  {
    index: '05',
    title: 'Motion Graphics',
    desc: 'Product films, whiteboard animation, and motion assets that explain and sell.',
    image: '/images/work/service_05_motion_graphics.webp',
    href: `${LIVE}/pages/motion-graphics.php`,
    coords: 'e',
  },
  {
    index: '06',
    title: 'Books & Publishing',
    desc: 'Manuscripts, editing, eBooks, and publishing support for print and digital releases.',
    image: '/images/work/service_06_books_publishing.webp',
    href: `${LIVE}/pages/book-writing.php`,
    coords: 'f',
  },
];

// ---- Section 5: process ----------------------------------------------------
export const process = [
  {
    step: '01',
    title: 'Discover',
    body: 'Research-driven workshops, audits and precise market data become the cornerstone of every decision we make.',
    meta: 'Week 1 — 2',
  },
  {
    step: '02',
    title: 'Design',
    body: 'Positioning, brand system and interface design. We prototype early so you can feel the product before a line of code is written.',
    meta: 'Week 2 — 4',
  },
  {
    step: '03',
    title: 'Develop',
    body: 'Web platforms, mobile apps and integrations built by a team with decades of engineering experience behind it.',
    meta: 'Week 4 — 9',
  },
  {
    step: '04',
    title: 'Deploy & Grow',
    body: 'Launch, optimisation, SEO and continuous iteration — plus 24/7 support and a money-back guarantee.',
    meta: 'Ongoing',
  },
]

// ---- Section 6: proof ------------------------------------------------------
export const stats = [
  { value: 400, suffix: '+', label: 'Projects Ordered' },
  { value: 1000, suffix: '+', label: 'Happy Clients' },
  { value: 900, suffix: '+', label: 'Projects Completed' },
  { value: 300, suffix: '+', label: 'Comments' },
]

export const badges = [
  { image: '/images/clients/c-2.webp', label: 'BBB Accredited Business' },
  { image: '/images/clients/c-3.webp', label: 'Rated 5/5 on Trustpilot' },
  { image: '/images/clients/c-4.webp', label: 'Google Partner' },
]

export const awards = [
  'W3 Design Award',
  'The FWA Award',
  'WWW Awards',
  'CSS Design Award',
  'Google Partner',
  'BBB Accredited',
]

export const industries = [
  'Engineering',
  'Construction',
  'Technology',
  'Automotive',
  'Education',
  'Finance',
  'Insurance',
  'Healthcare',
  'Travel',
  'Fashion',
  'Entertainment',
  'Food',
]

export const testimonials = [
  {
    quote:
      'We came in with a product nobody understood and left with a brand our sales team can actually sell. Traffic doubled in four months.',
    name: 'Operations Lead',
    company: 'CapoChain',
  },
  {
    quote:
      'The team rebuilt our website and ran local SEO. Phone enquiries went from a trickle to a steady flow — and the site finally looks like the company we are.',
    name: 'Managing Director',
    company: 'Flared Rooter & Septic',
  },
  {
    quote:
      'On time, on budget, and the design work is genuinely world-class. They behave like an in-house team, not a vendor.',
    name: 'Founder',
    company: 'TAP Esports Centre',
  },
]

export const footerLinks = {
  company: [
    { label: 'About Us', href: `${LIVE}/pages/about-us.php` },
    { label: 'Why Us', href: `${LIVE}/pages/why-us.php` },
    { label: 'Pricing', href: `${LIVE}/pages/pricing.php` },
    { label: 'FAQs', href: `${LIVE}/pages/faqs.php` },
    { label: 'Contact', href: `${LIVE}/pages/contact-us.php` },
  ],
  services: [
    { label: 'Website Development', href: `${LIVE}/pages/website-dev.php` },
    { label: 'Mobile Applications', href: `${LIVE}/pages/mobile-application.php` },
    { label: 'SEO Optimization', href: `${LIVE}/pages/seo-optimization.php` },
    { label: 'Logo Design', href: `${LIVE}/pages/logo.php` },
    { label: 'Book Publishing', href: `${LIVE}/pages/book-publishing.php` },
  ],
  legal: [
    { label: 'Privacy Policy', href: `${LIVE}/pages/privacy.php` },
    { label: 'Terms of Service', href: `${LIVE}/pages/terms.php` },
  ],
}
