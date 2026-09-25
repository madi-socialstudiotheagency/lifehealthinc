/* LifeHealthInc — route-level SEO. Titles, descriptions, canonical, Open Graph, robots and JSON-LD per page.
   Called by the app on every navigation (window.__lhiSeo(pathname)) and once on load. Edit copy here, not in the bundle. */
(function () {
  var SITE = 'https://www.lifehealthinc.org';
  var BRAND = 'LifeHealthInc';
  var PHONE = '(954) 543-0853';
  var OG_IMAGE = SITE + '/assets/img/og-lifehealthinc.png';

  // title ≤ 60 chars, description 140–160 chars. Each one is written to win the click, not just to rank.
  var META = {
    '/': { t: 'LifeHealthInc | Life, Health, Medicare & Retirement Insurance', d: 'Full-service independent brokerage. Life, health, Medicare, annuities, final expense and mortgage protection from 50+ carriers. All 50 states. Free quotes.', type: 'website' },
    '/get-started': { t: 'Start Your Request | Individuals, Employers & Groups | LifeHealthInc', d: 'Tell us what you need: life, health, Medicare, annuities, or employee benefits for your team. A licensed LifeHealthInc advisor follows up personally. Free, no obligation.' },
    '/carriers': { t: 'Our Insurance Carriers | Independent Broker | LifeHealthInc', d: 'LifeHealthInc compares carriers including Transamerica, Mutual of Omaha, Prudential, Pacific Life, Foresters and more, so you get options, not a single company pitch.' },
    '/employers': { t: 'Employer Group Health Insurance | Compare Carriers | LifeHealthInc', d: 'Shop group health, dental, vision and benefits across carriers to find competitive pricing for your team. Fully insured, level-funded and ICHRA options. Free review.' },
    '/become-your-own-bank': { t: 'Become Your Own Bank | Cash Value Life Insurance Explained', d: 'How business owners use cash value life insurance to build accessible savings, with the real risks explained. Free, no-pressure illustration from a licensed broker.' },
    '/about': { t: 'About LifeHealthInc | Full-Service Independent Insurance Brokers', d: 'Life, health and everything in between, under one roof. Brokers licensed in all 50 states who compare 50+ carriers and work for you, not the insurer.' },
    '/lifeinsurance': { t: 'Life Insurance Quotes | Term, Whole & IUL | LifeHealthInc', d: 'Compare term, whole life and IUL from 50+ top-rated carriers. Coverage from $100K to $10M+, no-exam options, licensed brokers. Get your free quote in minutes.' },
    '/wholelife': { t: 'Whole Life Insurance Quotes & Guide | LifeHealthInc', d: 'Lifetime coverage with guaranteed cash value. See how whole life compares to term and IUL, what it costs at your age, and get a no-pressure quote from a licensed broker.' },
    '/healthinsurance': { t: 'Health Insurance Plans | ACA, Private, Dental & Vision', d: 'ACA Marketplace, private, short-term, dental and vision plans compared side by side. Licensed brokers maximize your subsidy and close every coverage gap. Free.' },
    '/medicare': { t: 'Medicare Advantage, Supplement & Part D | LifeHealthInc', d: 'Turning 65 or switching plans? Licensed Medicare brokers compare Advantage, Supplement (Medigap) and Part D at no cost. Enroll with confidence.' },
    '/annuities': { t: 'Fixed & Indexed Annuities | Guaranteed Lifetime Income', d: 'Protect retirement savings from market losses and lock in guaranteed lifetime income. Compare fixed and indexed annuity rates from A-rated carriers, free.' },
    '/finalexpense': { t: 'Final Expense & Burial Insurance | $10K to $50K Quotes', d: 'Affordable final expense coverage with no-exam options and rates locked for life. Protect your family from funeral costs. Free quotes from a licensed broker.' },
    '/mortgageprotection': { t: 'Mortgage Protection Insurance | Keep Your Family in the Home', d: 'Pays off your home if you pass away, become disabled or lose income. Compare carriers, lock in your rate and protect the roof over your family. Free quote.' },
    '/iulstructuring': { t: 'IUL Structuring | Tax-Free Retirement Income | LifeHealthInc', d: 'Max-funded indexed universal life, structured right: tax-free income, market-linked growth with a 0% floor, plus a death benefit. Real carrier illustrations.' },
    '/illustration': { t: 'Free IUL Illustration | See Your Tax-Free Income Projection', d: 'Request a personalized indexed universal life illustration. See projected cash value, income and death benefit from top carriers — free, from a licensed broker.' },
    '/illustrationquote': { t: 'Request a Carrier Illustration | LifeHealthInc', d: 'Get a real carrier illustration for IUL, whole life or annuities. A licensed broker prepares it and walks you through every number — no cost, no obligation.' },
    '/lifeinsurancecomparison': { t: 'Term vs. Whole vs. IUL: Life Insurance Comparison', d: 'Side-by-side comparison of term, whole life and indexed universal life — cost, cash value, flexibility and who each is right for. Decide with a licensed broker.' },
    '/quote': { t: 'Free Insurance Quotes | 50+ Carriers, One Request', d: 'One request, every product: life, health, Medicare, annuities, final expense and mortgage protection. A licensed broker calls with real quotes. No obligation.' },
    '/get-quote': { t: 'Free Insurance Quotes | 50+ Carriers, One Request', d: 'One request, every product: life, health, Medicare, annuities, final expense and mortgage protection. A licensed broker calls with real quotes. No obligation.' },
    '/quotepage': { t: 'Free Insurance Quotes | 50+ Carriers, One Request', d: 'One request, every product: life, health, Medicare, annuities, final expense and mortgage protection. A licensed broker calls with real quotes. No obligation.' },
    '/calculator': { t: 'Life Insurance Calculator | How Much Coverage Do You Need?', d: 'Find your coverage number in 60 seconds with the DIME method: debt, income, mortgage and education. Free calculator, then real quotes from a licensed broker.' },
    '/retirementcalculator': { t: 'Retirement Income Calculator | Will Your Savings Last?', d: 'See how long a 401k or IRA lasts in retirement, and the guaranteed monthly income an annuity can produce from the same savings. Free calculator.' },
    '/results': { t: 'Your Coverage Estimate | LifeHealthInc', d: 'Your personalized coverage estimate. A licensed broker can turn it into real carrier quotes in one call — free, no obligation.' },
    '/contact': { t: 'Contact LifeHealthInc | Talk to a Licensed Broker Today', d: 'Call (954) 543-0853, book a free consultation or meet us for coffee at our Miami Worldcenter office. Serving clients in all 50 states by phone and video.' },
    '/faq': { t: 'Insurance FAQ | Straight Answers From Licensed Brokers', d: 'Is the consultation free? Do I need a medical exam? Medicare Advantage or Supplement? Term or whole life? Plain-English answers from independent brokers.' },
    '/resources': { t: 'Insurance Resources & Guides | LifeHealthInc', d: 'Guides, calculators and checklists on life insurance, Medicare, retirement income and health coverage — written by licensed brokers, free to use.' },
    '/blog': { t: 'Insurance Blog | Life, Health, Medicare & Retirement Guides', d: 'Guides by licensed brokers on life insurance, Medicare, annuities, IUL and health coverage. No jargon, no sales pitch, just what you need to decide well.' },
    '/partners': { t: 'Referral Partners | CPAs, Attorneys, Advisors & Realtors', d: 'Refer clients to LifeHealthInc and earn referral income while they get independent, licensed advice on life, health, Medicare and retirement. Fast payouts.' },
    '/partnerform': { t: 'Become a Referral Partner | LifeHealthInc', d: 'Apply to the LifeHealthInc referral partner program. CPAs, attorneys, financial advisors and realtors — we follow up within two business days.' },
    '/social': { t: 'LifeHealthInc on Social | Follow for Weekly Insurance Tips', d: 'Follow LifeHealthInc on Instagram, LinkedIn, YouTube, X and Facebook for weekly, plain-English insurance and retirement tips from licensed brokers.' },
    '/privacy': { t: 'Privacy Policy | LifeHealthInc', d: 'How LifeHealthInc collects, uses and protects your information.', noindex: false },
    '/privacy-policy': { t: 'Privacy Policy | LifeHealthInc', d: 'How LifeHealthInc collects, uses and protects your information.' },
    '/terms': { t: 'Terms of Use | LifeHealthInc', d: 'Terms governing use of lifehealthinc.org and LifeHealthInc services.' },
    '/book': { t: 'Book a Free Consultation | LifeHealthInc', d: 'Pick a time that works and a licensed broker will call you. 20 minutes, no cost, no pressure — just clear answers about your coverage options.' },
    '/schedulerchat': { t: 'Book a Free Consultation | LifeHealthInc', d: 'Pick a time that works and a licensed broker will call you. 20 minutes, no cost, no pressure — just clear answers about your coverage options.' },
    '/brokers/matthew-anderson': { t: 'Matthew Anderson, Founder & Licensed Broker | LifeHealthInc', d: 'Founder of LifeHealthInc, licensed in all 50 states (NPN 20770864). Life insurance, IUL, Medicare and annuities for hundreds of families. Book a free call.' },
    '/matthew-anderson': { t: 'Matthew Anderson, Founder & Licensed Broker | LifeHealthInc', d: 'Founder of LifeHealthInc, licensed in all 50 states (NPN 20770864). Life insurance, IUL, Medicare and annuities for hundreds of families. Book a free call.' },
    '/brokers/justin-brabant': { t: 'Justin Brabant, Licensed Broker | LifeHealthInc', d: 'Licensed insurance broker based in New York. Life, health, mortgage protection and final expense — clear guidance, zero pressure. Book a free consultation.' },
    '/justin-brabant': { t: 'Justin Brabant, Licensed Broker | LifeHealthInc', d: 'Licensed insurance broker based in New York. Life, health, mortgage protection and final expense — clear guidance, zero pressure. Book a free consultation.' },
    '/thank-you': { t: 'Thank You | LifeHealthInc', d: 'We received your request. A licensed broker will reach out shortly.', noindex: true },
    '/quotecomplete': { t: 'Request Received | LifeHealthInc', d: 'We received your quote request. A licensed broker will reach out shortly.', noindex: true },
    '/loading': { t: BRAND, d: '', noindex: true },
    // Private / account areas — never indexed
    '/clients': { t: 'Client Portal Sign In | LifeHealthInc', d: 'Sign in to view your policies and reach your broker.', noindex: true },
    '/client-portal': { t: 'Client Portal | LifeHealthInc', d: '', noindex: true },
    '/agent-dashboard': { t: 'Agent Dashboard | LifeHealthInc', d: '', noindex: true },
    '/admin-settings': { t: 'Settings | LifeHealthInc', d: '', noindex: true },
    // Built-in articles
    '/blog-how-much-life-insurance-do-i-need': { t: 'How Much Life Insurance Do I Need? Calculator Guide', d: 'The DIME method, real examples by life stage and what coverage actually costs. Find your number, then get real quotes from a licensed broker.', article: true },
    '/blog-medicare-supplement-vs-advantage': { t: 'Medicare Supplement vs. Advantage: Which Is Better?', d: 'Costs, networks, prescription coverage and who each plan suits. A licensed Medicare broker breaks down Medigap vs. Medicare Advantage in plain English.', article: true },
    '/blog-annuities-explained-simply': { t: 'Annuities Explained Simply: Guaranteed Income Guide', d: 'Fixed, indexed and immediate annuities explained without jargon — how they work, what they cost and when they make sense for retirement income.', article: true },
    '/blog-common-life-insurance-mistakes': { t: '7 Life Insurance Mistakes That Could Cost Your Family', d: 'From buying too little to naming the wrong beneficiary — seven costly mistakes a licensed broker sees every week, and how to avoid each one.', article: true },
    '/blog-health-insurance-open-enrollment': { t: 'Health Insurance Open Enrollment Checklist', d: 'Deadlines, subsidies, plan tiers and the questions to ask before you enroll. A complete ACA open enrollment checklist from licensed brokers.', article: true },
    '/blog-life-insurance-for-new-parents': { t: 'Life Insurance for New Parents: Step-by-Step Guide', d: 'How much coverage a new family needs, term vs. permanent, and how to get approved fast. A practical guide for new parents from licensed brokers.', article: true },
    '/blog-understanding-underwriting': { t: 'Life Insurance Underwriting: What to Expect', d: 'What underwriters check, how long approval takes, no-exam options and how to get a better rate class. Plain-English guide from a licensed broker.', article: true },
    '/article-mortgage-protection-guide': { t: 'Mortgage Protection Insurance Guide | LifeHealthInc', d: 'Mortgage protection vs. term life, what it covers, what it costs and how to keep your family in the home no matter what. Guide from licensed brokers.', article: true },
    '/article-retirement-income-planning': { t: 'Using Life Insurance for Retirement Income', d: 'How overfunded IUL and whole life create tax-free retirement income, who it suits and the mistakes to avoid. A guide from licensed brokers.', article: true },
    '/article-term-vs-whole-life': { t: 'Term vs. Whole Life Insurance: Which Is Right for You?', d: 'Cost, cash value, flexibility and who each policy suits. A clear comparison of term and whole life from licensed brokers, with real numbers.', article: true }
  };

  var ORG = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': SITE + '/#organization',
    name: 'LifeHealthInc',
    alternateName: ['Life, Health & Everything, Incorporated', 'Life Health Inc', 'LifeHealth Inc', 'LifeHealth', 'Life Health Inc Insurance', 'Matthew Anderson Insurance'],
    legalName: 'LifeHealthInc LLC',
    url: SITE,
    logo: SITE + '/assets/img/6bb5a4d12_Untitleddesign.png',
    image: OG_IMAGE,
    description: 'Independent insurance brokerage licensed in all 50 states. Life, health, Medicare, annuities, final expense and mortgage protection from 50+ nationwide select carriers. We represent you, not the carrier.',
    telephone: '+1-954-543-0853',
    email: 'info@lifehealthinc.org',
    priceRange: 'Free consultation',
    address: { '@type': 'PostalAddress', streetAddress: '697 N Miami Ave', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33136', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 25.7813, longitude: -80.1935 },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=697+N+Miami+Ave+Miami+FL+33136',
    areaServed: { '@type': 'Country', name: 'United States' },
    founder: { '@type': 'Person', '@id': SITE + '/brokers/matthew-anderson#person', name: 'Matthew Anderson', alternateName: ['Matthew Anderson Insurance', 'Matthew Insurance'], jobTitle: 'Founder & Licensed Broker', url: SITE + '/brokers/matthew-anderson', worksFor: { '@id': SITE + '/#organization' } },
    employee: [{ '@id': SITE + '/brokers/matthew-anderson#person' }],
    sameAs: [
      'https://www.instagram.com/lifehealthinc',
      'https://www.linkedin.com/in/matthew-anderson-797939296/',
      'https://www.youtube.com/@lifehealthinc',
      'https://x.com/LifeHealthInc_',
      'https://www.facebook.com/profile.php?id=61578880157602',
      'https://share.google/XeVUggp1K5NbT63hj'
    ],
    knowsAbout: ['Life Insurance', 'Indexed Universal Life', 'Whole Life Insurance', 'Term Life Insurance', 'Medicare Advantage', 'Medicare Supplement', 'ACA Health Insurance', 'Fixed Index Annuities', 'Final Expense Insurance', 'Mortgage Protection Insurance'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Insurance & Retirement Products',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Life Insurance', url: SITE + '/lifeinsurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Health Insurance', url: SITE + '/healthinsurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medicare Plans', url: SITE + '/medicare' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Annuities & Retirement Income', url: SITE + '/annuities' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Final Expense Insurance', url: SITE + '/finalexpense' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mortgage Protection', url: SITE + '/mortgageprotection' } }
      ]
    }
  };

  function ensure(sel, make) { var el = document.head.querySelector(sel); if (!el) { el = make(); document.head.appendChild(el); } return el; }
  function meta(attr, key, content) {
    var el = ensure('meta[' + attr + '="' + key + '"]', function () { var m = document.createElement('meta'); m.setAttribute(attr, key); return m; });
    el.setAttribute('content', content || '');
  }
  function jsonld(id, obj) {
    var el = ensure('script[data-lhi="' + id + '"]', function () { var s = document.createElement('script'); s.type = 'application/ld+json'; s.setAttribute('data-lhi', id); return s; });
    el.textContent = JSON.stringify(obj);
  }
  function removeJsonld(id) { var el = document.head.querySelector('script[data-lhi="' + id + '"]'); if (el) el.remove(); }

  window.__lhiSeo = function (pathname) {
    var path = (pathname || location.pathname).replace(/\/+$/, '') || '/';
    var key = path.toLowerCase();
    var m = META[key] || null;
    var t = m ? m.t : (BRAND + ' | Independent Insurance Brokerage');
    var d = m ? m.d : 'Independent insurance brokerage licensed in all 50 states. Life, health, Medicare and annuities from 50+ carriers. ' + PHONE;
    var canonical = SITE + (key === '/' ? '/' : key);
    var noindex = !!(m && m.noindex);

    document.title = t;
    meta('name', 'description', d);
    meta('name', 'keywords', (key === '/' ? 'LifeHealthInc, Life Health Inc, LifeHealth Inc, LifeHealth, Matthew Anderson insurance, ' : '') + 'independent insurance broker, life insurance, health insurance, Medicare, annuities, IUL, final expense, mortgage protection, Miami FL, all 50 states');
    meta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
    meta('property', 'og:site_name', 'LifeHealthInc');
    meta('property', 'og:type', m && m.article ? 'article' : 'website');
    meta('property', 'og:title', t);
    meta('property', 'og:description', d);
    meta('property', 'og:url', canonical);
    meta('property', 'og:image', OG_IMAGE);
    meta('property', 'og:image:width', '1200');
    meta('property', 'og:image:height', '630');
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:site', '@LifeHealthInc_');
    meta('name', 'twitter:title', t);
    meta('name', 'twitter:description', d);
    meta('name', 'twitter:image', OG_IMAGE);
    var link = ensure('link[rel="canonical"]', function () { var l = document.createElement('link'); l.rel = 'canonical'; return l; });
    link.href = canonical;

    jsonld('org', ORG);
    jsonld('website', { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', url: SITE, name: 'LifeHealthInc', alternateName: ['Life Health Inc', 'LifeHealth Inc', 'LifeHealth'], publisher: { '@id': SITE + '/#organization' }, creator: { '@type': 'Organization', name: 'Social Studio The Agency', url: 'https://www.socialstudiotheagency.com', description: 'Marketing, automation and web partner of LifeHealthInc' } });
    if (key === '/brokers/matthew-anderson' || key === '/matthew-anderson') {
      jsonld('person', { '@context': 'https://schema.org', '@type': 'Person', '@id': SITE + '/brokers/matthew-anderson#person', name: 'Matthew Anderson', alternateName: ['Matthew Anderson Insurance', 'Matthew Insurance'], jobTitle: 'Founder & Licensed Insurance Broker', worksFor: { '@id': SITE + '/#organization' }, url: canonical, telephone: '+1-954-543-0853', email: 'matthew@lifehealthinc.org', identifier: { '@type': 'PropertyValue', propertyID: 'NPN', value: '20770864' }, knowsAbout: ['Life Insurance', 'Indexed Universal Life', 'Medicare', 'Annuities', 'Health Insurance'], sameAs: ['https://www.linkedin.com/in/matthew-anderson-797939296/'] });
    } else removeJsonld('person');
    if (m && m.article) {
      jsonld('article', { '@context': 'https://schema.org', '@type': 'Article', headline: t.replace(/ \| LifeHealthInc$/, ''), description: d, url: canonical, image: OG_IMAGE, author: { '@type': 'Organization', name: 'LifeHealthInc' }, publisher: { '@id': SITE + '/#organization' }, mainEntityOfPage: canonical });
    } else removeJsonld('article');
    if (key !== '/' && !noindex) {
      var name = t.split(' | ')[0];
      jsonld('crumbs', { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: name, item: canonical } ] });
    } else removeJsonld('crumbs');
  };
  window.__lhiSeo(location.pathname);
})();
