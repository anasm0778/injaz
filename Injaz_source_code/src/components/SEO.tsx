import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = "Logic Rent A Car Dubai | Affordable Car Rental No Deposit | Monthly Car Rental Dubai",
  description = "Best car rental Dubai with no deposit required. Affordable monthly car rental, luxury car rental Dubai cheap, rent car Dubai without deposit. Daily, weekly & monthly car rentals in Dubai, Abu Dhabi, UAE.",
  keywords = [
    'affordable car rental', 'car rental no deposit', 'cheapest monthly car rental', 'luxury car rental dubai cheap',
    'rent car in dubai without deposit', 'near rent a car', 'rent a car international city', 'best rental car prices',
    'car rental dubai marina', 'cheapest rent a car', 'car rental rates', 'cheap weekly car rentals',
    'discounted car rentals', 'cheap airport rentals', 'rental cars dubai', 'range rover rental dubai',
    'rent a car no deposit dubai', 'lowest car rental rates', 'rent car dubai no deposit', 'weekly rental car rates',
    'car rental dxb', 'rent a car abu dhabi airport', 'cheap rent a car', 'car rental near me',
    'car rental online', 'cheap car rentals near me', 'airport car rentals', 'car rental dubai airport terminal 2',
    'cheap airport car rentals', 'rental car deals near me', 'best place to rent a car', 'car rental dubai airport terminal 1',
    'best car rental prices', 'rental car app', 'month to month car rental', 'month long car rental',
    'monthly car rental rates', 'cheapest way to rent a car for a month', 'long term car rental dubai',
    'car rental Dubai', '1 month car rental dubai', 'month to month car lease', 'subscription car service',
    'car subscription no deposit', 'car rental app dubai', 'car on subscription', 'rent a car monthly basis',
    'car rental per month', 'best way to rent a car for a month', 'best monthly car rental', 'monthly car rental app',
    'rent car low cost', 'car rental dubai', 'car subscription near me', 'car rental monthly subscription',
    'car rental abu dhabi', 'car rental uae', 'rent luxury car dubai', 'dubai luxury car rental',
    'rent a car dubai', 'rent a car for aed 500 per month', 'rent a car without deposit near me',
    'rent a car dubai airport', 'car rent cheap', 'rent cheap car', 'rent a car near me',
    'cheapest monthly car rental', 'cheap long term car rental in dubai', 'cheapest car rentals in dubai',
    'one month car rental in dubai', 'monthly car rentals near me in dubai', '3 month car rental in dubai',
    'monthly car lease in dubai', 'car rental dubai no deposit in dubai', 'car rental in dubai',
    'carrentals in dubai', 'car rental companies in dubai', 'best car rental company in dubai',
    'daily rent a car dubai', 'logic term rental car in dubai', 'rent a car uae', 'dubai rent a car',
    'cheap car rental in dubai', 'cheap cars rental in dubai', 'cheap rent a car dubai',
    'rent a car for a month', 'rent a car for a month in dubai', 'rent a car in business bay',
    'rent a car in downtown', 'rent a car in jvc', 'rent a car in jlt', 'rent a car in jabal ali',
    'rent a car in silicon oasis', 'rent a car in jumeirah', 'rent a car in nad al sheba',
    'rent a car in zabeel', 'rent a car in alqouz', 'rent a car in mudon dubai',
    'rent nissan patrol in dubai', 'rent mercedes in dubai', 'rent mazda in dubai',
    'rent toyota in dubai', 'rent kia in dubai', 'rent a car for aed 600 per month in dubai',
    'car rental', 'car rentals', 'car rental companies', 'best car rental company',
    'car rental places near me', 'best car rental', 'suv rental near me', 'cheapest rental cars near me',
    'car rental places', 'car rental services', 'cheapest place to rent a car', 'rent a car today',
    'rental cars near me', 'car rental in Abu Dhabi', 'Car rentals in Abu Dhabi',
    'car rental companies in Abu Dhabi', 'best car rental company in Abu Dhabi',
    'car rental places near me in Abu Dhabi', 'best car rental in Abu Dhabi',
    'suv rental near me in Abu Dhabi', 'cheapest rental cars near me in Abu Dhabi',
    'car rental places in Abu Dhabi', 'car rental services in Abu Dhabi',
    'cheapest place to rent a car in Abu Dhabi', 'rent a car today in Abu Dhabi',
    'rental cars near me in Abu Dhabi', 'rent a car in yas', 'yas island rent a car',
    'rent a car in yas island', 'khalifa city rent a car', 'rent a car in mbz', 'mbz rent a car',
    'rent a car in musaffah', 'musaffah rent a car', 'car rental in musaffah',
    'rent a car in shabiya', 'rent a car mussafah', 'mussafah car rentals',
    'car rentals in mussafah', 'cheap car rental in musaffah', 'best rent a car in musaffah',
    'rent a car in mussafah without deposit', 'logic dubai rent a car'
  ],
  canonicalUrl = "https://logicrent.ae/",
  ogImage = "https://logicrent.ae/logic%20white%20colour%20logo.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  structuredData
}) => {
  const fullTitle = title.includes('Logic Rent A Car') ? title : `${title} | Logic Rent A Car Dubai`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Logic Rent A Car" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Logic Rent A Car Dubai - Best Car Rental Service" />
      <meta property="og:site_name" content="Logic Rent A Car" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Logic Rent A Car Dubai - Best Car Rental Service" />
      <meta name="twitter:site" content="@logicrent" />
      <meta name="twitter:creator" content="@logicrent" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#01437D" />
      <meta name="msapplication-TileColor" content="#01437D" />
      <meta name="apple-mobile-web-app-title" content="Logic Rent A Car" />
      <meta name="application-name" content="Logic Rent A Car" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      
      {/* Language Tags */}
      <meta httpEquiv="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href="https://logicrent.ae/en" />
      <link rel="alternate" hrefLang="ar" href="https://logicrent.ae/ar" />
      <link rel="alternate" hrefLang="x-default" href="https://logicrent.ae/" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Head>
  );
};

export default SEO;
