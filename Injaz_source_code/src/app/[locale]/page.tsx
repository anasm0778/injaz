import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import LandingPage from "../user/landing_page/LandingPage";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["landingPage"];

export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <>
      <GoogleTagManager gtmId="GTM-KBG7S42T" />
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <LandingPage />
      </TranslationsProvider>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GTM-KBG7S42T"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16457594733');
              `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRental",
            name: "Injaz Rent A Car",
            alternateName: ["Injaz Car Rental", "Injaz Dubai Car Rental", "Injaz UAE Car Rental"],
            url: "https://injazrent.ae/",
            logo: "https://injazrent.ae/logic%20white%20colour%20logo.png",
            description: "Reliable & affordable car rental in Dubai & Abu Dhabi. Daily, weekly & monthly car hire. SUVs, sedans & luxury cars. Book online with Injaz Rent a Car.",
            slogan: "Affordable Car Rental Dubai - No Deposit Required",
            foundingDate: "2020",
            numberOfEmployees: "50-100",
            priceRange: "$$",
            currenciesAccepted: "D",
            paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
            areaServed: [
              {
                "@type": "City",
                name: "Dubai",
                "@id": "https://en.wikipedia.org/wiki/Dubai"
              },
              {
                "@type": "City", 
                name: "Abu Dhabi",
                "@id": "https://en.wikipedia.org/wiki/Abu_Dhabi"
              },
              {
                "@type": "Country",
                name: "United Arab Emirates",
                "@id": "https://en.wikipedia.org/wiki/United_Arab_Emirates"
              }
            ],
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 25.2048,
                longitude: 55.2708
              },
              geoRadius: "100000"
            },
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "Mohammed Bin Zayed City- ME10-C56",
                addressLocality: "Abu Dhabi",
                postalCode: "44737",
                addressRegion: "Abu Dhabi",
                addressCountry: "United Arab Emirates",
                addressCountryCode: "AE"
              },
              {
                "@type": "PostalAddress",
                streetAddress: "Dubai International Airport",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                addressCountry: "United Arab Emirates",
                addressCountryCode: "AE"
              }
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+971502378558",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic", "Hindi", "Urdu"],
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "23:59"
                }
              },
              {
                "@type": "ContactPoint",
                telephone: "+971509961569",
                contactType: "sales",
                availableLanguage: ["English", "Arabic", "Hindi", "Urdu"]
              }
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Car Rental Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Daily Car Rental",
                    description: "Affordable daily car rental in Dubai and Abu Dhabi"
                  }
                },
                {
                  "@type": "Offer", 
                  itemOffered: {
                    "@type": "Service",
                    name: "Weekly Car Rental",
                    description: "Best weekly car rental rates in UAE"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service", 
                    name: "Monthly Car Rental",
                    description: "Cheapest monthly car rental Dubai - No deposit required"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Luxury Car Rental",
                    description: "Luxury car rental Dubai cheap rates"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Airport Car Rental",
                    description: "Car rental Dubai airport terminal 1 & 2"
                  }
                }
              ]
            },
            makesOffer: [
              {
                "@type": "Offer",
                name: "No Deposit Car Rental",
                description: "Rent a car Dubai without deposit - Zero deposit car rental",
                price: "0",
                priceCurrency: "D"
              },
              {
                "@type": "Offer", 
                name: "Monthly Car Rental Special",
                description: "Cheapest monthly car rental Dubai starting from D 500",
                price: "500",
                priceCurrency: "D"
              }
            ],
            sameAs: [
              "https://www.facebook.com/people/LOGIC-RENT-A-CAR/61550608379423/",
              "https://twitter.com/",
              "https://www.linkedin.com/company/logic-rent-a-car/",
              "https://www.instagram.com/logicrent/",
            ],
            keywords: "affordable car rental, car rental no deposit, cheapest monthly car rental, luxury car rental dubai cheap, rent car in dubai without deposit, car rental dubai marina, cheapest rent a car, car rental rates, cheap weekly car rentals, rental cars dubai, range rover rental dubai, rent a car no deposit dubai, lowest car rental rates, car rental dxb, rent a car abu dhabi airport, cheap rent a car, car rental near me, car rental online, cheap car rentals near me, airport car rentals, best car rental prices, monthly car rental rates, long term car rental dubai, car rental Dubai, 1 month car rental dubai, car subscription no deposit, car rental app dubai, rent a car monthly basis, car rental per month, best monthly car rental, monthly car rental app, rent car low cost, car rental dubai, car rental abu dhabi, car rental uae, rent luxury car dubai, dubai luxury car rental, rent a car dubai, rent a car for aed 500 per month, rent a car without deposit near me, rent a car dubai airport, car rent cheap, rent cheap car, rent a car near me, cheapest monthly car rental, cheap long term car rental in dubai, cheapest car rentals in dubai, one month car rental in dubai, monthly car rentals near me in dubai, 3 month car rental in dubai, monthly car lease in dubai, car rental dubai no deposit in dubai, car rental in dubai, carrentals in dubai, car rental companies in dubai, best car rental company in dubai, daily rent a car dubai, logic term rental car in dubai, rent a car uae, dubai rent a car, cheap car rental in dubai, cheap cars rental in dubai, cheap rent a car dubai, rent a car for a month, rent a car for a month in dubai, rent a car in business bay, rent a car in downtown, rent a car in jvc, rent a car in jlt, rent a car in jabal ali, rent a car in silicon oasis, rent a car in jumeirah, rent a car in nad al sheba, rent a car in zabeel, rent a car in alqouz, rent a car in mudon dubai, rent nissan patrol in dubai, rent mercedes in dubai, rent mazda in dubai, rent toyota in dubai, rent kia in dubai, rent a car for aed 600 per month in dubai, car rental, car rentals, car rental companies, best car rental company, car rental places near me, best car rental, suv rental near me, cheapest rental cars near me, car rental places, car rental services, cheapest place to rent a car, rent a car today, rental cars near me, car rental in Abu Dhabi, Car rentals in Abu Dhabi, car rental companies in Abu Dhabi, best car rental company in Abu Dhabi, car rental places near me in Abu Dhabi, best car rental in Abu Dhabi, suv rental near me in Abu Dhabi, cheapest rental cars near me in Abu Dhabi, car rental places in Abu Dhabi, car rental services in Abu Dhabi, cheapest place to rent a car in Abu Dhabi, rent a car today in Abu Dhabi, rental cars near me in Abu Dhabi, rent a car in yas, yas island rent a car, rent a car in yas island, khalifa city rent a car, rent a car in mbz, mbz rent a car, rent a car in musaffah, musaffah rent a car, car rental in musaffah, rent a car in shabiya, rent a car mussafah, mussafah car rentals, car rentals in mussafah, cheap car rental in musaffah, best rent a car in musaffah, rent a car in mussafah without deposit, logic dubai rent a car"
          }),
        }}
      />
    </>
  );
}
