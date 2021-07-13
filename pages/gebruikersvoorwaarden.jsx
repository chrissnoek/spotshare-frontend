import Head from "next/head";

const Page = () => {
  return (
    <div>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Gebruikersvoorwaarden website | Spotshare</title>
        <meta
          name="title"
          content="Gebruikersvoorwaarden website | Spotshare"
        />
        <meta
          name="description"
          content="Gebruikersvoorwaarden website. Welke regels gelden voor het gebruik van websites van Spotshare?"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:url" content="https://www.spotshare.nl/gebruikersvoorwaarden" />
        <meta
          property="og:title"
          content="Gebruikersvoorwaarden website | Spotshare"
        />
        <meta
          property="og:description"
          content="Gebruikersvoorwaarden website. Welke regels gelden voor het gebruik van websites van Spotshare?"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.spotshare.nl/gebruikersvoorwaarden" />
        <meta
          property="twitter:title"
          content="Gebruikersvoorwaarden website | Spotshare"
        />
        <meta
          property="twitter:description"
          content="Gebruikersvoorwaarden website. Welke regels gelden voor het gebruik van websites van Spotshare?"
        />
      </Head>
      <div className="container mx-auto py-12">
        <h1>Gebruikersvoorwaarden</h1>
        <p className="py-2">
          Hieronder vind je de gebruikersvoorwaarden van SpotShare, waarmee je
          akkoord gaat bij gebruik van de website.
        </p>

        <p className="py-2">
          Wanneer je foto’s plaatst op SpotShare.nl verklaar je dat je bevoegd
          bent om deze foto’s te plaatsen en je garandeert de maker te zijn van
          deze foto’s. Als de auteurs-, handels- of andere rechten worden
          geschonden, is het aan de gedupeerde om hierop actie te ondernemen
          richting de schenders van de rechten. SpotShare staat hier volledig
          buiten en speelt hierbij geen enkele rol.
        </p>

        <p className="py-2">
          Bij het gebruik van SpotShare.nl ben je zelf verantwoordelijk voor de
          juistheid en volledigheid van de inhoud die je plaatst. SpotShare
          draagt voor de inhoud van het geplaatste materiaal geen enkele
          verantwoordelijkheid.
        </p>

        <p className="py-2">
          Wanneer je foto’s plaatst op SpotShare.nl verleen je SpotShare een
          kosteloos, niet-exclusief recht toe om het geplaatste materiaal te
          gebruiken en weer te geven, bijvoorbeeld voor het posten van
          desbetreffende foto('s) op sociale media als feature.
        </p>

        <p className="py-2">
          Wanneer je foto’s plaatst op SpotShare.nl garandeer je dat de foto
          voldoet aan en blijft voldoen aan toepasselijke wet- en regelgeving
          en, in het bijzonder, niet in strijd is of komt met openbaar beleid en
          algemeen geaccepteerde waarden en normen en niet zal (gaan) bevatten:
          beledigende, grove of onterende materialen en / of uitspraken,
          elementen die de privacy van derden aantasten of die aanstootgevend of
          obsceen zijn, of die mogelijk aanzetten tot overtredingen of
          misdrijven. Het is dus onder meer - doch niet uitsluitend - verboden
          om vulgair, hatelijk, bedreigend en (kinder-) pornografischmateriaal
          te plaatsen. Foto’s die in strijd zijn met deze bepalingen zullen
          worden verwijderd. SpotShare is niet aansprakelijk voor de inhoud op
          de website.
        </p>

        <p className="py-2">
          Wanneer je je registreert op&nbsp;SpotShare.nl ga je akkoord met het
          feit dat alle verstrekte data wordt opgeslagen en bewaard in een
          database. Deze informatie wordt niet gedeeld met een derde partij
          zonder toestemming, tenzij er strafbare feiten worden geconstateerd.
          SpotShare kan niet verantwoordelijk gesteld worden bij een hack.
        </p>
      </div>
    </div>
  );
};

export default Page;
