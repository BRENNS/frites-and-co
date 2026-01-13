"use client";

export function StructuredData() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://frites-and-co.fr/#restaurant",
    name: "Frites & Co",
    alternateName: "Frites and Co",
    description:
      "Restaurant de burgers artisanaux à Charleville-Mézières. Frites maison double cuisson à la belge, sauces artisanales. Maison à Burgers depuis 2010.",
    url: "https://frites-and-co.fr",
    telephone: "+33324262948",
    email: "frites-and-co@orange.fr",
    image: [
      "https://frites-and-co.fr/og-image.jpg",
      "https://frites-and-co.fr/assets/hero-bg.webp",
    ],
    logo: "https://frites-and-co.fr/assets/logo/logo - Frites and Co.png",
    priceRange: "€€",
    servesCuisine: ["Burgers", "Frites", "Américain", "Fast-casual"],
    acceptsReservations: "True",
    hasMenu: "https://app.suzzyapp.com/frites-and-co-c174/dine-in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Place Ducale",
      addressLocality: "Charleville-Mézières",
      addressRegion: "Grand Est",
      postalCode: "08000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.7697, // Coordonnées approximatives Place Ducale
      longitude: 4.7203,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "12:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "19:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/fritesandco",
      "https://www.instagram.com/fritesandco",
      "https://www.tripadvisor.fr/Restaurant_Review-Frites_and_Co",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://app.suzzyapp.com/frites-and-co-c174/reservation",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Réservation Frites & Co",
      },
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://frites-and-co.fr/#localbusiness",
    name: "Frites & Co",
    description:
      "Maison à Burgers depuis 2010. Burgers artisanaux et frites maison double cuisson à la belge.",
    url: "https://frites-and-co.fr",
    image: "https://frites-and-co.fr/og-image.jpg",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Place Ducale",
      addressLocality: "Charleville-Mézières",
      postalCode: "08000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.7697,
      longitude: 4.7203,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.7697,
        longitude: 4.7203,
      },
      geoRadius: "30000",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://frites-and-co.fr",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://frites-and-co.fr/#website",
    url: "https://frites-and-co.fr",
    name: "Frites & Co",
    description: "Restaurant de burgers artisanaux à Charleville-Mézières",
    publisher: {
      "@id": "https://frites-and-co.fr/#restaurant",
    },
    inLanguage: ["fr-FR", "en-GB", "nl-NL"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
