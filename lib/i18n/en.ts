/**
 * English UI strings. hi.ts must provide the same shape (enforced by the Dictionary type).
 * Product technical details (composition, dosage, benefits) live in data/products.ts.
 */
const en = {
  langName: "English",
  switchLabel: "हिंदी",
  switchAria: "हिंदी में देखें (View in Hindi)",

  meta: {
    siteTitle: "Hooda Enterprise — Aquaculture Products Dealer for Fish & Shrimp Farming",
    siteDescription:
      "Independent dealer of aquaculture products from trusted brands like Provet Pharma (BluNova) — probiotics, zeolites, disinfectants, minerals and feed additives for fish and shrimp ponds, 20% below MRP. Order on WhatsApp.",
    productsTitle: "All Products",
    productsDescription:
      "Browse probiotics, zeolites, oxygen supplements, disinfectants, minerals and feed additives for fish and shrimp ponds. Search by pond problem and order on WhatsApp.",
    waterTitle: "Water Quality Guide",
    waterDescription:
      "Optimal pond water parameters for shrimp and fish farming — temperature, salinity, dissolved oxygen, pH, alkalinity, ammonia, nitrite, H₂S and mineral ratios — with products that help.",
    aboutTitle: "About Us",
    aboutDescription:
      "Hooda Enterprise is an independent dealer supplying aquaculture health products to fish and shrimp farmers at wholesale prices.",
    contactTitle: "Contact Us",
    contactDescription:
      "Contact Hooda Enterprise on WhatsApp or phone to order aquaculture products or ask about your pond.",
  },

  nav: {
    home: "Home",
    products: "Products",
    water: "Water Quality",
    about: "About",
    contact: "Contact",
    main: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
  },

  brandTagline: "Aquaculture Solutions",

  common: {
    orderOnWhatsApp: "Order on WhatsApp",
    chatOnWhatsApp: "Chat on WhatsApp",
    priceOnRequest: "Price on request",
    off: (pct: number) => `${pct}% OFF`,
    from: "From",
    mrp: "MRP",
    products: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
    viewAllProducts: "View all products",
    browseProducts: "Browse products",
    seeProducts: "See products",
    productsThatHelp: "Products that help",
    learnMore: "Learn more",
  },

  dealer: {
    barStrong: "Independent dealer",
    barRest: " — genuine products from trusted brands like Provet Pharma",
    barPrice: (pct: number) => `${pct}% below MRP`,
    note: "Hooda Enterprise is an independent dealer, not a manufacturer. We source genuine products from trusted brands such as Provet Pharma (BluNova) and sell them to farmers at wholesale prices. Product names and trademarks belong to their manufacturers.",
    footerLine: "Independent dealer · Products are made by their respective manufacturers.",
    soldBy: (seller: string, manufacturer: string) =>
      `Sold by ${seller}, an independent dealer. Manufactured by ${manufacturer}.`,
    rangeBy: (range: string, manufacturer: string) => `${range} · by ${manufacturer}`,
  },

  footer: {
    explore: "Explore",
    getInTouch: "Get in touch",
    rights: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
    categories: "Categories",
  },

  home: {
    heroChip: "Independent dealer · Wholesale aquaculture supplies",
    heroTitle1: "Healthy ponds,",
    heroTitle2: "better harvests.",
    heroTextBefore:
      "Probiotics, zeolites, minerals, disinfectants and feed additives from trusted brands like",
    heroTextAt: "— at",
    heroTextBelow: (pct: number) => `${pct}% below MRP`,
    heroTextAfter: ", ordered straight on WhatsApp.",
    searchLabel: "Search products",
    searchPlaceholder: "Search a product or problem — e.g. ammonia, Zeomin",
    searchButton: "Search",
    browseAll: (n: number) => `Browse all ${n} products`,
    stats: {
      products: "Products",
      discount: "Below MRP",
      species: "Fish & shrimp",
      speciesLabel: "Ponds & hatcheries",
      ordering: "WhatsApp",
      orderingLabel: "Order in a minute",
    },
    problemsEyebrow: "Find by problem",
    problemsTitle: "What's troubling your pond?",
    problemsIntro: "Pick the problem you're facing and we'll show the products that help.",
    categoriesEyebrow: "Shop by category",
    categoriesTitle: "Everything a pond needs",
    featuredEyebrow: "Farmer favourites",
    featuredTitle: "Popular products",
    brandsEyebrow: "Brands we stock",
    brandsTitle: "Genuine products from trusted manufacturers",
    brandsText:
      "We're an independent dealer. We don't make these products — we source them from established manufacturers and supply them to farms, hatcheries and shops at wholesale prices.",
    brandsMore: "More brands coming soon",
    whyEyebrow: "Why farmers choose us",
    whyTitle: (name: string) => `Why buy from ${name}`,
    reasons: [
      {
        title: (pct: number) => `${pct}% below MRP`,
        text: "Wholesale pricing on every pack, shown upfront next to the printed MRP.",
      },
      {
        title: () => "Genuine products",
        text: "We source from trusted manufacturers and sell only sealed, original packs.",
      },
      {
        title: () => "Dosage guidance",
        text: "Not sure what your pond needs? Message us your problem and we'll suggest products and doses.",
      },
      {
        title: () => "Bulk orders & delivery",
        text: "From a single pack to full shipper loads for farms, dealers and hatcheries.",
      },
    ],
    howEyebrow: "How to order",
    howTitle: "Order in three simple steps",
    howText: "Ordering takes less than a minute on WhatsApp.",
    startChat: "Start a chat",
    steps: [
      { title: "Find your product", text: "Search by name or by the problem in your pond." },
      { title: "Tap “Buy on WhatsApp”", text: "Your message is ready with the product, pack and quantity." },
      { title: "Confirm & receive", text: "We confirm price and delivery on chat. No forms, no sign-up." },
    ],
  },

  catalogue: {
    eyebrow: "Product catalogue",
    title: "Find the right product for your pond",
    intro: (n: number, pct: number) =>
      `${n} products for fish and shrimp farming. Every price is ${pct}% below MRP.`,
    searchLabel: "Search products",
    searchPlaceholder: "Search by name, problem or ingredient — Hindi works too",
    clearSearch: "Clear search",
    problem: "Pond problem",
    for: "For",
    category: "Category",
    use: "How it's used",
    all: "All",
    problemNote: "These products are commonly used for it — message us if you'd like help choosing a dose.",
    showing: "Showing",
    clearAll: "Clear all filters",
    emptyTitle: "No products match",
    emptyText:
      "Try a different word or clear the filters. Can't find it? Ask us on WhatsApp — we may still be able to get it for you.",
    clearFilters: "Clear filters",
    askOnWhatsApp: "Ask on WhatsApp",
  },

  product: {
    breadcrumb: "Breadcrumb",
    benefits: "Benefits",
    dosage: "Dosage",
    howToApply: "How to apply:",
    composition: "Composition",
    helpsWith: "Helps with",
    related: "Often used together",
    detailsNote: "",
    disclaimer: "Dosages are indicative. Use as advised by an aquaculture consultant.",
    packsTitle: "Packs & prices",
    packsSubtitle: (pct: number) => `${pct}% off MRP on every pack · MRP incl. GST`,
    choosePack: "Choose a pack size",
    quantity: "Quantity",
    total: "Total",
    buy: "Buy on WhatsApp",
    addToList: "Add to enquiry list",
    ask: "Ask a question about this product",
    decrease: (label: string) => `Decrease quantity of ${label}`,
    increase: (label: string) => `Increase quantity of ${label}`,
    qtyOf: (label: string) => `Quantity of ${label}`,
    quickAdd: (label: string) => `Add ${label} to enquiry list`,
    quickAddTitle: "Add to enquiry list",
  },

  basket: {
    button: (n: number) => `Enquiry list, ${n} items`,
    title: "Your enquiry list",
    subtitle: "Send everything in one WhatsApp message",
    close: "Close enquiry list",
    emptyTitle: "Your list is empty",
    emptyText: "Add products, then send the whole list to us on WhatsApp.",
    remove: (label: string) => `Remove ${label}`,
    onRequest: "On request",
    name: "Your name (optional)",
    location: "Village / town",
    estimated: "Estimated total",
    plusOnRequest: " (+ items on request)",
    send: "Send order on WhatsApp",
    clear: "Clear list",
    added: "added to your list",
    view: "View list",
  },

  water: {
    eyebrow: "Pond guide",
    title: "Water quality guide for shrimp & fish ponds",
    intro:
      "Healthy water means healthy stock. Compare your test readings with these ideal ranges — if something is off, tap it to see products that help.",
    caption: "Optimal water quality parameters for shrimp and fish",
    parameter: "Parameter",
    shrimp: "Shrimp",
    fish: "Fish",
    notes: "Notes",
    productsFor: (label: string) => `Products for ${label.toLowerCase()}`,
    footnote:
      "For fish, salinity and mineral ratios depend on the species (freshwater or saltwater). Source: Provet Pharma product booklet. Ranges are general guidance — consult an aquaculture consultant for your pond.",
    tipsTitle: "Daily pond checks",
    ctaTitle: "Readings out of range?",
    ctaText: "Pick the problem and we'll show you what helps.",
    ctaButton: "Find by problem",
  },

  about: {
    eyebrow: "About us",
    title: (name: string) => `${name}: your partner for healthy ponds`,
    stats: {
      products: "Aquaculture products",
      categories: "Product categories",
      discount: "Below MRP",
      species: "Fish & shrimp",
      speciesLabel: "Ponds and hatcheries",
    },
    whoTitle: "Who we are",
    who1: (name: string, brands: string) =>
      `${name} is an independent dealer and wholesale supplier of aquaculture health products. We are not a manufacturer — we source products from trusted brands, currently the ${brands} range of probiotics, zeolites, oxygen supplements, disinfectants, minerals and feed additives used by fish and shrimp farmers.`,
    who2: "We keep ordering simple: find what you need on this website, see the price upfront, and send us your order on WhatsApp. We confirm availability and arrange delivery on the same chat.",
    talk: "Talk to us on WhatsApp",
    values: [
      {
        title: "Genuine stock",
        text: "Genuine products sourced from trusted manufacturers, sold in sealed, original packs.",
      },
      {
        title: "Fair wholesale prices",
        text: (pct: number) => `Every product ${pct}% below MRP, with the MRP shown so you can compare.`,
      },
      {
        title: "Practical advice",
        text: "Tell us what's happening in your pond and we'll help you pick the right product and dose.",
      },
      {
        title: "Long-term relationships",
        text: "We work with farmers, hatcheries and dealers season after season.",
      },
    ],
    dealerTitle: "We are a dealer, not the manufacturer",
    dealerPoints: [
      [
        "Manufacturers make the products",
        "Composition, quality and packaging are the brand's responsibility.",
      ],
      ["We source and supply", "We buy from trusted brands and sell to farmers, hatcheries and shops."],
      ["We help you choose", "Dosage information comes from the manufacturer's published literature."],
    ],
    ctaTitle: "Ready to order?",
    ctaText: "Browse the full catalogue with prices.",
    ctaButton: "View products",
  },

  contact: {
    eyebrow: "Contact",
    title: "We're a WhatsApp message away",
    intro: "Order products, ask about doses, or describe a pond problem — we reply on WhatsApp.",
    fastest: "Fastest way to order",
    phone: "Phone",
    address: "Address",
    hours: "Hours",
    formTitle: "Send us a question",
    formIntro: "Fill in what you can — we'll reply on WhatsApp.",
    name: "Your name",
    location: "Village / town",
    youAre: "You are a",
    types: ["Fish pond", "Shrimp pond", "Hatchery", "Dealer / shop", "Other"],
    area: "Pond area (optional)",
    areaPlaceholder: "e.g. 2 acres",
    question: "Your question",
    questionPlaceholder: "Describe your pond problem or the products you need",
    send: "Send on WhatsApp",
    privacy: "This opens WhatsApp with your message ready. Nothing is stored on this site.",
  },

  notFound: {
    title: "This page swam away",
    text: "We couldn't find what you were looking for. Try the product catalogue instead.",
    browse: "Browse products",
    home: "Go home",
  },

  fab: {
    label: "Chat with us on WhatsApp",
    hint: "Need help? Chat with us",
  },

  /** WhatsApp message templates (the dealer reads these). */
  wa: {
    general: (name: string) =>
      `Hello ${name}, I found your website and would like to know more about your aquaculture products.`,
    buyIntro: (name: string) => `Hello ${name}, I want to buy:`,
    websitePrice: "Website price",
    each: "each",
    onRequest: "price on request",
    confirm: "Please confirm availability and delivery.",
    queryIntro: (name: string, product: string) => `Hello ${name}, I have a question about *${product}*.`,
    queryPond: "My pond: (fish / shrimp, area in acres, problem you are facing)",
    orderIntro: (name: string) => `Hello ${name}, I want to order:`,
    estimated: "Estimated total",
    plusOnRequest: " + items on request",
    name: "Name",
    location: "Location",
    farmType: "Farm type",
    pondArea: "Pond area",
    hello: (name: string) => `Hello ${name},`,
    lookingFor: (q: string) => `Hello, I'm looking for "${q}" for my pond. Do you have it?`,
    needHelp: "Hello, I need help choosing products for my pond.",
  },
};

export default en;
export type Dictionary = typeof en;
