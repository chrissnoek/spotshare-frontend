const withImages = require("next-images");
module.exports = withImages({
  webpack(config, { dev }) {
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve("url-loader")
    },
    {
      test: /\.svg$/,
      oneOf: [
        {
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: [
      "spotsharenl.s3.eu-central-1.amazonaws.com",
      "picsum.photos",
      "scontent-ams4-1.cdninstagram.com",
    ],
  },
  async redirects() {
    return [
      {
  source: '/member/:path*',
  destination: '/fotograaf/:path*',
  permanent: true
},
      {
source: '/login',
destination: '/inloggen',
permanent: true,
},
      {
source: '/foto/chainbridge-edam',
destination: '/foto/chainbridge-edam',
permanent: true,
},
{
source: '/foto/harbour-entrance-volendam',
destination: '/foto/harbour-entrance-volendam',
permanent: true,
},
{
source: '/foto/autumn-haze',
destination: '/foto/autumn-haze',
permanent: true,
},
{
source: '/foto/marken',
destination: '/foto/marken',
permanent: true,
},
{
source: '/foto/1505416289',
destination: '/foto/volendam',
permanent: true,
},
{
source: '/foto/1507546052',
destination: '/foto/noordeinde-volendam',
permanent: true,
},
{
source: '/foto/1507751803',
destination: '/foto/golden-hour',
permanent: true,
},
{
source: '/foto/1507751870',
destination: '/foto/molen-bij-het-blauwe-uur',
permanent: true,
},
{
source: '/foto/1508018905',
destination: '/foto/nederlands-tafereel',
permanent: true,
},
{
source: '/foto/1508019051',
destination: '/foto/nationale-molendag',
permanent: true,
},
{
source: '/foto/1508019172',
destination: '/foto/hasselt-in-de-nacht',
permanent: true,
},
{
source: '/foto/1508140998',
destination: '/foto/sunset-wave',
permanent: true,
},
{
source: '/foto/1508181236',
destination: '/foto/marken',
permanent: true,
},
{
source: '/foto/1508183910',
destination: '/foto/sluis-hindeloopen',
permanent: true,
},
{
source: '/foto/1508236963',
destination: '/foto/rosmolen-landgoed-geijsteren',
permanent: true,
},
{
source: '/foto/1508435651',
destination: '/foto/paard-van-marken',
permanent: true,
},
{
source: '/foto/1508580708',
destination: '/foto/sunrise-colours',
permanent: true,
},
{
source: '/foto/1508581299',
destination: '/foto/autumn-colours',
permanent: true,
},
{
source: '/foto/1508581352',
destination: '/foto/stairway-to-heaven',
permanent: true,
},
{
source: '/foto/1508581419',
destination: '/foto/sunrise-reflections',
permanent: true,
},
{
source: '/foto/1508581623',
destination: '/foto/the-perfect-shot',
permanent: true,
},
{
source: '/foto/1508581797',
destination: '/foto/dutch-landscape',
permanent: true,
},
{
source: '/foto/1508582257',
destination: '/foto/helpermolen-at-night',
permanent: true,
},
{
source: '/foto/1508582402',
destination: '/foto/sunset-at-scheveningen',
permanent: true,
},
{
source: '/foto/1508582596',
destination: '/foto/purple-morning',
permanent: true,
},
{
source: '/foto/1508586112',
destination: '/foto/pink-twilight-lelieven',
permanent: true,
},
{
source: '/foto/1508667146',
destination: '/foto/le-zaanse-schans',
permanent: true,
},
{
source: '/foto/1508667532',
destination: '/foto/zonsondergang-hindeloopen',
permanent: true,
},
{
source: '/foto/1508783479',
destination: '/foto/wet-feet',
permanent: true,
},
{
source: '/foto/1509123896',
destination: '/foto/haven-van-marken-bij-zonsondergang',
permanent: true,
},
{
source: '/foto/1509528867',
destination: '/foto/dancing-in-the-sunlight',
permanent: true,
},
{
source: '/foto/1510044171',
destination: '/foto/singel-blauwburgwal-during-blue-hour',
permanent: true,
},
{
source: '/foto/1510045123',
destination: '/foto/twilight-from-blauwburgwal-singel',
permanent: true,
},
{
source: '/foto/1510045334',
destination: '/foto/damrak-city-lights-amsterdam',
permanent: true,
},
{
source: '/foto/1510301674',
destination: '/foto/mooie-ontmoetingen-tijden-het-quot-gouden-uurtje-quot',
permanent: true,
},
{
source: '/foto/1510306394',
destination: '/foto/the-biker-on-the-misty-bald-willow-lane-part-deux',
permanent: true,
},
{
source: '/foto/1510351303',
destination: '/foto/amsterdams-039-magical-nights',
permanent: true,
},
{
source: '/foto/1510661439',
destination: '/foto/warm-november-sun',
permanent: true,
},
{
source: '/foto/1510737500',
destination: '/foto/the-old-railway',
permanent: true,
},
{
source: '/foto/1511094558',
destination: '/foto/kinderdijk-ontwaakt',
permanent: true,
},
{
source: '/foto/1511119462',
destination: '/foto/blauwe-uurtje-veneslagen',
permanent: true,
},
{
source: '/foto/1511944792',
destination: '/foto/morning-reflections',
permanent: true,
},
{
source: '/foto/1512392611',
destination: '/foto/sunset-in-amsterdam',
permanent: true,
},
{
source: '/foto/1512392940',
destination: '/foto/molens',
permanent: true,
},
{
source: '/foto/1512392993',
destination: '/foto/sunset-windmill',
permanent: true,
},
{
source: '/foto/1512393091',
destination: '/foto/castle-and-roses',
permanent: true,
},
{
source: '/foto/1512811345',
destination: '/foto/weesp',
permanent: true,
},
{
source: '/foto/1514544483',
destination: '/foto/scheepvaartmuseum',
permanent: true,
},
{
source: '/foto/1514552918',
destination: '/foto/sterke-stroming',
permanent: true,
},
{
source: '/foto/1514553056',
destination: '/foto/mistige-ochtend',
permanent: true,
},
{
source: '/foto/1514553164',
destination: '/foto/het-laatste-daglicht',
permanent: true,
},
{
source: '/foto/1514636968',
destination: '/foto/icebreaker',
permanent: true,
},
{
source: '/foto/1514656180',
destination: '/foto/home-is-where-the-anchor-drops',
permanent: true,
},
{
source: '/foto/1514656272',
destination: '/foto/the-perfect-sunrise',
permanent: true,
},
{
source: '/foto/1514726420',
destination: '/foto/skyline-amsterdam',
permanent: true,
},
{
source: '/foto/1514726645',
destination: '/foto/de-koppelpoort-amersfoort',
permanent: true,
},
{
source: '/foto/1514726871',
destination: '/foto/de-andere-kant-koppelpoort-amersfoort',
permanent: true,
},
{
source: '/foto/1514806450',
destination: '/foto/trailerhelling-gooimeer-almere',
permanent: true,
},
{
source: '/foto/1514807362',
destination: '/foto/calm-sunrise',
permanent: true,
},
{
source: '/foto/1514971781',
destination: '/foto/marken-ontwaakt',
permanent: true,
},
{
source: '/foto/1515158792',
destination: '/foto/drijvend-paviljoen',
permanent: true,
},
{
source: '/foto/1515185337',
destination: '/foto/zonsopkomst-den-osse-brouwersdam',
permanent: true,
},
{
source: '/foto/1515233180',
destination: '/foto/zomer-in-volendam',
permanent: true,
},
{
source: '/foto/1515249227',
destination: '/foto/sunrishing',
permanent: true,
},
{
source: '/foto/1515522610',
destination: '/foto/under-the-bridge',
permanent: true,
},
{
source: '/foto/1515694641',
destination: '/foto/korenbeurs-groningen',
permanent: true,
},
{
source: '/foto/1517338511',
destination: '/foto/surfing-bird',
permanent: true,
},
{
source: '/foto/1517339663',
destination: '/foto/castle-the-haar',
permanent: true,
},
{
source: '/foto/1517341695',
destination: '/foto/mills-on-hills',
permanent: true,
},
{
source: '/foto/1517481076',
destination: '/foto/nemo-museum',
permanent: true,
},
{
source: '/foto/1517481118',
destination: '/foto/voorkant-museum',
permanent: true,
},
{
source: '/foto/1517516068',
destination: '/foto/sallandse-heuvelrug-national-park',
permanent: true,
},
{
source: '/foto/1517524519',
destination: '/foto/huizen-langs-de-maas',
permanent: true,
},
{
source: '/foto/1517582405',
destination: '/foto/golden-hour-over-central-amsterdam',
permanent: true,
},
{
source: '/foto/1517846146',
destination: '/foto/through-the-trees',
permanent: true,
},
{
source: '/foto/1517846265',
destination: '/foto/walk-in-the-forest',
permanent: true,
},
{
source: '/foto/1517846494',
destination: '/foto/living-in-reflection',
permanent: true,
},
{
source: '/foto/1517846650',
destination: '/foto/fairy-tale-bridge',
permanent: true,
},
{
source: '/foto/1517846716',
destination: '/foto/king-of-my-castle',
permanent: true,
},
{
source: '/foto/1517846869',
destination: '/foto/bird-039-s-eye',
permanent: true,
},
{
source: '/foto/1517847154',
destination: '/foto/ponded-reflection',
permanent: true,
},
{
source: '/foto/1517847245',
destination: '/foto/fenced',
permanent: true,
},
{
source: '/foto/1517847733',
destination: '/foto/path-of-the-righteous',
permanent: true,
},
{
source: '/foto/1517848098',
destination: '/foto/path-to-greener-lands',
permanent: true,
},
{
source: '/foto/1518372914',
destination: '/foto/storm-bij-de-erasmusbrug',
permanent: true,
},
{
source: '/foto/1518548944',
destination: '/foto/zonsondergang-wolfsbarge',
permanent: true,
},
{
source: '/foto/1518719365',
destination: '/foto/aircrash-investigation',
permanent: true,
},
{
source: '/foto/1518790193',
destination: '/foto/view-through-the-reed',
permanent: true,
},
{
source: '/foto/1519055822',
destination: '/foto/sunset-urk',
permanent: true,
},
{
source: '/foto/1519125893',
destination: '/foto/delfshaven',
permanent: true,
},
{
source: '/foto/1519125956',
destination: '/foto/historisch-delfshaven',
permanent: true,
},
{
source: '/foto/1519579108',
destination: '/foto/le-gorinchem',
permanent: true,
},
{
source: '/foto/1519645974',
destination: '/foto/cold-sunrise',
permanent: true,
},
{
source: '/foto/1520085959',
destination: '/foto/bevroren-delfshaven',
permanent: true,
},
{
source: '/foto/1520419669',
destination: '/foto/staalwol-bij-de-stalen-man',
permanent: true,
},
{
source: '/foto/1520424452',
destination: '/foto/schokland-in-ijstijd',
permanent: true,
},
{
source: '/foto/1520424589',
destination: '/foto/panorama-oud-emmeloord',
permanent: true,
},
{
source: '/foto/1520424858',
destination: '/foto/letterlijk-moddergat',
permanent: true,
},
{
source: '/foto/1520424987',
destination: '/foto/zwembad-zeewolde-21-februari-2018',
permanent: true,
},
{
source: '/foto/1520425307',
destination: '/foto/skyline-kampen',
permanent: true,
},
{
source: '/foto/1520425493',
destination: '/foto/look-down',
permanent: true,
},
{
source: '/foto/1520426726',
destination: '/foto/zonsondergang-op-urk',
permanent: true,
},
{
source: '/foto/1520426893',
destination: '/foto/ijsbrekers-schokland-oude-haven-emmeloord',
permanent: true,
},
{
source: '/foto/1520450956',
destination: '/foto/las-palmas',
permanent: true,
},
{
source: '/foto/1520758125',
destination: '/foto/pier-horizon',
permanent: true,
},
{
source: '/foto/1520761403',
destination: '/foto/artic-rotterdam',
permanent: true,
},
{
source: '/foto/1520761552',
destination: '/foto/erasmusbrug-in-kleur',
permanent: true,
},
{
source: '/foto/1520763626',
destination: '/foto/rijnhaven',
permanent: true,
},
{
source: '/foto/1520765743',
destination: '/foto/grote-klotteraard-turnhout',
permanent: true,
},
{
source: '/foto/1520765929',
destination: '/foto/stand-urk',
permanent: true,
},
{
source: '/foto/1520766025',
destination: '/foto/kerkje-aan-de-zee',
permanent: true,
},
{
source: '/foto/1520766161',
destination: '/foto/haven-oud-emmeloord',
permanent: true,
},
{
source: '/foto/1520768450',
destination: '/foto/boulevard-urk',
permanent: true,
},
{
source: '/foto/1520768545',
destination: '/foto/boulevard-urk',
permanent: true,
},
{
source: '/foto/1520780857',
destination: '/foto/rokade-spijkenisse',
permanent: true,
},
{
source: '/foto/1520781877',
destination: '/foto/rokade-aan-de-maas',
permanent: true,
},
{
source: '/foto/1520782401',
destination: '/foto/het-wad-bij-wierum',
permanent: true,
},
{
source: '/foto/1520783345',
destination: '/foto/zonsondergang-boven-het-lauwersmeer',
permanent: true,
},
{
source: '/foto/1520785458',
destination: '/foto/het-paard-in-marken',
permanent: true,
},
{
source: '/foto/1520790123',
destination: '/foto/delfshaven-by-night',
permanent: true,
},
{
source: '/foto/1520801332',
destination: '/foto/korte-havenbrug',
permanent: true,
},
{
source: '/foto/1520872642',
destination: '/foto/exposure',
permanent: true,
},
{
source: '/foto/1520872919',
destination: '/foto/zaanse-schans',
permanent: true,
},
{
source: '/foto/1520873102',
destination: '/foto/green-in-blue',
permanent: true,
},
{
source: '/foto/1520873447',
destination: '/foto/damrak',
permanent: true,
},
{
source: '/foto/1520873542',
destination: '/foto/amsterdam',
permanent: true,
},
{
source: '/foto/1520877534',
destination: '/foto/bospad-het-diepe-ravijn',
permanent: true,
},
{
source: '/foto/1520879092',
destination: '/foto/oisterwijk',
permanent: true,
},
{
source: '/foto/1520892021',
destination: '/foto/oud-spoor',
permanent: true,
},
{
source: '/foto/1520892771',
destination: '/foto/de-dommel',
permanent: true,
},
{
source: '/foto/1520892833',
destination: '/foto/knuppelbruggetje',
permanent: true,
},
{
source: '/foto/1520892890',
destination: '/foto/ven-in-de-malpie',
permanent: true,
},
{
source: '/foto/1520925439',
destination: '/foto/holland',
permanent: true,
},
{
source: '/foto/1520974166',
destination: '/foto/oude-ambachtelijke-werf',
permanent: true,
},
{
source: '/foto/1521132461',
destination: '/foto/het-groote-dok',
permanent: true,
},
{
source: '/foto/1521300594',
destination: '/foto/sunrise-schokkerhaven',
permanent: true,
},
{
source: '/foto/1521302563',
destination: '/foto/elswout',
permanent: true,
},
{
source: '/foto/1521317076',
destination: '/foto/rotterdam-in-vuur-en-vlam',
permanent: true,
},
{
source: '/foto/1521318296',
destination: '/foto/there-is-a-storm-coming',
permanent: true,
},
{
source: '/foto/1521318574',
destination: '/foto/little-holland',
permanent: true,
},
{
source: '/foto/1521358929',
destination: '/foto/stilte-op-het-markermeer',
permanent: true,
},
{
source: '/foto/1521359151',
destination: '/foto/meerpaal-plein',
permanent: true,
},
{
source: '/foto/1521359251',
destination: '/foto/station-dronten',
permanent: true,
},
{
source: '/foto/1521359297',
destination: '/foto/sprinter',
permanent: true,
},
{
source: '/foto/1521359478',
destination: '/foto/rotterdam-in-een-plaat',
permanent: true,
},
{
source: '/foto/1521359537',
destination: '/foto/rotterdam-in-een-plaat-nacht-opname',
permanent: true,
},
{
source: '/foto/1521359684',
destination: '/foto/cube',
permanent: true,
},
{
source: '/foto/1521359774',
destination: '/foto/haven-van-dronten',
permanent: true,
},
{
source: '/foto/1521360031',
destination: '/foto/station-delft',
permanent: true,
},
{
source: '/foto/1521360192',
destination: '/foto/terschelling',
permanent: true,
},
{
source: '/foto/1521360298',
destination: '/foto/strand-texel',
permanent: true,
},
{
source: '/foto/1521360415',
destination: '/foto/texel-lighthouse',
permanent: true,
},
{
source: '/foto/1521360522',
destination: '/foto/stations-tunnel-zwolle',
permanent: true,
},
{
source: '/foto/1521360549',
destination: '/foto/rush-hour',
permanent: true,
},
{
source: '/foto/1521360689',
destination: '/foto/sterrenhemel-in-de-polder',
permanent: true,
},
{
source: '/foto/1521360792',
destination: '/foto/theater-de-meerpaal',
permanent: true,
},
{
source: '/foto/1521360914',
destination: '/foto/klm-ready-to-depart',
permanent: true,
},
{
source: '/foto/1521361018',
destination: '/foto/agora-theater',
permanent: true,
},
{
source: '/foto/1521361158',
destination: '/foto/middenop-erasmus-brug',
permanent: true,
},
{
source: '/foto/1521361354',
destination: '/foto/heesterveld-creatieve-community',
permanent: true,
},
{
source: '/foto/1521361467',
destination: '/foto/de-wieden',
permanent: true,
},
{
source: '/foto/1521361534',
destination: '/foto/papiermolensluis',
permanent: true,
},
{
source: '/foto/1521361701',
destination: '/foto/aviodrome',
permanent: true,
},
{
source: '/foto/1521361852',
destination: '/foto/look-down',
permanent: true,
},
{
source: '/foto/1521361925',
destination: '/foto/kinderdijk-zonsopkomst',
permanent: true,
},
{
source: '/foto/1521362035',
destination: '/foto/kop-van-t-ende',
permanent: true,
},
{
source: '/foto/1521362148',
destination: '/foto/dijkje-met-de-bocht',
permanent: true,
},
{
source: '/foto/1521362337',
destination: '/foto/vuurtoren-eiland',
permanent: true,
},
{
source: '/foto/1521362608',
destination: '/foto/paard-van-marken-onder-de-ijskristallen-verborgen',
permanent: true,
},
{
source: '/foto/1521362675',
destination: '/foto/ijsbrekers',
permanent: true,
},
{
source: '/foto/1521369657',
destination: '/foto/magere-brug-amsterdam',
permanent: true,
},
{
source: '/foto/1521372366',
destination: '/foto/het-mini-paard-van-marken',
permanent: true,
},
{
source: '/foto/1521397745',
destination: '/foto/ketelbrug',
permanent: true,
},
{
source: '/foto/1521397973',
destination: '/foto/buitje',
permanent: true,
},
{
source: '/foto/1521407411',
destination: '/foto/tranquility',
permanent: true,
},
{
source: '/foto/1521490491',
destination: '/foto/de-hef',
permanent: true,
},
{
source: '/foto/1521526333',
destination: '/foto/cold-sunset',
permanent: true,
},
{
source: '/foto/1521544669',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1521550385',
destination: '/foto/het-paard-van-marken',
permanent: true,
},
{
source: '/foto/1521550462',
destination: '/foto/winter-in-kinderdijk',
permanent: true,
},
{
source: '/foto/1521550595',
destination: '/foto/schokland',
permanent: true,
},
{
source: '/foto/1521654861',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521655044',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521656567',
destination: '/foto/rainbow-windmill',
permanent: true,
},
{
source: '/foto/1521669337',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521669371',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521669415',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521669451',
destination: '/foto/spoorwegmuseum-utrecht',
permanent: true,
},
{
source: '/foto/1521670534',
destination: '/foto/de-hef-rotterdam',
permanent: true,
},
{
source: '/foto/1521670668',
destination: '/foto/de-biesbosch',
permanent: true,
},
{
source: '/foto/1521670714',
destination: '/foto/de-biesbosch',
permanent: true,
},
{
source: '/foto/1521670726',
destination: '/foto/bruggetje-over-de-dommel',
permanent: true,
},
{
source: '/foto/1521670784',
destination: '/foto/de-dommel',
permanent: true,
},
{
source: '/foto/1521670788',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1521670959',
destination: '/foto/het-land-van-ooit',
permanent: true,
},
{
source: '/foto/1521670994',
destination: '/foto/land-van-ooit-in-nieuwkuijk',
permanent: true,
},
{
source: '/foto/1521671013',
destination: '/foto/land-van-ooit-in-nieuwkuijk',
permanent: true,
},
{
source: '/foto/1521671031',
destination: '/foto/land-van-ooit-in-nieuwkuijk',
permanent: true,
},
{
source: '/foto/1521671050',
destination: '/foto/land-van-ooit-in-nieuwkuijk',
permanent: true,
},
{
source: '/foto/1521671210',
destination: '/foto/s-s-rotterdam',
permanent: true,
},
{
source: '/foto/1521671254',
destination: '/foto/het-s-s-rotterdam',
permanent: true,
},
{
source: '/foto/1521671377',
destination: '/foto/radio-kootwijk',
permanent: true,
},
{
source: '/foto/1521671464',
destination: '/foto/sanatorium-zonnestraal',
permanent: true,
},
{
source: '/foto/1521671494',
destination: '/foto/sanatorium-zonnestraal',
permanent: true,
},
{
source: '/foto/1521671515',
destination: '/foto/sanatorium-zonnestraal',
permanent: true,
},
{
source: '/foto/1521671540',
destination: '/foto/sanatorium-zonnestraal',
permanent: true,
},
{
source: '/foto/1521734469',
destination: '/foto/het-huisje',
permanent: true,
},
{
source: '/foto/1521812518',
destination: '/foto/magere-brug-amsterdam',
permanent: true,
},
{
source: '/foto/1521878168',
destination: '/foto/zonsopkomst-gezien-vanuit-moerenburg',
permanent: true,
},
{
source: '/foto/1521878750',
destination: '/foto/piushaven-in-de-avond',
permanent: true,
},
{
source: '/foto/1521878831',
destination: '/foto/piushaven-in-de-avond',
permanent: true,
},
{
source: '/foto/1522348753',
destination: '/foto/zoutelande',
permanent: true,
},
{
source: '/foto/1522350564',
destination: '/foto/ede-kreelsche-plas',
permanent: true,
},
{
source: '/foto/1522351923',
destination: '/foto/westkapelle',
permanent: true,
},
{
source: '/foto/1522352279',
destination: '/foto/groningen-martinikerk',
permanent: true,
},
{
source: '/foto/1522353073',
destination: '/foto/burgh-haamstede',
permanent: true,
},
{
source: '/foto/1522353951',
destination: '/foto/den-bosch-binnendieze',
permanent: true,
},
{
source: '/foto/1522400915',
destination: '/foto/madurodam-voor-groot-en-klein',
permanent: true,
},
{
source: '/foto/1522401176',
destination: '/foto/zeelandbrug',
permanent: true,
},
{
source: '/foto/1522401629',
destination: '/foto/markthal-rotterdam',
permanent: true,
},
{
source: '/foto/1522422544',
destination: '/foto/hyacintenveld',
permanent: true,
},
{
source: '/foto/1522422841',
destination: '/foto/tulpen-in-flevoland',
permanent: true,
},
{
source: '/foto/1522422980',
destination: '/foto/hyacintenveld',
permanent: true,
},
{
source: '/foto/1522423134',
destination: '/foto/narcissenveld',
permanent: true,
},
{
source: '/foto/1522423305',
destination: '/foto/tulpenveld',
permanent: true,
},
{
source: '/foto/1522423449',
destination: '/foto/dreigende-lucht',
permanent: true,
},
{
source: '/foto/1522444967',
destination: '/foto/castellum',
permanent: true,
},
{
source: '/foto/1522478509',
destination: '/foto/wings',
permanent: true,
},
{
source: '/foto/1522479247',
destination: '/foto/spiegeling-laurentiuskerk',
permanent: true,
},
{
source: '/foto/1522487902',
destination: '/foto/lauwersoog',
permanent: true,
},
{
source: '/foto/1522488304',
destination: '/foto/eb',
permanent: true,
},
{
source: '/foto/1522488533',
destination: '/foto/rijsdam',
permanent: true,
},
{
source: '/foto/1522488818',
destination: '/foto/wierum',
permanent: true,
},
{
source: '/foto/1522489296',
destination: '/foto/tulpen',
permanent: true,
},
{
source: '/foto/1522490290',
destination: '/foto/schotsehooglanders',
permanent: true,
},
{
source: '/foto/1522490627',
destination: '/foto/grutto',
permanent: true,
},
{
source: '/foto/1522491061',
destination: '/foto/bandsehoek',
permanent: true,
},
{
source: '/foto/1522491428',
destination: '/foto/ternaard',
permanent: true,
},
{
source: '/foto/1522491928',
destination: '/foto/rimpeling',
permanent: true,
},
{
source: '/foto/1522492997',
destination: '/foto/wierum-in-de-winter',
permanent: true,
},
{
source: '/foto/1522493790',
destination: '/foto/renesse',
permanent: true,
},
{
source: '/foto/1522519063',
destination: '/foto/vluchtkerkje',
permanent: true,
},
{
source: '/foto/1522519599',
destination: '/foto/mist',
permanent: true,
},
{
source: '/foto/1522523390',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1522524315',
destination: '/foto/zonsondergang-scheveningen',
permanent: true,
},
{
source: '/foto/1522572731',
destination: '/foto/lijnen-en-vormen',
permanent: true,
},
{
source: '/foto/1522573100',
destination: '/foto/het-nieuwste-strand',
permanent: true,
},
{
source: '/foto/1522575665',
destination: '/foto/floodlight-2017-kinderdijk',
permanent: true,
},
{
source: '/foto/1522578559',
destination: '/foto/de-pendrechtse-molen',
permanent: true,
},
{
source: '/foto/1522666800',
destination: '/foto/korenmolen-de-hoop-almelo',
permanent: true,
},
{
source: '/foto/1522676643',
destination: '/foto/nieuwezijds-kolk',
permanent: true,
},
{
source: '/foto/1522747251',
destination: '/foto/molens-te-kinderdijk',
permanent: true,
},
{
source: '/foto/1522753575',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1522753950',
destination: '/foto/eb-bij-moddergat',
permanent: true,
},
{
source: '/foto/1522754050',
destination: '/foto/drooggevallen',
permanent: true,
},
{
source: '/foto/1522754161',
destination: '/foto/licht',
permanent: true,
},
{
source: '/foto/1522754956',
destination: '/foto/molenveld',
permanent: true,
},
{
source: '/foto/1522755320',
destination: '/foto/grondmist',
permanent: true,
},
{
source: '/foto/1522759399',
destination: '/foto/1-uit-60-000-000',
permanent: true,
},
{
source: '/foto/1522764445',
destination: '/foto/het-schaffelaarse-bos',
permanent: true,
},
{
source: '/foto/1522764616',
destination: '/foto/prieel-in-de-mist',
permanent: true,
},
{
source: '/foto/1522765038',
destination: '/foto/hoorn-oostereiland',
permanent: true,
},
{
source: '/foto/1522765343',
destination: '/foto/molenven',
permanent: true,
},
{
source: '/foto/1522766344',
destination: '/foto/veluwsestoommaatschappij-loenen',
permanent: true,
},
{
source: '/foto/1522766634',
destination: '/foto/perron-11',
permanent: true,
},
{
source: '/foto/1522767301',
destination: '/foto/strand-van-midsland-aan-zee',
permanent: true,
},
{
source: '/foto/1522768523',
destination: '/foto/de-bibliotheek-van-zutphen',
permanent: true,
},
{
source: '/foto/1522774474',
destination: '/foto/dordrecht-verlicht',
permanent: true,
},
{
source: '/foto/1522776142',
destination: '/foto/zeven-bomen',
permanent: true,
},
{
source: '/foto/1522779282',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1522780791',
destination: '/foto/sweeltje-montfort-l',
permanent: true,
},
{
source: '/foto/1522780923',
destination: '/foto/selfie-op-de-pier',
permanent: true,
},
{
source: '/foto/1522783776',
destination: '/foto/the-invisible-man',
permanent: true,
},
{
source: '/foto/1522784443',
destination: '/foto/vuurtoren-eierland',
permanent: true,
},
{
source: '/foto/1522784548',
destination: '/foto/wachtveld',
permanent: true,
},
{
source: '/foto/1522784615',
destination: '/foto/ganzen',
permanent: true,
},
{
source: '/foto/1522784643',
destination: '/foto/meeuwen-in-de-eilandspolder',
permanent: true,
},
{
source: '/foto/1522784661',
destination: '/foto/wasdag',
permanent: true,
},
{
source: '/foto/1522784860',
destination: '/foto/zicht-op-driehuis',
permanent: true,
},
{
source: '/foto/1522785074',
destination: '/foto/lange-vechtbrug',
permanent: true,
},
{
source: '/foto/1522785246',
destination: '/foto/zicht-op-driehuizen',
permanent: true,
},
{
source: '/foto/1522785599',
destination: '/foto/ijs-aan-het-alkmaardermeer',
permanent: true,
},
{
source: '/foto/1522785605',
destination: '/foto/take-offfffffff',
permanent: true,
},
{
source: '/foto/1522785645',
destination: '/foto/zwaan',
permanent: true,
},
{
source: '/foto/1522785773',
destination: '/foto/ijs-op-het-uitgeestermeer',
permanent: true,
},
{
source: '/foto/1522786042',
destination: '/foto/breda-oude-haven-prinsenkade',
permanent: true,
},
{
source: '/foto/1522786338',
destination: '/foto/fort-krommeniedijk',
permanent: true,
},
{
source: '/foto/1522786813',
destination: '/foto/bevroren-alkmaardermeer',
permanent: true,
},
{
source: '/foto/1522790808',
destination: '/foto/brrrrrrrrrr',
permanent: true,
},
{
source: '/foto/1522817901',
destination: '/foto/039-t-schipke',
permanent: true,
},
{
source: '/foto/1522835231',
destination: '/foto/loonse-en-drunense-duinen',
permanent: true,
},
{
source: '/foto/1522843499',
destination: '/foto/abseilen-in-rotterdam',
permanent: true,
},
{
source: '/foto/1522843681',
destination: '/foto/s-s-rotterdam',
permanent: true,
},
{
source: '/foto/1522958821',
destination: '/foto/nog-even-wachten-op-de-tulpen',
permanent: true,
},
{
source: '/foto/1523028103',
destination: '/foto/schokland-flevoland',
permanent: true,
},
{
source: '/foto/1523028261',
destination: '/foto/kerk-schokland',
permanent: true,
},
{
source: '/foto/1523029494',
destination: '/foto/zuiderzeemuseum-enkhuizen',
permanent: true,
},
{
source: '/foto/1523029627',
destination: '/foto/zuiderzeemuseum-vogelhoeksmolen',
permanent: true,
},
{
source: '/foto/1523030144',
destination: '/foto/zuiderzeemuseum-stoel-kalkovens',
permanent: true,
},
{
source: '/foto/1523088641',
destination: '/foto/zonsondergang-in-papendrecht',
permanent: true,
},
{
source: '/foto/1523090110',
destination: '/foto/stadsgezicht-van-dordrecht',
permanent: true,
},
{
source: '/foto/1523216752',
destination: '/foto/hert-in-awd',
permanent: true,
},
{
source: '/foto/1523217255',
destination: '/foto/bollenveld',
permanent: true,
},
{
source: '/foto/1523217640',
destination: '/foto/bollenveld',
permanent: true,
},
{
source: '/foto/1523218663',
destination: '/foto/plateaux',
permanent: true,
},
{
source: '/foto/1523218725',
destination: '/foto/bruggetje',
permanent: true,
},
{
source: '/foto/1523219458',
destination: '/foto/in-de-malpie',
permanent: true,
},
{
source: '/foto/1523219505',
destination: '/foto/knuppelpad',
permanent: true,
},
{
source: '/foto/1523564820',
destination: '/foto/zonnestraal-bij-kinderdijk',
permanent: true,
},
{
source: '/foto/1523602150',
destination: '/foto/kalmthoutse-heide',
permanent: true,
},
{
source: '/foto/1523603641',
destination: '/foto/goedemorgen',
permanent: true,
},
{
source: '/foto/1523604161',
destination: '/foto/zonsondergang-bij-de-trein',
permanent: true,
},
{
source: '/foto/1523810078',
destination: '/foto/kasteel-croy',
permanent: true,
},
{
source: '/foto/1523822531',
destination: '/foto/oostpoort-delft',
permanent: true,
},
{
source: '/foto/1524038178',
destination: '/foto/tulpenveld-vuursteenweg',
permanent: true,
},
{
source: '/foto/1524038227',
destination: '/foto/tulpen-van-amsterdam',
permanent: true,
},
{
source: '/foto/1524038278',
destination: '/foto/zoals-ik-aangaf-koppen-gaat-snel',
permanent: true,
},
{
source: '/foto/1524038399',
destination: '/foto/nog-eentje',
permanent: true,
},
{
source: '/foto/1524038877',
destination: '/foto/het-boompje-van-echten',
permanent: true,
},
{
source: '/foto/1524038929',
destination: '/foto/een-spookachtige-scheiding',
permanent: true,
},
{
source: '/foto/1524059001',
destination: '/foto/bloesem-laantje-dronten',
permanent: true,
},
{
source: '/foto/1524059055',
destination: '/foto/bloesem-tijd',
permanent: true,
},
{
source: '/foto/1524059109',
destination: '/foto/bloesem-in-de-ochtend-glore',
permanent: true,
},
{
source: '/foto/1524164542',
destination: '/foto/loonse-en-drunense-duinen',
permanent: true,
},
{
source: '/foto/1524300905',
destination: '/foto/ndsm-werf-amsterdam-noord',
permanent: true,
},
{
source: '/foto/1524300991',
destination: '/foto/waterleidingduinen-volgelenzang',
permanent: true,
},
{
source: '/foto/1524301111',
destination: '/foto/hembrug-terrein',
permanent: true,
},
{
source: '/foto/1524308181',
destination: '/foto/land-van-ooit',
permanent: true,
},
{
source: '/foto/1524463768',
destination: '/foto/golden-hour',
permanent: true,
},
{
source: '/foto/1524663173',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1524667017',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1524667632',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1524667838',
destination: '/foto/markthal',
permanent: true,
},
{
source: '/foto/1524668097',
destination: '/foto/markthal',
permanent: true,
},
{
source: '/foto/1524672185',
destination: '/foto/markthal',
permanent: true,
},
{
source: '/foto/1524674462',
destination: '/foto/zonsondergang-neeltje-jans',
permanent: true,
},
{
source: '/foto/1524682565',
destination: '/foto/kasteel-duivenvoorde',
permanent: true,
},
{
source: '/foto/1524682644',
destination: '/foto/kasteel-duivenvoorde',
permanent: true,
},
{
source: '/foto/1524684296',
destination: '/foto/de-rijp',
permanent: true,
},
{
source: '/foto/1524684539',
destination: '/foto/de-rijp',
permanent: true,
},
{
source: '/foto/1524684586',
destination: '/foto/de-rijp',
permanent: true,
},
{
source: '/foto/1524689208',
destination: '/foto/de-rijp',
permanent: true,
},
{
source: '/foto/1524689254',
destination: '/foto/de-rijp',
permanent: true,
},
{
source: '/foto/1524689548',
destination: '/foto/leiden',
permanent: true,
},
{
source: '/foto/1524689646',
destination: '/foto/leiden',
permanent: true,
},
{
source: '/foto/1524689751',
destination: '/foto/leiden',
permanent: true,
},
{
source: '/foto/1524753037',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1524753118',
destination: '/foto/harmony-of-the-seas',
permanent: true,
},
{
source: '/foto/1524753270',
destination: '/foto/skyline',
permanent: true,
},
{
source: '/foto/1524775447',
destination: '/foto/red-tulips',
permanent: true,
},
{
source: '/foto/1524856011',
destination: '/foto/bosanemoon',
permanent: true,
},
{
source: '/foto/1525030323',
destination: '/foto/valkenburg-in-de-avond',
permanent: true,
},
{
source: '/foto/1525205867',
destination: '/foto/maasvlakte-strand',
permanent: true,
},
{
source: '/foto/1525206063',
destination: '/foto/maasvlakte',
permanent: true,
},
{
source: '/foto/1525206603',
destination: '/foto/marken',
permanent: true,
},
{
source: '/foto/1525248744',
destination: '/foto/aeres-hogeschool-dronten',
permanent: true,
},
{
source: '/foto/1525248796',
destination: '/foto/tijdelijke-tulpen',
permanent: true,
},
{
source: '/foto/1525275963',
destination: '/foto/de-hef',
permanent: true,
},
{
source: '/foto/1525359186',
destination: '/foto/sunrise-at-kootwijk',
permanent: true,
},
{
source: '/foto/1525724402',
destination: '/foto/brug-maastricht',
permanent: true,
},
{
source: '/foto/1525806011',
destination: '/foto/mozes-brug',
permanent: true,
},
{
source: '/foto/1525876494',
destination: '/foto/bourdon-klok',
permanent: true,
},
{
source: '/foto/1526200499',
destination: '/foto/touristen',
permanent: true,
},
{
source: '/foto/1526556659',
destination: '/foto/tulpen',
permanent: true,
},
{
source: '/foto/1526557147',
destination: '/foto/landgoed-zonnestraal',
permanent: true,
},
{
source: '/foto/1526557253',
destination: '/foto/kleurrijk',
permanent: true,
},
{
source: '/foto/1526557653',
destination: '/foto/het-wad',
permanent: true,
},
{
source: '/foto/1526564251',
destination: '/foto/ijsselkade',
permanent: true,
},
{
source: '/foto/1526920581',
destination: '/foto/max-verstappen',
permanent: true,
},
{
source: '/foto/1526920646',
destination: '/foto/max-verstappen-2018',
permanent: true,
},
{
source: '/foto/1526920715',
destination: '/foto/racing-team-nederland-giedo-van-der-garde',
permanent: true,
},
{
source: '/foto/1526920863',
destination: '/foto/max-verstappen-in-bocht-9',
permanent: true,
},
{
source: '/foto/1526920915',
destination: '/foto/danny-kroes-uitkomen-bocht-9',
permanent: true,
},
{
source: '/foto/1526921117',
destination: '/foto/tim-coronel-hans-ernst-bocht',
permanent: true,
},
{
source: '/foto/1526921164',
destination: '/foto/ladies-gt-in-de-hans-ernst-bocht',
permanent: true,
},
{
source: '/foto/1526921235',
destination: '/foto/kim-feenstra-ging-de-grindbak-ploeggen',
permanent: true,
},
{
source: '/foto/1526921288',
destination: '/foto/jan-lammers-racing-team-nederland',
permanent: true,
},
{
source: '/foto/1526921360',
destination: '/foto/the-three-bulls-max-daniel-and-dc',
permanent: true,
},
{
source: '/foto/1526921424',
destination: '/foto/tom-coronel-snijd-de-bocht-af',
permanent: true,
},
{
source: '/foto/1526992197',
destination: '/foto/speulderbos',
permanent: true,
},
{
source: '/foto/1527088208',
destination: '/foto/rijksmuseum',
permanent: true,
},
{
source: '/foto/1527506238',
destination: '/foto/urk',
permanent: true,
},
{
source: '/foto/1527506618',
destination: '/foto/gasterse-duinen',
permanent: true,
},
{
source: '/foto/1527538342',
destination: '/foto/lonerdiep',
permanent: true,
},
{
source: '/foto/1527538758',
destination: '/foto/bakkeveen-de-slotplaats',
permanent: true,
},
{
source: '/foto/1527541196',
destination: '/foto/museum-de-fundatie',
permanent: true,
},
{
source: '/foto/1527541459',
destination: '/foto/paterswoldemeer',
permanent: true,
},
{
source: '/foto/1527542683',
destination: '/foto/de-witte-molen',
permanent: true,
},
{
source: '/foto/1527544170',
destination: '/foto/de-jonge-held-molen',
permanent: true,
},
{
source: '/foto/1527576756',
destination: '/foto/op-urk',
permanent: true,
},
{
source: '/foto/1527782788',
destination: '/foto/peaceful',
permanent: true,
},
{
source: '/foto/1527793389',
destination: '/foto/blue-hour',
permanent: true,
},
{
source: '/foto/1527883866',
destination: '/foto/039-t-witte-lam',
permanent: true,
},
{
source: '/foto/1527889714',
destination: '/foto/een-mistige-morgen',
permanent: true,
},
{
source: '/foto/1527961221',
destination: '/foto/genneperpark',
permanent: true,
},
{
source: '/foto/1527961288',
destination: '/foto/klaprozen',
permanent: true,
},
{
source: '/foto/1527963747',
destination: '/foto/zeelandbrug',
permanent: true,
},
{
source: '/foto/1527965855',
destination: '/foto/vluchtkerk-homoet',
permanent: true,
},
{
source: '/foto/1527968367',
destination: '/foto/langs-de-ijssel',
permanent: true,
},
{
source: '/foto/1528011545',
destination: '/foto/039-s-avonds-aan-het-kanaal',
permanent: true,
},
{
source: '/foto/1528036863',
destination: '/foto/waterloopbos-kraggenburg',
permanent: true,
},
{
source: '/foto/1528036989',
destination: '/foto/waterloop',
permanent: true,
},
{
source: '/foto/1528037083',
destination: '/foto/sluis-in-het-waterloopbos',
permanent: true,
},
{
source: '/foto/1528037357',
destination: '/foto/nijverdal-station',
permanent: true,
},
{
source: '/foto/1528052717',
destination: '/foto/zo-trots-als-een-pauw',
permanent: true,
},
{
source: '/foto/1528234781',
destination: '/foto/typisch-hollands-landschap',
permanent: true,
},
{
source: '/foto/1528234833',
destination: '/foto/typisch-hollands',
permanent: true,
},
{
source: '/foto/1528235190',
destination: '/foto/rewilding-de-maashorst',
permanent: true,
},
{
source: '/foto/1528235486',
destination: '/foto/mistige-mystiek',
permanent: true,
},
{
source: '/foto/1528398072',
destination: '/foto/beach-sunset',
permanent: true,
},
{
source: '/foto/1528398420',
destination: '/foto/bataviastad-lelystad',
permanent: true,
},
{
source: '/foto/1528398673',
destination: '/foto/stormy-sunset',
permanent: true,
},
{
source: '/foto/1528452354',
destination: '/foto/aekingerzand',
permanent: true,
},
{
source: '/foto/1528479883',
destination: '/foto/meh',
permanent: true,
},
{
source: '/foto/1528482409',
destination: '/foto/schloss-clemenswerth',
permanent: true,
},
{
source: '/foto/1528578888',
destination: '/foto/zonsondergang-an-de-zee',
permanent: true,
},
{
source: '/foto/1528580479',
destination: '/foto/baderen-op-een-warme-zomeravond',
permanent: true,
},
{
source: '/foto/1528580934',
destination: '/foto/mooie-herfstkleuren',
permanent: true,
},
{
source: '/foto/1528581435',
destination: '/foto/busted',
permanent: true,
},
{
source: '/foto/1528582060',
destination: '/foto/typisch-hollands-plaatje',
permanent: true,
},
{
source: '/foto/1528582584',
destination: '/foto/mistig-landschap',
permanent: true,
},
{
source: '/foto/1528636321',
destination: '/foto/ouwe',
permanent: true,
},
{
source: '/foto/1528641995',
destination: '/foto/magere-brug',
permanent: true,
},
{
source: '/foto/1528665684',
destination: '/foto/magic-blue-forest',
permanent: true,
},
{
source: '/foto/1528703585',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1528712548',
destination: '/foto/deventer-skyline',
permanent: true,
},
{
source: '/foto/1528838449',
destination: '/foto/sfeervolle-winteravond',
permanent: true,
},
{
source: '/foto/1528838982',
destination: '/foto/drasserige-wildernis',
permanent: true,
},
{
source: '/foto/1528888002',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1528888521',
destination: '/foto/twickel',
permanent: true,
},
{
source: '/foto/1528888615',
destination: '/foto/starende-koe',
permanent: true,
},
{
source: '/foto/1528888696',
destination: '/foto/fietsen-in-het-laatste-zonlicht',
permanent: true,
},
{
source: '/foto/1528888882',
destination: '/foto/deventer-tijdens-blauwe-uur',
permanent: true,
},
{
source: '/foto/1528889037',
destination: '/foto/deventer-blauw-uurtje',
permanent: true,
},
{
source: '/foto/1528889090',
destination: '/foto/panorama-skyline-deventer',
permanent: true,
},
{
source: '/foto/1528893731',
destination: '/foto/odoorn',
permanent: true,
},
{
source: '/foto/1529352494',
destination: '/foto/radio-kootwijk',
permanent: true,
},
{
source: '/foto/1529390598',
destination: '/foto/kaasboerderij-zaanse-schans',
permanent: true,
},
{
source: '/foto/1529400669',
destination: '/foto/dot-groningen',
permanent: true,
},
{
source: '/foto/1529404762',
destination: '/foto/slochterbos',
permanent: true,
},
{
source: '/foto/1529423551',
destination: '/foto/proveniershuis-schiedam',
permanent: true,
},
{
source: '/foto/1529423823',
destination: '/foto/nolet-distilleerderij-schiedam',
permanent: true,
},
{
source: '/foto/1529423952',
destination: '/foto/nolet-distilleerderij-schiedam',
permanent: true,
},
{
source: '/foto/1529581372',
destination: '/foto/nijreesbos',
permanent: true,
},
{
source: '/foto/1529581460',
destination: '/foto/nijreesbos',
permanent: true,
},
{
source: '/foto/1529615291',
destination: '/foto/wilhelminabrug-tijdens-het-blauwe-uur',
permanent: true,
},
{
source: '/foto/1529615513',
destination: '/foto/weerspiegeling',
permanent: true,
},
{
source: '/foto/1529615685',
destination: '/foto/zonsondergang-aan-de-ijssel',
permanent: true,
},
{
source: '/foto/1529622483',
destination: '/foto/vlonderpad-in-twickel',
permanent: true,
},
{
source: '/foto/1529691451',
destination: '/foto/kleurrijke-wolken-aan-de-grote-masloot',
permanent: true,
},
{
source: '/foto/1529756294',
destination: '/foto/haven-strijensas',
permanent: true,
},
{
source: '/foto/1529948363',
destination: '/foto/next-stop-forest',
permanent: true,
},
{
source: '/foto/1529948451',
destination: '/foto/colorfull-full-forest',
permanent: true,
},
{
source: '/foto/1529948849',
destination: '/foto/pad-van-het-dier',
permanent: true,
},
{
source: '/foto/1530044581',
destination: '/foto/039-t-drentse-land',
permanent: true,
},
{
source: '/foto/1530274399',
destination: '/foto/deventer-sunset',
permanent: true,
},
{
source: '/foto/1530354548',
destination: '/foto/sunset-bij-wenum-wiesel',
permanent: true,
},
{
source: '/foto/1530354809',
destination: '/foto/sunset-aan-het-apeldoornskanaal',
permanent: true,
},
{
source: '/foto/1530354958',
destination: '/foto/het-apeldoornskanaal-tijdens-het-blauwe-uur',
permanent: true,
},
{
source: '/foto/1530562111',
destination: '/foto/de-hangende-bomen-van-twickel-delden',
permanent: true,
},
{
source: '/foto/1530598722',
destination: '/foto/zonsondergang-in-de-blauwe-kamer',
permanent: true,
},
{
source: '/foto/1530604584',
destination: '/foto/mooi-ten-boer',
permanent: true,
},
{
source: '/foto/1530605034',
destination: '/foto/de-nederlandse-sphinxen',
permanent: true,
},
{
source: '/foto/1530605587',
destination: '/foto/monument-omgekomen-geallieerde-vliegeniers',
permanent: true,
},
{
source: '/foto/1530631123',
destination: '/foto/het-bankje',
permanent: true,
},
{
source: '/foto/1530728558',
destination: '/foto/de-hoornsedijk',
permanent: true,
},
{
source: '/foto/1530729002',
destination: '/foto/zonsopgang',
permanent: true,
},
{
source: '/foto/1530786266',
destination: '/foto/wie-voelt-zich-nu-bekeken',
permanent: true,
},
{
source: '/foto/1530969415',
destination: '/foto/the-lone-tree',
permanent: true,
},
{
source: '/foto/1531043128',
destination: '/foto/nirwana-jkc-dronten',
permanent: true,
},
{
source: '/foto/1531043264',
destination: '/foto/oude-kerk-amsterdam',
permanent: true,
},
{
source: '/foto/1531043445',
destination: '/foto/bruchtkamp',
permanent: true,
},
{
source: '/foto/1531043854',
destination: '/foto/waterfront',
permanent: true,
},
{
source: '/foto/1531044419',
destination: '/foto/markerwadden-in-aanleg',
permanent: true,
},
{
source: '/foto/1531044517',
destination: '/foto/marker-wadden',
permanent: true,
},
{
source: '/foto/1531044592',
destination: '/foto/strand-marker-wadden',
permanent: true,
},
{
source: '/foto/1531044820',
destination: '/foto/davids-herten-nemen-een-duik',
permanent: true,
},
{
source: '/foto/1531216226',
destination: '/foto/zonsondergang-aan-het-meer',
permanent: true,
},
{
source: '/foto/1531216375',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1531424309',
destination: '/foto/hompesche-molen',
permanent: true,
},
{
source: '/foto/1531483811',
destination: '/foto/basiliek-oudenbosch',
permanent: true,
},
{
source: '/foto/1531675439',
destination: '/foto/uitkijk-op-erasmusbrug-vanaf-willemsbrug',
permanent: true,
},
{
source: '/foto/1531675645',
destination: '/foto/erasmusbrug-vanaf-de-kade',
permanent: true,
},
{
source: '/foto/1531676362',
destination: '/foto/zonsondergang-maashaven-zuidzijde-rotterdam',
permanent: true,
},
{
source: '/foto/1531759805',
destination: '/foto/piramide-van-austerlitz',
permanent: true,
},
{
source: '/foto/1531774272',
destination: '/foto/ochtend-in-het-bos',
permanent: true,
},
{
source: '/foto/1531774340',
destination: '/foto/mistig-nanninga-039-s-bos',
permanent: true,
},
{
source: '/foto/1531774530',
destination: '/foto/blauw-uurtje-aan-het-reitdiep',
permanent: true,
},
{
source: '/foto/1531829021',
destination: '/foto/de-erasmusbrug',
permanent: true,
},
{
source: '/foto/1531857320',
destination: '/foto/vsm-beekbergen',
permanent: true,
},
{
source: '/foto/1531857705',
destination: '/foto/vsm-beekbergen',
permanent: true,
},
{
source: '/foto/1531857844',
destination: '/foto/elburg-haven',
permanent: true,
},
{
source: '/foto/1531859612',
destination: '/foto/zaanse-schans',
permanent: true,
},
{
source: '/foto/1531859725',
destination: '/foto/uitzicht-vanuit-zaans-huisje',
permanent: true,
},
{
source: '/foto/1531859838',
destination: '/foto/zaans-huisje',
permanent: true,
},
{
source: '/foto/1531937870',
destination: '/foto/zonsondergang-bolmeer',
permanent: true,
},
{
source: '/foto/1531940933',
destination: '/foto/queen-elizabeth',
permanent: true,
},
{
source: '/foto/1531991309',
destination: '/foto/wellerwaard',
permanent: true,
},
{
source: '/foto/1531991435',
destination: '/foto/zonsondergang-castelijnsplas',
permanent: true,
},
{
source: '/foto/1532022534',
destination: '/foto/urk-met-de-vuurtoren',
permanent: true,
},
{
source: '/foto/1532022814',
destination: '/foto/zonsondergang-emmeloord',
permanent: true,
},
{
source: '/foto/1532022917',
destination: '/foto/zonsondergang-emmeloord',
permanent: true,
},
{
source: '/foto/1532025161',
destination: '/foto/tjasker',
permanent: true,
},
{
source: '/foto/1532038937',
destination: '/foto/zwanen',
permanent: true,
},
{
source: '/foto/1532039185',
destination: '/foto/alu-chemie',
permanent: true,
},
{
source: '/foto/1532277637',
destination: '/foto/mysterious-stones',
permanent: true,
},
{
source: '/foto/1532409501',
destination: '/foto/zeelandbrug',
permanent: true,
},
{
source: '/foto/1532503151',
destination: '/foto/de-botter-en-de-reiger',
permanent: true,
},
{
source: '/foto/1532616741',
destination: '/foto/het-oorgat-in-de-hanzestad-kampen',
permanent: true,
},
{
source: '/foto/1532675760',
destination: '/foto/oorgat-kampen',
permanent: true,
},
{
source: '/foto/1532676046',
destination: '/foto/het-oorgat-in-de-hanzestad-kampen',
permanent: true,
},
{
source: '/foto/1532676132',
destination: '/foto/het-oorgat-in-de-hanzestad-kampen',
permanent: true,
},
{
source: '/foto/1532722145',
destination: '/foto/zonsondergang-bij-de-kerk',
permanent: true,
},
{
source: '/foto/1532861640',
destination: '/foto/mormonen-kerk-zoetermeer',
permanent: true,
},
{
source: '/foto/1533116637',
destination: '/foto/rise-of-the-red-planets',
permanent: true,
},
{
source: '/foto/1533231881',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1533276706',
destination: '/foto/droogte',
permanent: true,
},
{
source: '/foto/1533282909',
destination: '/foto/blauwbrug',
permanent: true,
},
{
source: '/foto/1533408453',
destination: '/foto/gouden-avondkleuren',
permanent: true,
},
{
source: '/foto/1533574907',
destination: '/foto/deventer',
permanent: true,
},
{
source: '/foto/1533575358',
destination: '/foto/deventer-van-boven',
permanent: true,
},
{
source: '/foto/1533847002',
destination: '/foto/katwijk-na-zonsondergang',
permanent: true,
},
{
source: '/foto/1533847390',
destination: '/foto/het-strand-van-katwijk',
permanent: true,
},
{
source: '/foto/1533923228',
destination: '/foto/early-morning',
permanent: true,
},
{
source: '/foto/1533930984',
destination: '/foto/lines-amp-shadows',
permanent: true,
},
{
source: '/foto/1533931856',
destination: '/foto/koudegat',
permanent: true,
},
{
source: '/foto/1534066297',
destination: '/foto/fireworks',
permanent: true,
},
{
source: '/foto/1534089124',
destination: '/foto/hotel-de-zon-ommen',
permanent: true,
},
{
source: '/foto/1534146023',
destination: '/foto/damrak',
permanent: true,
},
{
source: '/foto/1534253644',
destination: '/foto/heveskes-kerkje',
permanent: true,
},
{
source: '/foto/1534407967',
destination: '/foto/kalmthoutse-heide',
permanent: true,
},
{
source: '/foto/1534512657',
destination: '/foto/de-morgenstond',
permanent: true,
},
{
source: '/foto/1534512955',
destination: '/foto/rough-sea',
permanent: true,
},
{
source: '/foto/1534677458',
destination: '/foto/the-sky-is-fallin-039',
permanent: true,
},
{
source: '/foto/1535200238',
destination: '/foto/trompenburgh',
permanent: true,
},
{
source: '/foto/1535200514',
destination: '/foto/heide-in-hilversum',
permanent: true,
},
{
source: '/foto/1535204551',
destination: '/foto/de-poldertoren',
permanent: true,
},
{
source: '/foto/1535430072',
destination: '/foto/night-lights',
permanent: true,
},
{
source: '/foto/1535607570',
destination: '/foto/de-splitsing',
permanent: true,
},
{
source: '/foto/1535607662',
destination: '/foto/de-brug',
permanent: true,
},
{
source: '/foto/1535730071',
destination: '/foto/kampen',
permanent: true,
},
{
source: '/foto/1535730216',
destination: '/foto/lines',
permanent: true,
},
{
source: '/foto/1535781457',
destination: '/foto/het-mauritshuis',
permanent: true,
},
{
source: '/foto/1535958169',
destination: '/foto/sterren-molens-en-vuurwerk',
permanent: true,
},
{
source: '/foto/1535963724',
destination: '/foto/het-wad',
permanent: true,
},
{
source: '/foto/1536135120',
destination: '/foto/starry-starry-night',
permanent: true,
},
{
source: '/foto/1536609096',
destination: '/foto/kasteel-rosendael',
permanent: true,
},
{
source: '/foto/1536609155',
destination: '/foto/kasteel-rosendael',
permanent: true,
},
{
source: '/foto/1536609218',
destination: '/foto/kasteel-rosendael',
permanent: true,
},
{
source: '/foto/1536609268',
destination: '/foto/kasteel-rosendael',
permanent: true,
},
{
source: '/foto/1536609395',
destination: '/foto/terug-naar-toen',
permanent: true,
},
{
source: '/foto/1536609438',
destination: '/foto/terug-naar-toen',
permanent: true,
},
{
source: '/foto/1536609522',
destination: '/foto/laag-water-ijssel',
permanent: true,
},
{
source: '/foto/1536609571',
destination: '/foto/skyline-deventer',
permanent: true,
},
{
source: '/foto/1536609775',
destination: '/foto/sunset',
permanent: true,
},
{
source: '/foto/1536609838',
destination: '/foto/sunset-petten',
permanent: true,
},
{
source: '/foto/1536652633',
destination: '/foto/rijksmuseum-amsterdam',
permanent: true,
},
{
source: '/foto/1536654182',
destination: '/foto/typisch-amsterdam',
permanent: true,
},
{
source: '/foto/1536692204',
destination: '/foto/verlichte-molens-kinderdijk',
permanent: true,
},
{
source: '/foto/1536826265',
destination: '/foto/aekingerzand',
permanent: true,
},
{
source: '/foto/1536826501',
destination: '/foto/urk',
permanent: true,
},
{
source: '/foto/1536852185',
destination: '/foto/op-de-brug',
permanent: true,
},
{
source: '/foto/1537009401',
destination: '/foto/zuiderheide-laren',
permanent: true,
},
{
source: '/foto/1537099371',
destination: '/foto/jonge-bok',
permanent: true,
},
{
source: '/foto/1537297219',
destination: '/foto/paterswoldesemeer-de-helper',
permanent: true,
},
{
source: '/foto/1537297964',
destination: '/foto/mysterieuze-ochtend',
permanent: true,
},
{
source: '/foto/1537347162',
destination: '/foto/magical',
permanent: true,
},
{
source: '/foto/1537347441',
destination: '/foto/when-the-sun-rises-it-rises-for-everyone',
permanent: true,
},
{
source: '/foto/1537377177',
destination: '/foto/zonsondergang-brouwersgracht',
permanent: true,
},
{
source: '/foto/1537568901',
destination: '/foto/take-me-to-church',
permanent: true,
},
{
source: '/foto/1537625571',
destination: '/foto/hunebed-d15',
permanent: true,
},
{
source: '/foto/1537723840',
destination: '/foto/boekanier',
permanent: true,
},
{
source: '/foto/1537724036',
destination: '/foto/pier-blankenberge-haveningang',
permanent: true,
},
{
source: '/foto/1537849564',
destination: '/foto/sky-high',
permanent: true,
},
{
source: '/foto/1538322140',
destination: '/foto/duo-gebouw-groningen',
permanent: true,
},
{
source: '/foto/1538370813',
destination: '/foto/fietsen-over-ameland',
permanent: true,
},
{
source: '/foto/1538370907',
destination: '/foto/vuurtoren-van-hollum',
permanent: true,
},
{
source: '/foto/1538675076',
destination: '/foto/lochem',
permanent: true,
},
{
source: '/foto/1538675325',
destination: '/foto/witch-tree',
permanent: true,
},
{
source: '/foto/1538675418',
destination: '/foto/doorkijkje',
permanent: true,
},
{
source: '/foto/1538675472',
destination: '/foto/beam-me-up',
permanent: true,
},
{
source: '/foto/1538763316',
destination: '/foto/zonsondergang-bij-een-zandafgraving',
permanent: true,
},
{
source: '/foto/1538914273',
destination: '/foto/willemsbrug-rotterdam',
permanent: true,
},
{
source: '/foto/1538915971',
destination: '/foto/oostpoort-delft',
permanent: true,
},
{
source: '/foto/1538917534',
destination: '/foto/waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1538918208',
destination: '/foto/markthal-rotterdam',
permanent: true,
},
{
source: '/foto/1538918579',
destination: '/foto/wereldhavendagen-2018-rotterdam',
permanent: true,
},
{
source: '/foto/1538918999',
destination: '/foto/de-zandwacht',
permanent: true,
},
{
source: '/foto/1538991453',
destination: '/foto/zo-stil',
permanent: true,
},
{
source: '/foto/1538995454',
destination: '/foto/markermeer',
permanent: true,
},
{
source: '/foto/1538995571',
destination: '/foto/pier-van-scheveningen',
permanent: true,
},
{
source: '/foto/1538995686',
destination: '/foto/ochtend-op-de-hei',
permanent: true,
},
{
source: '/foto/1539023120',
destination: '/foto/zonsondergang-kaloot',
permanent: true,
},
{
source: '/foto/1539062866',
destination: '/foto/sunset-boulevard',
permanent: true,
},
{
source: '/foto/1539063046',
destination: '/foto/lange-luchten',
permanent: true,
},
{
source: '/foto/1539071631',
destination: '/foto/enkhuizen',
permanent: true,
},
{
source: '/foto/1539151590',
destination: '/foto/spiegeltje-spiegeltje-in-de-gracht',
permanent: true,
},
{
source: '/foto/1539204563',
destination: '/foto/de-pontsteiger',
permanent: true,
},
{
source: '/foto/1539204791',
destination: '/foto/fairy-flowers',
permanent: true,
},
{
source: '/foto/1539205016',
destination: '/foto/zonsondergang-aan-de-schans',
permanent: true,
},
{
source: '/foto/1539234653',
destination: '/foto/sky-on-fire',
permanent: true,
},
{
source: '/foto/1539284028',
destination: '/foto/waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1539697230',
destination: '/foto/de-eenzame-reus',
permanent: true,
},
{
source: '/foto/1539721214',
destination: '/foto/van-nelle-fabriek',
permanent: true,
},
{
source: '/foto/1539722052',
destination: '/foto/molen-van-rolde',
permanent: true,
},
{
source: '/foto/1539803520',
destination: '/foto/sunrise-ramspolbrug-ens',
permanent: true,
},
{
source: '/foto/1539804009',
destination: '/foto/herfst-kaapse-bossen',
permanent: true,
},
{
source: '/foto/1539804148',
destination: '/foto/ketelbrug',
permanent: true,
},
{
source: '/foto/1539804284',
destination: '/foto/ijsselmeer',
permanent: true,
},
{
source: '/foto/1539804465',
destination: '/foto/sunset-ijsselmeer',
permanent: true,
},
{
source: '/foto/1539804645',
destination: '/foto/wad-ameland',
permanent: true,
},
{
source: '/foto/1539804839',
destination: '/foto/wad-ameland',
permanent: true,
},
{
source: '/foto/1539922626',
destination: '/foto/autumn',
permanent: true,
},
{
source: '/foto/1539970034',
destination: '/foto/zonsopkomst-in-zaandijk',
permanent: true,
},
{
source: '/foto/1539979425',
destination: '/foto/ochtendmist-tijdens-zonsopkomst',
permanent: true,
},
{
source: '/foto/1539979668',
destination: '/foto/strandpalen-in-het-zonnetje',
permanent: true,
},
{
source: '/foto/1539980118',
destination: '/foto/authentiek-zaans-huisje',
permanent: true,
},
{
source: '/foto/1539980398',
destination: '/foto/schitterend-vergezicht-over-nationaal-park-de-maasduinen',
permanent: true,
},
{
source: '/foto/1539980498',
destination: '/foto/de-uitkijktoren-van-nationaal-park-de-maasduinen',
permanent: true,
},
{
source: '/foto/1539981174',
destination: '/foto/de-zon-doorkruisd-de-innovatoren',
permanent: true,
},
{
source: '/foto/1540028462',
destination: '/foto/witte-molen',
permanent: true,
},
{
source: '/foto/1540048407',
destination: '/foto/ezinge-kerk',
permanent: true,
},
{
source: '/foto/1540153565',
destination: '/foto/kralingse-bos-rotterdam',
permanent: true,
},
{
source: '/foto/1540192154',
destination: '/foto/through-the-leaves',
permanent: true,
},
{
source: '/foto/1540213005',
destination: '/foto/paterswoldsemeer',
permanent: true,
},
{
source: '/foto/1540223197',
destination: '/foto/windmolen-ster-kralingse-bos-rotterdam',
permanent: true,
},
{
source: '/foto/1540223744',
destination: '/foto/kralingse-plaslaan-rotterdam',
permanent: true,
},
{
source: '/foto/1540497341',
destination: '/foto/mooi-westerwolde',
permanent: true,
},
{
source: '/foto/1540740732',
destination: '/foto/zeelandbrug',
permanent: true,
},
{
source: '/foto/1540750943',
destination: '/foto/zwevende-kei-bij-dalfsen',
permanent: true,
},
{
source: '/foto/1540751158',
destination: '/foto/sluitgatmonument',
permanent: true,
},
{
source: '/foto/1540751479',
destination: '/foto/kunst-in-waterloopbos',
permanent: true,
},
{
source: '/foto/1540751589',
destination: '/foto/kunst-in-waterloopbos',
permanent: true,
},
{
source: '/foto/1540751810',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1540752804',
destination: '/foto/vloeivelden',
permanent: true,
},
{
source: '/foto/1540753161',
destination: '/foto/herfst',
permanent: true,
},
{
source: '/foto/1541100106',
destination: '/foto/vismark',
permanent: true,
},
{
source: '/foto/1541149685',
destination: '/foto/het-zakkendragershuis-schiedam',
permanent: true,
},
{
source: '/foto/1541438238',
destination: '/foto/de-duinen-van-egmond-aan-zee',
permanent: true,
},
{
source: '/foto/1541669076',
destination: '/foto/paard-van-marken',
permanent: true,
},
{
source: '/foto/1541669393',
destination: '/foto/havenlicht-van-volendam',
permanent: true,
},
{
source: '/foto/1541669490',
destination: '/foto/havenlicht-in-volendam',
permanent: true,
},
{
source: '/foto/1541677607',
destination: '/foto/zuidlaardermeer',
permanent: true,
},
{
source: '/foto/1541677879',
destination: '/foto/sunset-railway',
permanent: true,
},
{
source: '/foto/1541692077',
destination: '/foto/autumn-colors',
permanent: true,
},
{
source: '/foto/1541856969',
destination: '/foto/zonsopkomst-bij-thousand-island-lake',
permanent: true,
},
{
source: '/foto/1542188169',
destination: '/foto/het-vergeten-noorden',
permanent: true,
},
{
source: '/foto/1542315248',
destination: '/foto/maasvlakte',
permanent: true,
},
{
source: '/foto/1542395938',
destination: '/foto/rode-loper',
permanent: true,
},
{
source: '/foto/1542451622',
destination: '/foto/moody-autumn',
permanent: true,
},
{
source: '/foto/1542451901',
destination: '/foto/vision-is-the-art-of-seeing-what-is-invisible-to-others',
permanent: true,
},
{
source: '/foto/1542541765',
destination: '/foto/magic-of-nature',
permanent: true,
},
{
source: '/foto/1542557222',
destination: '/foto/de-poldertoren',
permanent: true,
},
{
source: '/foto/1542661666',
destination: '/foto/pace-is-the-trick',
permanent: true,
},
{
source: '/foto/1542888100',
destination: '/foto/sunset-over-lake-limoncocha',
permanent: true,
},
{
source: '/foto/1543214225',
destination: '/foto/verdronken-bos',
permanent: true,
},
{
source: '/foto/1543250849',
destination: '/foto/wilhelminaboom-leeuwarden',
permanent: true,
},
{
source: '/foto/1543254234',
destination: '/foto/luchtwachttoren-701',
permanent: true,
},
{
source: '/foto/1543308918',
destination: '/foto/the-dark-sphinxes',
permanent: true,
},
{
source: '/foto/1543658236',
destination: '/foto/maasvlakte',
permanent: true,
},
{
source: '/foto/1543916366',
destination: '/foto/blauwe-uurtje-utrecht',
permanent: true,
},
{
source: '/foto/1544040322',
destination: '/foto/van-brienenoordbrug-rotterdam',
permanent: true,
},
{
source: '/foto/1544959097',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1545064129',
destination: '/foto/the-first-snowfall',
permanent: true,
},
{
source: '/foto/1545250740',
destination: '/foto/16-12-2018',
permanent: true,
},
{
source: '/foto/1545251984',
destination: '/foto/witte-morgen',
permanent: true,
},
{
source: '/foto/1545554726',
destination: '/foto/grote-kerk-breda-centrum',
permanent: true,
},
{
source: '/foto/1545678473',
destination: '/foto/winderige-dag-bij-de-ketelbrug',
permanent: true,
},
{
source: '/foto/1545824029',
destination: '/foto/zonsondergang-op-kerstavond-2018',
permanent: true,
},
{
source: '/foto/1545825176',
destination: '/foto/golden-hour',
permanent: true,
},
{
source: '/foto/1545855033',
destination: '/foto/groningen-hoofdstation',
permanent: true,
},
{
source: '/foto/1545855693',
destination: '/foto/onderdendam-molen-hunsingo',
permanent: true,
},
{
source: '/foto/1545856339',
destination: '/foto/oudemolen-de-zwaluw',
permanent: true,
},
{
source: '/foto/1545911286',
destination: '/foto/hoenderloo',
permanent: true,
},
{
source: '/foto/1546035941',
destination: '/foto/zonnig-nanninga-039-s-bos',
permanent: true,
},
{
source: '/foto/1546123531',
destination: '/foto/molen-schiedam',
permanent: true,
},
{
source: '/foto/1546159535',
destination: '/foto/seascape',
permanent: true,
},
{
source: '/foto/1546552806',
destination: '/foto/out-of-the-blue',
permanent: true,
},
{
source: '/foto/1546783583',
destination: '/foto/slot-zeist',
permanent: true,
},
{
source: '/foto/1546806810',
destination: '/foto/hohe-acht-nurburgring',
permanent: true,
},
{
source: '/foto/1546857564',
destination: '/foto/de-haven-van-veere',
permanent: true,
},
{
source: '/foto/1546857900',
destination: '/foto/city-of-lights',
permanent: true,
},
{
source: '/foto/1546858272',
destination: '/foto/sferen-in-veere',
permanent: true,
},
{
source: '/foto/1547115491',
destination: '/foto/de-helper',
permanent: true,
},
{
source: '/foto/1547256235',
destination: '/foto/krachtige-watervallen-van-coo',
permanent: true,
},
{
source: '/foto/1547256454',
destination: '/foto/rune-van-de-grenskerk',
permanent: true,
},
{
source: '/foto/1547256607',
destination: '/foto/zaanse-molens-op-een-rij',
permanent: true,
},
{
source: '/foto/1547318108',
destination: '/foto/meppel-de-vlijt',
permanent: true,
},
{
source: '/foto/1547635617',
destination: '/foto/emmen-zuid',
permanent: true,
},
{
source: '/foto/1547635872',
destination: '/foto/amsterdam-centraal-tunnel',
permanent: true,
},
{
source: '/foto/1547738965',
destination: '/foto/weerspiegeling',
permanent: true,
},
{
source: '/foto/1547739696',
destination: '/foto/brug-in-katerveer',
permanent: true,
},
{
source: '/foto/1548006245',
destination: '/foto/de-prins-van-oranje',
permanent: true,
},
{
source: '/foto/1548167768',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1548168011',
destination: '/foto/de-hef',
permanent: true,
},
{
source: '/foto/1548230981',
destination: '/foto/winterse-sferen-bij-kasteel-de-schaffelaar',
permanent: true,
},
{
source: '/foto/1548249898',
destination: '/foto/bloedmaan-bij-de-erasmusbrug',
permanent: true,
},
{
source: '/foto/1548595155',
destination: '/foto/sunrise',
permanent: true,
},
{
source: '/foto/1548670317',
destination: '/foto/herfstlandschap',
permanent: true,
},
{
source: '/foto/1548670452',
destination: '/foto/schotse-hooglander',
permanent: true,
},
{
source: '/foto/1548793008',
destination: '/foto/in-rainbows',
permanent: true,
},
{
source: '/foto/1548864452',
destination: '/foto/200-seconds',
permanent: true,
},
{
source: '/foto/1548865352',
destination: '/foto/sassenhein',
permanent: true,
},
{
source: '/foto/1548924548',
destination: '/foto/kasteel-doornenburg',
permanent: true,
},
{
source: '/foto/1549105212',
destination: '/foto/in-this-light-and-on-this-evening',
permanent: true,
},
{
source: '/foto/1549200490',
destination: '/foto/kasteel-nijenrode',
permanent: true,
},
{
source: '/foto/1549213851',
destination: '/foto/vluchtheuvelkerkje',
permanent: true,
},
{
source: '/foto/1549312440',
destination: '/foto/de-hef',
permanent: true,
},
{
source: '/foto/1549312587',
destination: '/foto/cold-sunrise',
permanent: true,
},
{
source: '/foto/1549322662',
destination: '/foto/koude-ochtend',
permanent: true,
},
{
source: '/foto/1549396161',
destination: '/foto/borger-grafheuvel',
permanent: true,
},
{
source: '/foto/1549396479',
destination: '/foto/lauwersoog-vissersboten',
permanent: true,
},
{
source: '/foto/1549396891',
destination: '/foto/loon-hunebed-d15',
permanent: true,
},
{
source: '/foto/1549397284',
destination: '/foto/borger-drouwenerstraat',
permanent: true,
},
{
source: '/foto/1549398136',
destination: '/foto/woltersum-houtzaagmolen-fram',
permanent: true,
},
{
source: '/foto/1549406488',
destination: '/foto/jozefkerk',
permanent: true,
},
{
source: '/foto/1549537591',
destination: '/foto/zicht-op-de-skyline-van-scheveningen',
permanent: true,
},
{
source: '/foto/1549566541',
destination: '/foto/heemtuin-kralingse-bos',
permanent: true,
},
{
source: '/foto/1549571262',
destination: '/foto/stormlucht-boven-het-zwartemeer',
permanent: true,
},
{
source: '/foto/1549640951',
destination: '/foto/rust-en-stilte-op-het-platteland',
permanent: true,
},
{
source: '/foto/1549671762',
destination: '/foto/heusden',
permanent: true,
},
{
source: '/foto/1550330120',
destination: '/foto/laag-tij',
permanent: true,
},
{
source: '/foto/1550330443',
destination: '/foto/reflectie',
permanent: true,
},
{
source: '/foto/1550330795',
destination: '/foto/winter-molen',
permanent: true,
},
{
source: '/foto/1550330979',
destination: '/foto/last-light',
permanent: true,
},
{
source: '/foto/1550332263',
destination: '/foto/palendorp',
permanent: true,
},
{
source: '/foto/1550428864',
destination: '/foto/molen-quot-de-vlinder-quot',
permanent: true,
},
{
source: '/foto/1550469996',
destination: '/foto/plateaux',
permanent: true,
},
{
source: '/foto/1550528044',
destination: '/foto/knuppelbrug',
permanent: true,
},
{
source: '/foto/1550528223',
destination: '/foto/hangbrug-over-de-dommel',
permanent: true,
},
{
source: '/foto/1550696732',
destination: '/foto/hollands-glorie',
permanent: true,
},
{
source: '/foto/1550697138',
destination: '/foto/sunset-aan-de-rijn',
permanent: true,
},
{
source: '/foto/1550783995',
destination: '/foto/stratumse-heide',
permanent: true,
},
{
source: '/foto/1550785966',
destination: '/foto/vuurlibel-laatste-zomerdagen-2018',
permanent: true,
},
{
source: '/foto/1550916368',
destination: '/foto/nice-morning',
permanent: true,
},
{
source: '/foto/1550996497',
destination: '/foto/perfect-reflection',
permanent: true,
},
{
source: '/foto/1551037893',
destination: '/foto/deventer-ontwaakt',
permanent: true,
},
{
source: '/foto/1551038255',
destination: '/foto/zonsopkomst',
permanent: true,
},
{
source: '/foto/1551042128',
destination: '/foto/cartier-heide',
permanent: true,
},
{
source: '/foto/1551642532',
destination: '/foto/scheveningen',
permanent: true,
},
{
source: '/foto/1551646741',
destination: '/foto/gift-of-nature',
permanent: true,
},
{
source: '/foto/1551648052',
destination: '/foto/golden-hour',
permanent: true,
},
{
source: '/foto/1551711522',
destination: '/foto/lange-raamstraat-te-haarlem',
permanent: true,
},
{
source: '/foto/1551820720',
destination: '/foto/speed-of-light',
permanent: true,
},
{
source: '/foto/1551895935',
destination: '/foto/roeiboot',
permanent: true,
},
{
source: '/foto/1551897912',
destination: '/foto/herfst',
permanent: true,
},
{
source: '/foto/1551980401',
destination: '/foto/lisserpoelmolen',
permanent: true,
},
{
source: '/foto/1551987899',
destination: '/foto/strandje-bij-wildervank',
permanent: true,
},
{
source: '/foto/1551991872',
destination: '/foto/maasvlakte',
permanent: true,
},
{
source: '/foto/1552069332',
destination: '/foto/arendshoofd',
permanent: true,
},
{
source: '/foto/1552069932',
destination: '/foto/houten',
permanent: true,
},
{
source: '/foto/1552123221',
destination: '/foto/martini-toren-en-kerk',
permanent: true,
},
{
source: '/foto/1552232012',
destination: '/foto/waiting-for-the-new-season',
permanent: true,
},
{
source: '/foto/1552232744',
destination: '/foto/stokkenbrug',
permanent: true,
},
{
source: '/foto/1552289375',
destination: '/foto/europoort',
permanent: true,
},
{
source: '/foto/1552672962',
destination: '/foto/leidsche-schouwburg',
permanent: true,
},
{
source: '/foto/1552686679',
destination: '/foto/sunrise-in-grou',
permanent: true,
},
{
source: '/foto/1552850610',
destination: '/foto/skyline',
permanent: true,
},
{
source: '/foto/1553157854',
destination: '/foto/de-oversteek-bij-nijmegen',
permanent: true,
},
{
source: '/foto/1553250417',
destination: '/foto/ijspret-op-het-zuidlaardermeer-3-2018',
permanent: true,
},
{
source: '/foto/1553340012',
destination: '/foto/landgoed-loenen',
permanent: true,
},
{
source: '/foto/1553414152',
destination: '/foto/hoog-water',
permanent: true,
},
{
source: '/foto/1553441653',
destination: '/foto/kempische-stal',
permanent: true,
},
{
source: '/foto/1553441798',
destination: '/foto/landschap-de-liereman',
permanent: true,
},
{
source: '/foto/1553543232',
destination: '/foto/strijp-s',
permanent: true,
},
{
source: '/foto/1553543333',
destination: '/foto/strijp-s',
permanent: true,
},
{
source: '/foto/1553545405',
destination: '/foto/paterswoldsemeer-boothuis',
permanent: true,
},
{
source: '/foto/1553546633',
destination: '/foto/witte-molen-drone',
permanent: true,
},
{
source: '/foto/1553636429',
destination: '/foto/vennen',
permanent: true,
},
{
source: '/foto/1553724300',
destination: '/foto/empty',
permanent: true,
},
{
source: '/foto/1553807568',
destination: '/foto/hard-werkende-rotterdammers-met-skyline-van-rotterdam',
permanent: true,
},
{
source: '/foto/1553807677',
destination: '/foto/gele-loopbrug-aan-de-nieuwe-maas-met-skyline-erasmus-brug',
permanent: true,
},
{
source: '/foto/1553808265',
destination: '/foto/tunnel-onder-de-nieuwe-maas-rotterdam',
permanent: true,
},
{
source: '/foto/1553812868',
destination: '/foto/boerderij-anderen-drenthe',
permanent: true,
},
{
source: '/foto/1554053424',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1554069383',
destination: '/foto/radio-kootwijk',
permanent: true,
},
{
source: '/foto/1554368620',
destination: '/foto/morspoort',
permanent: true,
},
{
source: '/foto/1554369019',
destination: '/foto/burcht-van-leiden',
permanent: true,
},
{
source: '/foto/1554490070',
destination: '/foto/olv-basiliek-maastricht',
permanent: true,
},
{
source: '/foto/1554532106',
destination: '/foto/oude-melkschuur',
permanent: true,
},
{
source: '/foto/1554657864',
destination: '/foto/zonsopkomst-in-barneveld',
permanent: true,
},
{
source: '/foto/1554740307',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1554817056',
destination: '/foto/duurswouder-heide',
permanent: true,
},
{
source: '/foto/1554839999',
destination: '/foto/vaartsche-rijn-utrecht',
permanent: true,
},
{
source: '/foto/1554918534',
destination: '/foto/christmas-in-deventer',
permanent: true,
},
{
source: '/foto/1554918950',
destination: '/foto/back-to-the-dickens-story',
permanent: true,
},
{
source: '/foto/1555178925',
destination: '/foto/de-oversteek',
permanent: true,
},
{
source: '/foto/1555179053',
destination: '/foto/de-oversteek',
permanent: true,
},
{
source: '/foto/1555179253',
destination: '/foto/palendorp-petten',
permanent: true,
},
{
source: '/foto/1555179413',
destination: '/foto/palendorp-petten',
permanent: true,
},
{
source: '/foto/1555179478',
destination: '/foto/palendorp-petten',
permanent: true,
},
{
source: '/foto/1555234687',
destination: '/foto/het-vluchthaventje',
permanent: true,
},
{
source: '/foto/1555535724',
destination: '/foto/waalbrug',
permanent: true,
},
{
source: '/foto/1555535903',
destination: '/foto/waalbrug-nijmegen',
permanent: true,
},
{
source: '/foto/1555536791',
destination: '/foto/hindeloopen',
permanent: true,
},
{
source: '/foto/1555537036',
destination: '/foto/zonsondergang-westkapelle',
permanent: true,
},
{
source: '/foto/1555537720',
destination: '/foto/big',
permanent: true,
},
{
source: '/foto/1555755754',
destination: '/foto/zonsondergang-aan-de-rijn',
permanent: true,
},
{
source: '/foto/1555832100',
destination: '/foto/sunset-at-scheveningen',
permanent: true,
},
{
source: '/foto/1555920848',
destination: '/foto/de-helper',
permanent: true,
},
{
source: '/foto/1556031353',
destination: '/foto/golfbreker-hinderloopen',
permanent: true,
},
{
source: '/foto/1556091217',
destination: '/foto/rotterdam-city-scape',
permanent: true,
},
{
source: '/foto/1556092267',
destination: '/foto/rotterdam-city-nature',
permanent: true,
},
{
source: '/foto/1556092848',
destination: '/foto/reindersmeer-maasduinen',
permanent: true,
},
{
source: '/foto/1556093068',
destination: '/foto/maasduinen-nationaal-park',
permanent: true,
},
{
source: '/foto/1556093295',
destination: '/foto/reindersmeer-maasduinen',
permanent: true,
},
{
source: '/foto/1556094356',
destination: '/foto/sint-jans-cathedral',
permanent: true,
},
{
source: '/foto/1556228578',
destination: '/foto/utrecht',
permanent: true,
},
{
source: '/foto/1556275127',
destination: '/foto/enkhuizen-blue-hour',
permanent: true,
},
{
source: '/foto/1556275773',
destination: '/foto/molen-de-adriaan-haarlem',
permanent: true,
},
{
source: '/foto/1556288623',
destination: '/foto/watertoren-rotterdam',
permanent: true,
},
{
source: '/foto/1556876182',
destination: '/foto/de-vlinder',
permanent: true,
},
{
source: '/foto/1556876566',
destination: '/foto/oudegracht-utrecht',
permanent: true,
},
{
source: '/foto/1556876653',
destination: '/foto/utrecht',
permanent: true,
},
{
source: '/foto/1556876693',
destination: '/foto/river-kwai',
permanent: true,
},
{
source: '/foto/1556876732',
destination: '/foto/gaardbrug',
permanent: true,
},
{
source: '/foto/1556877367',
destination: '/foto/poortgebouw',
permanent: true,
},
{
source: '/foto/1556877803',
destination: '/foto/domtoren-utrecht',
permanent: true,
},
{
source: '/foto/1556879071',
destination: '/foto/willemsbrug',
permanent: true,
},
{
source: '/foto/1556879221',
destination: '/foto/kpn-tower',
permanent: true,
},
{
source: '/foto/1556879311',
destination: '/foto/wilhelminakade',
permanent: true,
},
{
source: '/foto/1556879473',
destination: '/foto/bravenes',
permanent: true,
},
{
source: '/foto/1556879787',
destination: '/foto/utrecht-cs',
permanent: true,
},
{
source: '/foto/1556879885',
destination: '/foto/kantoor',
permanent: true,
},
{
source: '/foto/1556879954',
destination: '/foto/moreelsbrug',
permanent: true,
},
{
source: '/foto/1556879999',
destination: '/foto/stadkantoor-utrecht',
permanent: true,
},
{
source: '/foto/1556880038',
destination: '/foto/utrecht-cs',
permanent: true,
},
{
source: '/foto/1556880165',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1556880465',
destination: '/foto/kubuswoningen',
permanent: true,
},
{
source: '/foto/1556880811',
destination: '/foto/koppelpoort',
permanent: true,
},
{
source: '/foto/1556881665',
destination: '/foto/terrasson',
permanent: true,
},
{
source: '/foto/1556881703',
destination: '/foto/kerk',
permanent: true,
},
{
source: '/foto/1556881813',
destination: '/foto/terrasson',
permanent: true,
},
{
source: '/foto/1556882127',
destination: '/foto/beynac',
permanent: true,
},
{
source: '/foto/1556882185',
destination: '/foto/chateau-de-beynac',
permanent: true,
},
{
source: '/foto/1556988362',
destination: '/foto/groningen-hooge-der-a',
permanent: true,
},
{
source: '/foto/1556988616',
destination: '/foto/reitdiephaven-tijdens-het-blauwe-uurtje',
permanent: true,
},
{
source: '/foto/1557054290',
destination: '/foto/molen-de-adriaan',
permanent: true,
},
{
source: '/foto/1557067348',
destination: '/foto/fort-de-roovere',
permanent: true,
},
{
source: '/foto/1557162272',
destination: '/foto/steiger-haven-oudeschild',
permanent: true,
},
{
source: '/foto/1557162789',
destination: '/foto/lighthouse',
permanent: true,
},
{
source: '/foto/1557246187',
destination: '/foto/havenmond-oudeschild',
permanent: true,
},
{
source: '/foto/1557308564',
destination: '/foto/zuidlaardermeer',
permanent: true,
},
{
source: '/foto/1557308645',
destination: '/foto/zuidlaardermeer',
permanent: true,
},
{
source: '/foto/1557308736',
destination: '/foto/039-t-groninger-landschap',
permanent: true,
},
{
source: '/foto/1557425104',
destination: '/foto/early-morning',
permanent: true,
},
{
source: '/foto/1557519022',
destination: '/foto/koppelpoort-amersfoort',
permanent: true,
},
{
source: '/foto/1557672812',
destination: '/foto/nationale-molendag',
permanent: true,
},
{
source: '/foto/1557734127',
destination: '/foto/servaasbrug-maastricht',
permanent: true,
},
{
source: '/foto/1557825163',
destination: '/foto/het-pad-langs-de-camping',
permanent: true,
},
{
source: '/foto/1557825345',
destination: '/foto/matsloot',
permanent: true,
},
{
source: '/foto/1557836684',
destination: '/foto/oisterwijkse-bossen-en-vennen',
permanent: true,
},
{
source: '/foto/1558128255',
destination: '/foto/westkapelle',
permanent: true,
},
{
source: '/foto/1558451567',
destination: '/foto/tureluur',
permanent: true,
},
{
source: '/foto/1558453440',
destination: '/foto/golden-sunrise',
permanent: true,
},
{
source: '/foto/1558722539',
destination: '/foto/lighthouse',
permanent: true,
},
{
source: '/foto/1558854669',
destination: '/foto/je-ziet-soms-meer-als-je-omkijkt',
permanent: true,
},
{
source: '/foto/1558894170',
destination: '/foto/scharendijke-multicolor',
permanent: true,
},
{
source: '/foto/1559197930',
destination: '/foto/breda-centrum',
permanent: true,
},
{
source: '/foto/1559198025',
destination: '/foto/sunset-biesbosch',
permanent: true,
},
{
source: '/foto/1559286595',
destination: '/foto/het-laantje',
permanent: true,
},
{
source: '/foto/1559286707',
destination: '/foto/mastbos',
permanent: true,
},
{
source: '/foto/1559286855',
destination: '/foto/eenzame-boom',
permanent: true,
},
{
source: '/foto/1559303064',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1559325551',
destination: '/foto/koeien-in-zoeterwoude',
permanent: true,
},
{
source: '/foto/1559568796',
destination: '/foto/hoge-der-a',
permanent: true,
},
{
source: '/foto/1559569593',
destination: '/foto/vismarkt',
permanent: true,
},
{
source: '/foto/1559569642',
destination: '/foto/vismarkt',
permanent: true,
},
{
source: '/foto/1559569943',
destination: '/foto/herestraat',
permanent: true,
},
{
source: '/foto/1559570161',
destination: '/foto/goudkantoor',
permanent: true,
},
{
source: '/foto/1559570288',
destination: '/foto/martinitoren',
permanent: true,
},
{
source: '/foto/1559570335',
destination: '/foto/martinitoren',
permanent: true,
},
{
source: '/foto/1559570499',
destination: '/foto/lage-der-a',
permanent: true,
},
{
source: '/foto/1559570569',
destination: '/foto/hoge-der-a-groningen',
permanent: true,
},
{
source: '/foto/1559570989',
destination: '/foto/dot-groningen',
permanent: true,
},
{
source: '/foto/1559571076',
destination: '/foto/gebouw-duo',
permanent: true,
},
{
source: '/foto/1559571997',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1559572204',
destination: '/foto/groninger-museum',
permanent: true,
},
{
source: '/foto/1559572478',
destination: '/foto/stationshal-groningen',
permanent: true,
},
{
source: '/foto/1559572874',
destination: '/foto/suikerfabriek-vierverlaten-hoogkerk',
permanent: true,
},
{
source: '/foto/1559572916',
destination: '/foto/suikerfabriek-vierverlaten-hoogkerk-groningen',
permanent: true,
},
{
source: '/foto/1559573035',
destination: '/foto/villa-heymans-en-huize-tavenier',
permanent: true,
},
{
source: '/foto/1559573041',
destination: '/foto/villa-heymans-en-huize-tavenier',
permanent: true,
},
{
source: '/foto/1559573285',
destination: '/foto/martinikerkhof',
permanent: true,
},
{
source: '/foto/1559573540',
destination: '/foto/crematorium-ommeland-en-stad',
permanent: true,
},
{
source: '/foto/1559576911',
destination: '/foto/containerwoningen',
permanent: true,
},
{
source: '/foto/1559577173',
destination: '/foto/apollo-hotel',
permanent: true,
},
{
source: '/foto/1559592093',
destination: '/foto/leemkuilen-biezenmortel',
permanent: true,
},
{
source: '/foto/1559592200',
destination: '/foto/leemkuilen-biezenmortel',
permanent: true,
},
{
source: '/foto/1559592586',
destination: '/foto/vismarkt',
permanent: true,
},
{
source: '/foto/1559592687',
destination: '/foto/febo',
permanent: true,
},
{
source: '/foto/1559592903',
destination: '/foto/station-groningen',
permanent: true,
},
{
source: '/foto/1559592990',
destination: '/foto/station-groningen',
permanent: true,
},
{
source: '/foto/1559593035',
destination: '/foto/station-groningen',
permanent: true,
},
{
source: '/foto/1559593297',
destination: '/foto/de-helper-molen',
permanent: true,
},
{
source: '/foto/1559593363',
destination: '/foto/de-helper-molen',
permanent: true,
},
{
source: '/foto/1559593422',
destination: '/foto/de-helper-molen',
permanent: true,
},
{
source: '/foto/1559593477',
destination: '/foto/de-helper-molen',
permanent: true,
},
{
source: '/foto/1559593678',
destination: '/foto/scharendijke',
permanent: true,
},
{
source: '/foto/1559594368',
destination: '/foto/martinitoren',
permanent: true,
},
{
source: '/foto/1559594496',
destination: '/foto/huis-de-beurs',
permanent: true,
},
{
source: '/foto/1559619565',
destination: '/foto/villa-heymans-en-huize-tavenier',
permanent: true,
},
{
source: '/foto/1559619769',
destination: '/foto/tasmantoren',
permanent: true,
},
{
source: '/foto/1559619853',
destination: '/foto/tasmantoren',
permanent: true,
},
{
source: '/foto/1559620184',
destination: '/foto/lage-der-a',
permanent: true,
},
{
source: '/foto/1559620460',
destination: '/foto/stadhuis',
permanent: true,
},
{
source: '/foto/1559620522',
destination: '/foto/stadhuis',
permanent: true,
},
{
source: '/foto/1559620563',
destination: '/foto/stadhuis',
permanent: true,
},
{
source: '/foto/1559620689',
destination: '/foto/suikerfabriek',
permanent: true,
},
{
source: '/foto/1559620778',
destination: '/foto/deense-haven',
permanent: true,
},
{
source: '/foto/1559621049',
destination: '/foto/zuiderhaven',
permanent: true,
},
{
source: '/foto/1559622322',
destination: '/foto/mc-donalds-ter-borch',
permanent: true,
},
{
source: '/foto/1559622434',
destination: '/foto/van-der-valk-hotel',
permanent: true,
},
{
source: '/foto/1559622696',
destination: '/foto/molen-de-jonge-held',
permanent: true,
},
{
source: '/foto/1559622728',
destination: '/foto/molen-de-jonge-held',
permanent: true,
},
{
source: '/foto/1559622908',
destination: '/foto/gas-unie-gebouw',
permanent: true,
},
{
source: '/foto/1559623068',
destination: '/foto/academie-minerva',
permanent: true,
},
{
source: '/foto/1559624139',
destination: '/foto/rijksuniversiteit-groningen',
permanent: true,
},
{
source: '/foto/1559624243',
destination: '/foto/mr-mofongo-groningen',
permanent: true,
},
{
source: '/foto/1559624386',
destination: '/foto/huisartsenspoedpost-groningen',
permanent: true,
},
{
source: '/foto/1559624552',
destination: '/foto/umcg-groningen',
permanent: true,
},
{
source: '/foto/1559624947',
destination: '/foto/garnwerd',
permanent: true,
},
{
source: '/foto/1559624998',
destination: '/foto/korenmolen-de-meeuw',
permanent: true,
},
{
source: '/foto/1559625066',
destination: '/foto/cafe-hammingh',
permanent: true,
},
{
source: '/foto/1559625637',
destination: '/foto/stellingmolen-zeldenrust',
permanent: true,
},
{
source: '/foto/1559625722',
destination: '/foto/stellingmolen-de-hoop',
permanent: true,
},
{
source: '/foto/1559625806',
destination: '/foto/stadhuis',
permanent: true,
},
{
source: '/foto/1559625877',
destination: '/foto/stellingmolen-zeldenrust',
permanent: true,
},
{
source: '/foto/1559625920',
destination: '/foto/stadhuis',
permanent: true,
},
{
source: '/foto/1559625997',
destination: '/foto/diepswal',
permanent: true,
},
{
source: '/foto/1559626263',
destination: '/foto/aduarderzijl',
permanent: true,
},
{
source: '/foto/1559626288',
destination: '/foto/aduarderzijl',
permanent: true,
},
{
source: '/foto/1559626312',
destination: '/foto/aduarderzijl',
permanent: true,
},
{
source: '/foto/1559626339',
destination: '/foto/aduarderzijl',
permanent: true,
},
{
source: '/foto/1559628798',
destination: '/foto/chemie-park-delfzijl',
permanent: true,
},
{
source: '/foto/1559628820',
destination: '/foto/chemie-park-delfzijl',
permanent: true,
},
{
source: '/foto/1559628840',
destination: '/foto/chemie-park-delfzijl',
permanent: true,
},
{
source: '/foto/1559628861',
destination: '/foto/chemie-park-delfzijl',
permanent: true,
},
{
source: '/foto/1559629148',
destination: '/foto/olie-en-korenmolen-woldzigt-roderwolde',
permanent: true,
},
{
source: '/foto/1559629185',
destination: '/foto/winter-sunrise',
permanent: true,
},
{
source: '/foto/1559648744',
destination: '/foto/leek-centrum',
permanent: true,
},
{
source: '/foto/1559648912',
destination: '/foto/borg-nienood',
permanent: true,
},
{
source: '/foto/1559648957',
destination: '/foto/borg-nienoord',
permanent: true,
},
{
source: '/foto/1559648994',
destination: '/foto/sneeuw',
permanent: true,
},
{
source: '/foto/1559649075',
destination: '/foto/passage-lidl',
permanent: true,
},
{
source: '/foto/1559649416',
destination: '/foto/nienoordkapel',
permanent: true,
},
{
source: '/foto/1559649501',
destination: '/foto/leekster-hoofddiep',
permanent: true,
},
{
source: '/foto/1559649560',
destination: '/foto/waterornament',
permanent: true,
},
{
source: '/foto/1559649615',
destination: '/foto/nienoordshaven',
permanent: true,
},
{
source: '/foto/1559649704',
destination: '/foto/cafe-de-buurvrouw',
permanent: true,
},
{
source: '/foto/1559649763',
destination: '/foto/kota-radja',
permanent: true,
},
{
source: '/foto/1559649834',
destination: '/foto/op-de-dam',
permanent: true,
},
{
source: '/foto/1559649958',
destination: '/foto/joodse-schooltje',
permanent: true,
},
{
source: '/foto/1559650003',
destination: '/foto/joodse-schooltje',
permanent: true,
},
{
source: '/foto/1559650124',
destination: '/foto/nienoordshaven',
permanent: true,
},
{
source: '/foto/1559650179',
destination: '/foto/tolberterstraat',
permanent: true,
},
{
source: '/foto/1559650246',
destination: '/foto/clich',
permanent: true,
},
{
source: '/foto/1559650484',
destination: '/foto/stadspark',
permanent: true,
},
{
source: '/foto/1559650636',
destination: '/foto/de-postwagen',
permanent: true,
},
{
source: '/foto/1559650668',
destination: '/foto/kerk',
permanent: true,
},
{
source: '/foto/1559650703',
destination: '/foto/kerk',
permanent: true,
},
{
source: '/foto/1559736980',
destination: '/foto/de-avondstond',
permanent: true,
},
{
source: '/foto/1559893586',
destination: '/foto/de-wind-door-de-duinen',
permanent: true,
},
{
source: '/foto/1559896924',
destination: '/foto/neeltje-jans',
permanent: true,
},
{
source: '/foto/1560011995',
destination: '/foto/vuurtoren-westkapelle',
permanent: true,
},
{
source: '/foto/1560149622',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1560327204',
destination: '/foto/krabbenkreek',
permanent: true,
},
{
source: '/foto/1560327403',
destination: '/foto/chaletparc-krabbenkreek',
permanent: true,
},
{
source: '/foto/1560328372',
destination: '/foto/vogels-op-het-eiland-tholen-zeeland',
permanent: true,
},
{
source: '/foto/1560594838',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1560706002',
destination: '/foto/ijsselbrug-zwolle',
permanent: true,
},
{
source: '/foto/1560706298',
destination: '/foto/de-spiegel',
permanent: true,
},
{
source: '/foto/1560720223',
destination: '/foto/graffiti',
permanent: true,
},
{
source: '/foto/1560720318',
destination: '/foto/graffiti',
permanent: true,
},
{
source: '/foto/1560895511',
destination: '/foto/alium',
permanent: true,
},
{
source: '/foto/1561287693',
destination: '/foto/sunset',
permanent: true,
},
{
source: '/foto/1561288104',
destination: '/foto/heide-paars',
permanent: true,
},
{
source: '/foto/1561288362',
destination: '/foto/wilde-bloemen',
permanent: true,
},
{
source: '/foto/1561440403',
destination: '/foto/suikerbiet-klundert',
permanent: true,
},
{
source: '/foto/1561477468',
destination: '/foto/rand-van-klundert',
permanent: true,
},
{
source: '/foto/1561483264',
destination: '/foto/molen-oudemolen',
permanent: true,
},
{
source: '/foto/1561524827',
destination: '/foto/bunker-willemstad',
permanent: true,
},
{
source: '/foto/1561906012',
destination: '/foto/moddergat',
permanent: true,
},
{
source: '/foto/1561906180',
destination: '/foto/moddergat',
permanent: true,
},
{
source: '/foto/1561921672',
destination: '/foto/ballumer-blickert',
permanent: true,
},
{
source: '/foto/1562002200',
destination: '/foto/waterpoort-in-sneek',
permanent: true,
},
{
source: '/foto/1562002530',
destination: '/foto/de-oversteek-bij-nijmegen',
permanent: true,
},
{
source: '/foto/1562005877',
destination: '/foto/reitdiephaven-te-groningen',
permanent: true,
},
{
source: '/foto/1562006037',
destination: '/foto/paard-van-marken',
permanent: true,
},
{
source: '/foto/1562053497',
destination: '/foto/amsterdam',
permanent: true,
},
{
source: '/foto/1562156941',
destination: '/foto/chevy',
permanent: true,
},
{
source: '/foto/1562317322',
destination: '/foto/treinwagon-westerbork',
permanent: true,
},
{
source: '/foto/1562317417',
destination: '/foto/eindpunt',
permanent: true,
},
{
source: '/foto/1562317563',
destination: '/foto/wagon-westerbork',
permanent: true,
},
{
source: '/foto/1562748734',
destination: '/foto/kerkje-zoutelande',
permanent: true,
},
{
source: '/foto/1562929653',
destination: '/foto/industry',
permanent: true,
},
{
source: '/foto/1563207066',
destination: '/foto/ameland',
permanent: true,
},
{
source: '/foto/1563207200',
destination: '/foto/palen-op-ameland',
permanent: true,
},
{
source: '/foto/1563207307',
destination: '/foto/zonsondergang-ameland',
permanent: true,
},
{
source: '/foto/1563295362',
destination: '/foto/binnendieze-039-s-hertogenbosch',
permanent: true,
},
{
source: '/foto/1563711776',
destination: '/foto/zonsopgang-bij-penningsveer-haarlem',
permanent: true,
},
{
source: '/foto/1563952071',
destination: '/foto/roegwold',
permanent: true,
},
{
source: '/foto/1564302770',
destination: '/foto/dutch-nature',
permanent: true,
},
{
source: '/foto/1564302874',
destination: '/foto/home-sweet-home',
permanent: true,
},
{
source: '/foto/1564303270',
destination: '/foto/high-tatras-slovakie',
permanent: true,
},
{
source: '/foto/1564325425',
destination: '/foto/erasmus',
permanent: true,
},
{
source: '/foto/1564404840',
destination: '/foto/inside',
permanent: true,
},
{
source: '/foto/1564419071',
destination: '/foto/binnenstad-deventer',
permanent: true,
},
{
source: '/foto/1565035724',
destination: '/foto/dauw-op-het-ven',
permanent: true,
},
{
source: '/foto/1565101260',
destination: '/foto/havenhoofd-zuiderstrand-duindorp',
permanent: true,
},
{
source: '/foto/1565101520',
destination: '/foto/surfspot-ter-heijde',
permanent: true,
},
{
source: '/foto/1565101976',
destination: '/foto/skyline-den-haag-centrum',
permanent: true,
},
{
source: '/foto/1565211141',
destination: '/foto/muziekbos',
permanent: true,
},
{
source: '/foto/1565616410',
destination: '/foto/jan-cunen-museum-oude-gemeentehuis',
permanent: true,
},
{
source: '/foto/1566492510',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1566597654',
destination: '/foto/old-rusty-and-abandoned-steam-locomotive-in-the-belgian-ardennes',
permanent: true,
},
{
source: '/foto/1566803647',
destination: '/foto/de-noordermolen-in-gouden-mist',
permanent: true,
},
{
source: '/foto/1566804805',
destination: '/foto/na-regen-komt-zonneschijn',
permanent: true,
},
{
source: '/foto/1566805350',
destination: '/foto/sprookjesachtige-omstandigheden-op-de-posbank',
permanent: true,
},
{
source: '/foto/1566806102',
destination: '/foto/dit-is-ook-het-wad',
permanent: true,
},
{
source: '/foto/1566806590',
destination: '/foto/de-dokkumer-molens',
permanent: true,
},
{
source: '/foto/1566821924',
destination: '/foto/keerpunt-elfstedentocht',
permanent: true,
},
{
source: '/foto/1567208185',
destination: '/foto/de-oversteek',
permanent: true,
},
{
source: '/foto/1567331857',
destination: '/foto/amazing',
permanent: true,
},
{
source: '/foto/1567331914',
destination: '/foto/amazing-architecture',
permanent: true,
},
{
source: '/foto/1567353804',
destination: '/foto/hoornsedijk',
permanent: true,
},
{
source: '/foto/1567353976',
destination: '/foto/a-new-day',
permanent: true,
},
{
source: '/foto/1567398153',
destination: '/foto/sunset-bij-west-terschelling',
permanent: true,
},
{
source: '/foto/1567527761',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1567529564',
destination: '/foto/blauwe-uur',
permanent: true,
},
{
source: '/foto/1567535757',
destination: '/foto/groningen',
permanent: true,
},
{
source: '/foto/1567706470',
destination: '/foto/kinderdijk-verlichtingsweek',
permanent: true,
},
{
source: '/foto/1567745598',
destination: '/foto/50s',
permanent: true,
},
{
source: '/foto/1567745756',
destination: '/foto/a-new-day',
permanent: true,
},
{
source: '/foto/1567745861',
destination: '/foto/purple',
permanent: true,
},
{
source: '/foto/1567775711',
destination: '/foto/hervormde-kerk',
permanent: true,
},
{
source: '/foto/1567775851',
destination: '/foto/vuurtoren-op-texel',
permanent: true,
},
{
source: '/foto/1567877331',
destination: '/foto/willemsbrug',
permanent: true,
},
{
source: '/foto/1567877527',
destination: '/foto/witte-huis',
permanent: true,
},
{
source: '/foto/1567877694',
destination: '/foto/lightpainting',
permanent: true,
},
{
source: '/foto/1567877805',
destination: '/foto/oostpoort-delft',
permanent: true,
},
{
source: '/foto/1567877942',
destination: '/foto/delfshaven',
permanent: true,
},
{
source: '/foto/1567878668',
destination: '/foto/prinsenmolen-langs-de-rotte',
permanent: true,
},
{
source: '/foto/1567891855',
destination: '/foto/rijnhaven',
permanent: true,
},
{
source: '/foto/1567924254',
destination: '/foto/wilhelminapier-vanaf-de-westerkade',
permanent: true,
},
{
source: '/foto/1567924766',
destination: '/foto/westkapelle',
permanent: true,
},
{
source: '/foto/1567926532',
destination: '/foto/kasteel-de-haar',
permanent: true,
},
{
source: '/foto/1567941640',
destination: '/foto/de-oversteek',
permanent: true,
},
{
source: '/foto/1568199691',
destination: '/foto/kiekkaaste',
permanent: true,
},
{
source: '/foto/1568200223',
destination: '/foto/schildjer-tilbat',
permanent: true,
},
{
source: '/foto/1568200273',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1568200486',
destination: '/foto/hunebed-d15-loon',
permanent: true,
},
{
source: '/foto/1568200519',
destination: '/foto/hunebed-d15-loon',
permanent: true,
},
{
source: '/foto/1568200911',
destination: '/foto/steiger-paterswoldsemeer',
permanent: true,
},
{
source: '/foto/1568201151',
destination: '/foto/noordkaap-zonsondergang-over-het-wad',
permanent: true,
},
{
source: '/foto/1568201229',
destination: '/foto/reitdiephaven',
permanent: true,
},
{
source: '/foto/1568201544',
destination: '/foto/vuurtoren-oostmahorn',
permanent: true,
},
{
source: '/foto/1568201831',
destination: '/foto/vuurtoren-oostmahorn',
permanent: true,
},
{
source: '/foto/1568284977',
destination: '/foto/noordermolen-noorddijk-groningen',
permanent: true,
},
{
source: '/foto/1568285461',
destination: '/foto/krimstermolen-noordwolde-groningen',
permanent: true,
},
{
source: '/foto/1568285757',
destination: '/foto/steiger-schildmeer',
permanent: true,
},
{
source: '/foto/1568285786',
destination: '/foto/steiger-schildmeer',
permanent: true,
},
{
source: '/foto/1568285927',
destination: '/foto/oldambtmeer-zonsondergang',
permanent: true,
},
{
source: '/foto/1568356756',
destination: '/foto/grafheuvels-regte-heide-goirle',
permanent: true,
},
{
source: '/foto/1568356839',
destination: '/foto/grafheuvels-goirle',
permanent: true,
},
{
source: '/foto/1568492666',
destination: '/foto/kleurrijke-lucht',
permanent: true,
},
{
source: '/foto/1568524667',
destination: '/foto/mistige-zonsopkomst',
permanent: true,
},
{
source: '/foto/1568696198',
destination: '/foto/mistige-morgen',
permanent: true,
},
{
source: '/foto/1569521883',
destination: '/foto/knuppelpad',
permanent: true,
},
{
source: '/foto/1569576321',
destination: '/foto/westkapelle',
permanent: true,
},
{
source: '/foto/1569747162',
destination: '/foto/i-love-zeeland',
permanent: true,
},
{
source: '/foto/1569785129',
destination: '/foto/unplugged-krabbendijke',
permanent: true,
},
{
source: '/foto/1570048979',
destination: '/foto/drommedaris-enkhuizen',
permanent: true,
},
{
source: '/foto/1570049508',
destination: '/foto/roermond-oude-stad',
permanent: true,
},
{
source: '/foto/1570464460',
destination: '/foto/sunset-bij-west-terschelling',
permanent: true,
},
{
source: '/foto/1570908772',
destination: '/foto/utrecht-centraal-station',
permanent: true,
},
{
source: '/foto/1571056122',
destination: '/foto/dreischor',
permanent: true,
},
{
source: '/foto/1571082828',
destination: '/foto/schokland-vanuit-de-lucht',
permanent: true,
},
{
source: '/foto/1571235229',
destination: '/foto/huisjes',
permanent: true,
},
{
source: '/foto/1571292520',
destination: '/foto/autumn',
permanent: true,
},
{
source: '/foto/1571309459',
destination: '/foto/molen-van-piet',
permanent: true,
},
{
source: '/foto/1571309738',
destination: '/foto/waagtoren',
permanent: true,
},
{
source: '/foto/1571370193',
destination: '/foto/alkmaardermeer',
permanent: true,
},
{
source: '/foto/1571732776',
destination: '/foto/kleurrijke-oevers-bij-het-apeldoorns-kanaal',
permanent: true,
},
{
source: '/foto/1571804283',
destination: '/foto/mysterieus',
permanent: true,
},
{
source: '/foto/1571903731',
destination: '/foto/het-kuitje',
permanent: true,
},
{
source: '/foto/1571904025',
destination: '/foto/de-cocksdorp-vuurtoren',
permanent: true,
},
{
source: '/foto/1571904630',
destination: '/foto/afsluitdijk-den-oever',
permanent: true,
},
{
source: '/foto/1572163405',
destination: '/foto/herfst-tafereel-fort-rovere',
permanent: true,
},
{
source: '/foto/1572359693',
destination: '/foto/herfstwandeling',
permanent: true,
},
{
source: '/foto/1572468929',
destination: '/foto/the-fountain',
permanent: true,
},
{
source: '/foto/1572469197',
destination: '/foto/break-of-dawn',
permanent: true,
},
{
source: '/foto/1572469607',
destination: '/foto/break-your-chains-and-fly-away',
permanent: true,
},
{
source: '/foto/1572780578',
destination: '/foto/oude-rijn-gebied',
permanent: true,
},
{
source: '/foto/1572782541',
destination: '/foto/the-bridge',
permanent: true,
},
{
source: '/foto/1572782744',
destination: '/foto/milky-way',
permanent: true,
},
{
source: '/foto/1572783030',
destination: '/foto/rotterdam-by-night',
permanent: true,
},
{
source: '/foto/1572783294',
destination: '/foto/sky-on-fire',
permanent: true,
},
{
source: '/foto/1572783558',
destination: '/foto/zonsopkomst-domburg',
permanent: true,
},
{
source: '/foto/1572787892',
destination: '/foto/fairytale-castle',
permanent: true,
},
{
source: '/foto/1572897431',
destination: '/foto/schipborgse-diep',
permanent: true,
},
{
source: '/foto/1572897577',
destination: '/foto/schipborgse-diep',
permanent: true,
},
{
source: '/foto/1572911512',
destination: '/foto/3-bruggen-in-1-shot',
permanent: true,
},
{
source: '/foto/1573035557',
destination: '/foto/skyline-nijmegen',
permanent: true,
},
{
source: '/foto/1573071774',
destination: '/foto/restaurant-mijn-keuken',
permanent: true,
},
{
source: '/foto/1573118777',
destination: '/foto/kaasmarkt-edam',
permanent: true,
},
{
source: '/foto/1573119233',
destination: '/foto/sunset-in-the-rain',
permanent: true,
},
{
source: '/foto/1573119778',
destination: '/foto/ook-een-slak-verdient-aandacht',
permanent: true,
},
{
source: '/foto/1573120785',
destination: '/foto/lone-red-tree-at-sunrise',
permanent: true,
},
{
source: '/foto/1573121082',
destination: '/foto/rennend-hert',
permanent: true,
},
{
source: '/foto/1573378614',
destination: '/foto/de-hef',
permanent: true,
},
{
source: '/foto/1573379827',
destination: '/foto/bloeiende-hei-op-de-sallandse-heuvelrug',
permanent: true,
},
{
source: '/foto/1573380030',
destination: '/foto/prachtige-vergezichten',
permanent: true,
},
{
source: '/foto/1573381162',
destination: '/foto/lochemse-berg',
permanent: true,
},
{
source: '/foto/1573463037',
destination: '/foto/park-sonsbeek',
permanent: true,
},
{
source: '/foto/1573465019',
destination: '/foto/prinses-mxima-sluizen',
permanent: true,
},
{
source: '/foto/1573586594',
destination: '/foto/ochtendgloren',
permanent: true,
},
{
source: '/foto/1573587287',
destination: '/foto/kasteel-croy',
permanent: true,
},
{
source: '/foto/1573587602',
destination: '/foto/rule-of-thirds',
permanent: true,
},
{
source: '/foto/1573588314',
destination: '/foto/winter-in-holland',
permanent: true,
},
{
source: '/foto/1573588646',
destination: '/foto/kasteel-heeswijk',
permanent: true,
},
{
source: '/foto/1573588725',
destination: '/foto/paarse-uur',
permanent: true,
},
{
source: '/foto/1573682512',
destination: '/foto/de-oversteek-by-night',
permanent: true,
},
{
source: '/foto/1574186243',
destination: '/foto/long-exposure-westkapelle',
permanent: true,
},
{
source: '/foto/1574186590',
destination: '/foto/purple-morning',
permanent: true,
},
{
source: '/foto/1574348550',
destination: '/foto/silos',
permanent: true,
},
{
source: '/foto/1574360246',
destination: '/foto/deventer',
permanent: true,
},
{
source: '/foto/1574435118',
destination: '/foto/gouda-oosthaven',
permanent: true,
},
{
source: '/foto/1574448429',
destination: '/foto/lutterzand',
permanent: true,
},
{
source: '/foto/1574512153',
destination: '/foto/mastbos-herfst-tijd',
permanent: true,
},
{
source: '/foto/1574540873',
destination: '/foto/stenen-in-de-duinen',
permanent: true,
},
{
source: '/foto/1574584197',
destination: '/foto/vreeswijk-nieuwegein',
permanent: true,
},
{
source: '/foto/1574585753',
destination: '/foto/spoorbrug-moerputten',
permanent: true,
},
{
source: '/foto/1574585796',
destination: '/foto/spoorbrug-moerputten',
permanent: true,
},
{
source: '/foto/1574585830',
destination: '/foto/moerputten',
permanent: true,
},
{
source: '/foto/1574586402',
destination: '/foto/concertzaal-tilburg',
permanent: true,
},
{
source: '/foto/1574586485',
destination: '/foto/doorkijkje',
permanent: true,
},
{
source: '/foto/1574607854',
destination: '/foto/zonsopkomst-amsterdamse-bos',
permanent: true,
},
{
source: '/foto/1574610738',
destination: '/foto/regenboog-huizen-in-houten',
permanent: true,
},
{
source: '/foto/1574627349',
destination: '/foto/scheveningen-haven',
permanent: true,
},
{
source: '/foto/1574976525',
destination: '/foto/zeelandbrug',
permanent: true,
},
{
source: '/foto/1575478278',
destination: '/foto/sunset',
permanent: true,
},
{
source: '/foto/1575567818',
destination: '/foto/sunset-aan-de-maas',
permanent: true,
},
{
source: '/foto/1575811473',
destination: '/foto/gouden-paard',
permanent: true,
},
{
source: '/foto/1575811541',
destination: '/foto/kampen',
permanent: true,
},
{
source: '/foto/1575811654',
destination: '/foto/mistig-mooi',
permanent: true,
},
{
source: '/foto/1575811816',
destination: '/foto/foggy-morning',
permanent: true,
},
{
source: '/foto/1575908276',
destination: '/foto/mist-bij-de-klotputten',
permanent: true,
},
{
source: '/foto/1576138527',
destination: '/foto/quot-handtasje-quot',
permanent: true,
},
{
source: '/foto/1576138682',
destination: '/foto/kasteel-doornenburg-by-night',
permanent: true,
},
{
source: '/foto/1576138745',
destination: '/foto/kasteel-doornenburg-by-night-b-amp-w',
permanent: true,
},
{
source: '/foto/1576139087',
destination: '/foto/hatertse-en-overasseltse-vennen',
permanent: true,
},
{
source: '/foto/1576139166',
destination: '/foto/hatertse-en-overasseltse-vennen',
permanent: true,
},
{
source: '/foto/1576139682',
destination: '/foto/paarse-wereld',
permanent: true,
},
{
source: '/foto/1576139772',
destination: '/foto/paarse-wereld',
permanent: true,
},
{
source: '/foto/1576182445',
destination: '/foto/brug-naar-kasteel-biljoen',
permanent: true,
},
{
source: '/foto/1576182524',
destination: '/foto/kasteel-biljoen',
permanent: true,
},
{
source: '/foto/1576182653',
destination: '/foto/herfstlaan',
permanent: true,
},
{
source: '/foto/1576182815',
destination: '/foto/waterpartij-in-de-herfst',
permanent: true,
},
{
source: '/foto/1576182908',
destination: '/foto/waterloopje-met-quot-watervalletjes-quot-en-blad',
permanent: true,
},
{
source: '/foto/1576440643',
destination: '/foto/reflectie',
permanent: true,
},
{
source: '/foto/1576526962',
destination: '/foto/serene-sfeer',
permanent: true,
},
{
source: '/foto/1576775105',
destination: '/foto/andreas-kerk-ook-wel-wittekerk-genoemd',
permanent: true,
},
{
source: '/foto/1576919687',
destination: '/foto/slikken-bij-waarde',
permanent: true,
},
{
source: '/foto/1577028061',
destination: '/foto/kuiperspoort-middelburg',
permanent: true,
},
{
source: '/foto/1577041354',
destination: '/foto/verlichte-oorlogsgraven',
permanent: true,
},
{
source: '/foto/1577290308',
destination: '/foto/rotterdamse-hef',
permanent: true,
},
{
source: '/foto/1577291033',
destination: '/foto/kuiperspoort-middelburg',
permanent: true,
},
{
source: '/foto/1577534151',
destination: '/foto/kasteel-lelinhuyze',
permanent: true,
},
{
source: '/foto/1577708603',
destination: '/foto/kleuren-boven-dannemeer',
permanent: true,
},
{
source: '/foto/1577723235',
destination: '/foto/eye-on-the-ij',
permanent: true,
},
{
source: '/foto/1577998449',
destination: '/foto/een-nieuwe-dag',
permanent: true,
},
{
source: '/foto/1577998749',
destination: '/foto/een-mistig-begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1577998831',
destination: '/foto/bloeiende-heide',
permanent: true,
},
{
source: '/foto/1577999097',
destination: '/foto/slochterbos',
permanent: true,
},
{
source: '/foto/1577999246',
destination: '/foto/slochterbos',
permanent: true,
},
{
source: '/foto/1577999583',
destination: '/foto/ochtendlicht',
permanent: true,
},
{
source: '/foto/1577999880',
destination: '/foto/fraeylemaborg',
permanent: true,
},
{
source: '/foto/1577999949',
destination: '/foto/fraeylemaborg',
permanent: true,
},
{
source: '/foto/1578000005',
destination: '/foto/fraeylemaborg',
permanent: true,
},
{
source: '/foto/1578032740',
destination: '/foto/zee-van-staal',
permanent: true,
},
{
source: '/foto/1578213783',
destination: '/foto/zonsopgang',
permanent: true,
},
{
source: '/foto/1578213804',
destination: '/foto/chair',
permanent: true,
},
{
source: '/foto/1578213885',
destination: '/foto/hoge-der-a',
permanent: true,
},
{
source: '/foto/1578219054',
destination: '/foto/kasteel-doornenburg',
permanent: true,
},
{
source: '/foto/1578231424',
destination: '/foto/lyondell-chemie-nederland-b-v',
permanent: true,
},
{
source: '/foto/1578261539',
destination: '/foto/golfbreker-breskens',
permanent: true,
},
{
source: '/foto/1578380120',
destination: '/foto/hanzeboog',
permanent: true,
},
{
source: '/foto/1578382633',
destination: '/foto/rotterdam-delfshaven',
permanent: true,
},
{
source: '/foto/1578426329',
destination: '/foto/gemeentehuis-noordwijk',
permanent: true,
},
{
source: '/foto/1578426518',
destination: '/foto/receptie-rabbit-hil-landal',
permanent: true,
},
{
source: '/foto/1578426906',
destination: '/foto/de-haringhappers-katwijk',
permanent: true,
},
{
source: '/foto/1578427199',
destination: '/foto/oostpoort-delft',
permanent: true,
},
{
source: '/foto/1578434203',
destination: '/foto/opkomende-mist',
permanent: true,
},
{
source: '/foto/1578466859',
destination: '/foto/mirrow',
permanent: true,
},
{
source: '/foto/1578467063',
destination: '/foto/frozen',
permanent: true,
},
{
source: '/foto/1578470696',
destination: '/foto/begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1578470956',
destination: '/foto/begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1578471251',
destination: '/foto/begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1578471485',
destination: '/foto/begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1578471739',
destination: '/foto/langs-de-maas',
permanent: true,
},
{
source: '/foto/1578471939',
destination: '/foto/begin-van-de-dag',
permanent: true,
},
{
source: '/foto/1578472130',
destination: '/foto/moderne-kunst-in-de-polder',
permanent: true,
},
{
source: '/foto/1578472481',
destination: '/foto/mist-in-de-morgen',
permanent: true,
},
{
source: '/foto/1578472660',
destination: '/foto/mist-in-de-morgen',
permanent: true,
},
{
source: '/foto/1578487974',
destination: '/foto/de-ijzeren-kaap-op-texel',
permanent: true,
},
{
source: '/foto/1578516497',
destination: '/foto/reestdal',
permanent: true,
},
{
source: '/foto/1578601314',
destination: '/foto/bonte-landschap',
permanent: true,
},
{
source: '/foto/1578831479',
destination: '/foto/golden-hour',
permanent: true,
},
{
source: '/foto/1578831727',
destination: '/foto/mist-zon-en-bomen',
permanent: true,
},
{
source: '/foto/1578832862',
destination: '/foto/kasteel-arcen',
permanent: true,
},
{
source: '/foto/1578833560',
destination: '/foto/de-magrieten-in-rijen',
permanent: true,
},
{
source: '/foto/1578837440',
destination: '/foto/dyntes-marknesse',
permanent: true,
},
{
source: '/foto/1578905234',
destination: '/foto/vlaardingse-haven',
permanent: true,
},
{
source: '/foto/1578947985',
destination: '/foto/watertoren-rotterdam',
permanent: true,
},
{
source: '/foto/1579116642',
destination: '/foto/vuurtoren-oostmahorn',
permanent: true,
},
{
source: '/foto/1579247296',
destination: '/foto/industrie-hembrug',
permanent: true,
},
{
source: '/foto/1579247532',
destination: '/foto/vergane-glorie',
permanent: true,
},
{
source: '/foto/1579260768',
destination: '/foto/monument-moerdijkbrug',
permanent: true,
},
{
source: '/foto/1579423435',
destination: '/foto/evoluon',
permanent: true,
},
{
source: '/foto/1579542634',
destination: '/foto/leersumsche-veld',
permanent: true,
},
{
source: '/foto/1579542738',
destination: '/foto/leersumsche-veld',
permanent: true,
},
{
source: '/foto/1579542880',
destination: '/foto/mistige-morgen-aan-de-rijn',
permanent: true,
},
{
source: '/foto/1579604189',
destination: '/foto/oude-kerk-rijswijk',
permanent: true,
},
{
source: '/foto/1579719255',
destination: '/foto/het-witte-huis',
permanent: true,
},
{
source: '/foto/1579901591',
destination: '/foto/rotterdam-vanaf-katendrecht',
permanent: true,
},
{
source: '/foto/1579902093',
destination: '/foto/de-omval-amsterdam',
permanent: true,
},
{
source: '/foto/1579902534',
destination: '/foto/deventer-gouden-uur',
permanent: true,
},
{
source: '/foto/1579930296',
destination: '/foto/kasteel-henkenshage',
permanent: true,
},
{
source: '/foto/1579930466',
destination: '/foto/fort-henricusv-steenbergen-nb',
permanent: true,
},
{
source: '/foto/1579931353',
destination: '/foto/vogelkijkhut-korendijkse-slikken',
permanent: true,
},
{
source: '/foto/1579931482',
destination: '/foto/spook-stad-doel',
permanent: true,
},
{
source: '/foto/1580155530',
destination: '/foto/groen-mastbos-breda',
permanent: true,
},
{
source: '/foto/1580158406',
destination: '/foto/fraeylemaborg',
permanent: true,
},
{
source: '/foto/1580158952',
destination: '/foto/witte-molen',
permanent: true,
},
{
source: '/foto/1580159372',
destination: '/foto/garnwerd',
permanent: true,
},
{
source: '/foto/1580160132',
destination: '/foto/groningen-hoornseplas',
permanent: true,
},
{
source: '/foto/1580290713',
destination: '/foto/grafheuvel-borger',
permanent: true,
},
{
source: '/foto/1580411667',
destination: '/foto/scheveningen-strand',
permanent: true,
},
{
source: '/foto/1580499700',
destination: '/foto/theater-de-spiegel-met-de-spinhuisbrug',
permanent: true,
},
{
source: '/foto/1580727422',
destination: '/foto/molens-kinderdijk-by-light',
permanent: true,
},
{
source: '/foto/1580727562',
destination: '/foto/biesbosch',
permanent: true,
},
{
source: '/foto/1580727674',
destination: '/foto/abstract',
permanent: true,
},
{
source: '/foto/1580745010',
destination: '/foto/provinciehuis',
permanent: true,
},
{
source: '/foto/1580841713',
destination: '/foto/hoek-van-holland',
permanent: true,
},
{
source: '/foto/1580843368',
destination: '/foto/tiengemeten-op-een-mooie-maandagmorgen',
permanent: true,
},
{
source: '/foto/1580843437',
destination: '/foto/tiengemeten',
permanent: true,
},
{
source: '/foto/1580843703',
destination: '/foto/scheveningen',
permanent: true,
},
{
source: '/foto/1580883458',
destination: '/foto/zaanse-schans-hoeve',
permanent: true,
},
{
source: '/foto/1580883618',
destination: '/foto/ijsvogeltje',
permanent: true,
},
{
source: '/foto/1580884058',
destination: '/foto/flame-on',
permanent: true,
},
{
source: '/foto/1580884455',
destination: '/foto/kort-kort-kort-lang',
permanent: true,
},
{
source: '/foto/1581508784',
destination: '/foto/straight-and-curved',
permanent: true,
},
{
source: '/foto/1581539094',
destination: '/foto/maasvlakte-strand',
permanent: true,
},
{
source: '/foto/1581670132',
destination: '/foto/bathbrug-alkmaar',
permanent: true,
},
{
source: '/foto/1581695893',
destination: '/foto/lebuinus-toren',
permanent: true,
},
{
source: '/foto/1581885687',
destination: '/foto/bovensmilde-pomphuisje',
permanent: true,
},
{
source: '/foto/1581932457',
destination: '/foto/wageningse-bovenpolder',
permanent: true,
},
{
source: '/foto/1581964846',
destination: '/foto/papiermolenbrug',
permanent: true,
},
{
source: '/foto/1581975943',
destination: '/foto/braamsplas',
permanent: true,
},
{
source: '/foto/1581976387',
destination: '/foto/evertsbos',
permanent: true,
},
{
source: '/foto/1582022440',
destination: '/foto/boothuis-aan-de-regge',
permanent: true,
},
{
source: '/foto/1582033651',
destination: '/foto/strandpaviljoen-bremerbaai-biddinghuizen',
permanent: true,
},
{
source: '/foto/1582040642',
destination: '/foto/shadow-of-light',
permanent: true,
},
{
source: '/foto/1582288319',
destination: '/foto/pier-horizon',
permanent: true,
},
{
source: '/foto/1582288358',
destination: '/foto/pier-horizon',
permanent: true,
},
{
source: '/foto/1582288384',
destination: '/foto/pier-horizon',
permanent: true,
},
{
source: '/foto/1582288468',
destination: '/foto/waag-deventer',
permanent: true,
},
{
source: '/foto/1582288573',
destination: '/foto/deventer-skyline',
permanent: true,
},
{
source: '/foto/1582288604',
destination: '/foto/deventer',
permanent: true,
},
{
source: '/foto/1582288655',
destination: '/foto/mooi-doorkijkje-naar-kerk-in-deventer',
permanent: true,
},
{
source: '/foto/1582288751',
destination: '/foto/zonsopkomst-oude-haven-schokland',
permanent: true,
},
{
source: '/foto/1582288796',
destination: '/foto/oude-haven-schokland',
permanent: true,
},
{
source: '/foto/1582288869',
destination: '/foto/hunnebed-on-fire',
permanent: true,
},
{
source: '/foto/1582288924',
destination: '/foto/the-old-tree-on-fire',
permanent: true,
},
{
source: '/foto/1582289158',
destination: '/foto/binnenvaartsmonument-schokland',
permanent: true,
},
{
source: '/foto/1582396750',
destination: '/foto/de-lek-bij-culemborg',
permanent: true,
},
{
source: '/foto/1582437018',
destination: '/foto/kasteel-amerongen',
permanent: true,
},
{
source: '/foto/1582439376',
destination: '/foto/kasteel-heemstede',
permanent: true,
},
{
source: '/foto/1582452927',
destination: '/foto/arendshoofd',
permanent: true,
},
{
source: '/foto/1582736641',
destination: '/foto/keerpunt-elfstedentocht',
permanent: true,
},
{
source: '/foto/1583063810',
destination: '/foto/hemrik-in-de-winter',
permanent: true,
},
{
source: '/foto/1583085050',
destination: '/foto/skyline-kampen',
permanent: true,
},
{
source: '/foto/1583090352',
destination: '/foto/tuinmeubbelland-dronten',
permanent: true,
},
{
source: '/foto/1583135123',
destination: '/foto/sint-jan-gouda',
permanent: true,
},
{
source: '/foto/1583135274',
destination: '/foto/museum-haven-gouda',
permanent: true,
},
{
source: '/foto/1583184697',
destination: '/foto/kunstwerk-quot-wachten-op-hoog-water-quot',
permanent: true,
},
{
source: '/foto/1583331900',
destination: '/foto/go-with-the-flow',
permanent: true,
},
{
source: '/foto/1583345090',
destination: '/foto/nemo-science-museum',
permanent: true,
},
{
source: '/foto/1583425158',
destination: '/foto/grevelingen-meer',
permanent: true,
},
{
source: '/foto/1583847857',
destination: '/foto/vuurtoren-hellevoetsluis',
permanent: true,
},
{
source: '/foto/1583927853',
destination: '/foto/the-daily-fisherman-scheveningen-haven',
permanent: true,
},
{
source: '/foto/1583929179',
destination: '/foto/naturalis-leiden',
permanent: true,
},
{
source: '/foto/1583929239',
destination: '/foto/naturalis-leiden',
permanent: true,
},
{
source: '/foto/1583929457',
destination: '/foto/pontsteiger-amsterdam',
permanent: true,
},
{
source: '/foto/1583929589',
destination: '/foto/pontsteiger-amsterdam',
permanent: true,
},
{
source: '/foto/1583929658',
destination: '/foto/pontsteiger-amsterdam',
permanent: true,
},
{
source: '/foto/1583929794',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1583929857',
destination: '/foto/dinnertime',
permanent: true,
},
{
source: '/foto/1583930058',
destination: '/foto/leiden',
permanent: true,
},
{
source: '/foto/1583930329',
destination: '/foto/leiden-in-de-mist',
permanent: true,
},
{
source: '/foto/1583930439',
destination: '/foto/mistig-leiden',
permanent: true,
},
{
source: '/foto/1584017588',
destination: '/foto/hollandscaoe',
permanent: true,
},
{
source: '/foto/1584017651',
destination: '/foto/hollandscape',
permanent: true,
},
{
source: '/foto/1584017696',
destination: '/foto/hollandscape',
permanent: true,
},
{
source: '/foto/1584017953',
destination: '/foto/dame-blanche',
permanent: true,
},
{
source: '/foto/1584018133',
destination: '/foto/the-swan',
permanent: true,
},
{
source: '/foto/1584018210',
destination: '/foto/maasbrug',
permanent: true,
},
{
source: '/foto/1584018286',
destination: '/foto/luxor-theater',
permanent: true,
},
{
source: '/foto/1584018578',
destination: '/foto/the-dyke',
permanent: true,
},
{
source: '/foto/1584018722',
destination: '/foto/the-room',
permanent: true,
},
{
source: '/foto/1584018812',
destination: '/foto/the-roof',
permanent: true,
},
{
source: '/foto/1584018924',
destination: '/foto/the-roof',
permanent: true,
},
{
source: '/foto/1584044036',
destination: '/foto/steiger-paterswoldsemeer',
permanent: true,
},
{
source: '/foto/1584108924',
destination: '/foto/nienoord-leek-provincie-groningen',
permanent: true,
},
{
source: '/foto/1584109204',
destination: '/foto/leekstermeer-buurtschap-nietap-provincie-drenthe-tijdens-zonsopkomst',
permanent: true,
},
{
source: '/foto/1584371031',
destination: '/foto/luik-guillemins',
permanent: true,
},
{
source: '/foto/1584371201',
destination: '/foto/beautiful-arches',
permanent: true,
},
{
source: '/foto/1584480460',
destination: '/foto/de-oversteek',
permanent: true,
},
{
source: '/foto/1584542889',
destination: '/foto/bergpoort-deventer',
permanent: true,
},
{
source: '/foto/1584543200',
destination: '/foto/uitzicht-deventer-vanaf-wilhelminabrug',
permanent: true,
},
{
source: '/foto/1584621213',
destination: '/foto/sunset-wisentbos',
permanent: true,
},
{
source: '/foto/1584809965',
destination: '/foto/zutphen-by-night',
permanent: true,
},
{
source: '/foto/1584817248',
destination: '/foto/duo-gebouw',
permanent: true,
},
{
source: '/foto/1584874734',
destination: '/foto/nemo-amsterdam-52-22-039-29-575-quot-n-4-54-039-47-737-quot-e',
permanent: true,
},
{
source: '/foto/1584878935',
destination: '/foto/scheepvaartmuseum',
permanent: true,
},
{
source: '/foto/1584993396',
destination: '/foto/de-hofstad-in-de-vroege-ochtend',
permanent: true,
},
{
source: '/foto/1585059559',
destination: '/foto/calatrava-harp',
permanent: true,
},
{
source: '/foto/1585060099',
destination: '/foto/panorama-centrum-zwolle',
permanent: true,
},
{
source: '/foto/1585239083',
destination: '/foto/dordrecht-bij-night',
permanent: true,
},
{
source: '/foto/1585239736',
destination: '/foto/reddding-maatschappij-hindeloopen',
permanent: true,
},
{
source: '/foto/1585312840',
destination: '/foto/rottemeren',
permanent: true,
},
{
source: '/foto/1585313157',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1585317639',
destination: '/foto/markthal-rotterdam',
permanent: true,
},
{
source: '/foto/1585325929',
destination: '/foto/rotterdam-centraal',
permanent: true,
},
{
source: '/foto/1585326095',
destination: '/foto/het-witte-huis',
permanent: true,
},
{
source: '/foto/1585345253',
destination: '/foto/sleepnir-heerema',
permanent: true,
},
{
source: '/foto/1585380859',
destination: '/foto/deltagoot',
permanent: true,
},
{
source: '/foto/1585551256',
destination: '/foto/markthal-purmerend',
permanent: true,
},
{
source: '/foto/1585601874',
destination: '/foto/stenen-pier',
permanent: true,
},
{
source: '/foto/1585639511',
destination: '/foto/blauwe-uurtje-bij-oude-haven',
permanent: true,
},
{
source: '/foto/1585841828',
destination: '/foto/amerongse-bovenpolder',
permanent: true,
},
{
source: '/foto/1585841903',
destination: '/foto/amerongse-bovenpolder',
permanent: true,
},
{
source: '/foto/1585842066',
destination: '/foto/maasbommel',
permanent: true,
},
{
source: '/foto/1585915873',
destination: '/foto/de-hors-texel',
permanent: true,
},
{
source: '/foto/1585915978',
destination: '/foto/de-hors-texel',
permanent: true,
},
{
source: '/foto/1585916119',
destination: '/foto/de-hors-texel',
permanent: true,
},
{
source: '/foto/1585991433',
destination: '/foto/distance-to-light',
permanent: true,
},
{
source: '/foto/1586197707',
destination: '/foto/ijsselmeer',
permanent: true,
},
{
source: '/foto/1586197933',
destination: '/foto/de-rotterdamse-hoek',
permanent: true,
},
{
source: '/foto/1586197989',
destination: '/foto/de-rotterdamse-hoek',
permanent: true,
},
{
source: '/foto/1586272197',
destination: '/foto/kattendijke-de-gebroken-dijk',
permanent: true,
},
{
source: '/foto/1586279587',
destination: '/foto/beatrixkwartier',
permanent: true,
},
{
source: '/foto/1586288211',
destination: '/foto/zonsondergang-over-de-eems-bij-fiemel-groningen',
permanent: true,
},
{
source: '/foto/1586438545',
destination: '/foto/supermaan',
permanent: true,
},
{
source: '/foto/1586438644',
destination: '/foto/vuurtoren-oude-haven-schokland',
permanent: true,
},
{
source: '/foto/1586647776',
destination: '/foto/de-vroege-vogel',
permanent: true,
},
{
source: '/foto/1586780653',
destination: '/foto/verkeers-en-spoorbrug-over-de-ijssel-zutphen',
permanent: true,
},
{
source: '/foto/1586799419',
destination: '/foto/zonsondergang-steiger-schildmeer',
permanent: true,
},
{
source: '/foto/1586935505',
destination: '/foto/erasmusbrug-rotterdam',
permanent: true,
},
{
source: '/foto/1587155536',
destination: '/foto/romeins-masker',
permanent: true,
},
{
source: '/foto/1587155934',
destination: '/foto/de-oversteek-nijmegen',
permanent: true,
},
{
source: '/foto/1587376451',
destination: '/foto/tusschenwater-zuidlaren',
permanent: true,
},
{
source: '/foto/1587396604',
destination: '/foto/ravenswaaij',
permanent: true,
},
{
source: '/foto/1587551974',
destination: '/foto/ceintuurbaan-zonsondergang',
permanent: true,
},
{
source: '/foto/1587912810',
destination: '/foto/wrak-in-de-oosterschelde-bij-yerseke',
permanent: true,
},
{
source: '/foto/1588082701',
destination: '/foto/het-gezicht-van-nijmegen',
permanent: true,
},
{
source: '/foto/1588154600',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588155136',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588167214',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588167419',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588167469',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588167557',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588171392',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588172224',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588172440',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588236061',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1588241215',
destination: '/foto/willem-iii-plantage',
permanent: true,
},
{
source: '/foto/1588241321',
destination: '/foto/willem-iii-plantage',
permanent: true,
},
{
source: '/foto/1588241463',
destination: '/foto/willem-iii-plantage',
permanent: true,
},
{
source: '/foto/1588254435',
destination: '/foto/mesmarize',
permanent: true,
},
{
source: '/foto/1588254592',
destination: '/foto/zaanse-schans',
permanent: true,
},
{
source: '/foto/1588254851',
destination: '/foto/krommeniedijk',
permanent: true,
},
{
source: '/foto/1588314756',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1588314835',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1588314913',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1588344072',
destination: '/foto/sereniteit',
permanent: true,
},
{
source: '/foto/1588344781',
destination: '/foto/waakzaam',
permanent: true,
},
{
source: '/foto/1588405757',
destination: '/foto/kreelse-plas',
permanent: true,
},
{
source: '/foto/1588405894',
destination: '/foto/kreelse-plas',
permanent: true,
},
{
source: '/foto/1588520164',
destination: '/foto/amerongen-bovenpolder',
permanent: true,
},
{
source: '/foto/1588520648',
destination: '/foto/amerongen-bovenpolder',
permanent: true,
},
{
source: '/foto/1588520899',
destination: '/foto/amerongen-bovenpolder',
permanent: true,
},
{
source: '/foto/1588521101',
destination: '/foto/amerongen-bovenpolder',
permanent: true,
},
{
source: '/foto/1588585399',
destination: '/foto/henschotermeer',
permanent: true,
},
{
source: '/foto/1588585483',
destination: '/foto/henschotermeer',
permanent: true,
},
{
source: '/foto/1588585535',
destination: '/foto/henschotermeer',
permanent: true,
},
{
source: '/foto/1588718208',
destination: '/foto/blue-city-skyline',
permanent: true,
},
{
source: '/foto/1588874700',
destination: '/foto/stilte-voor-de-storm',
permanent: true,
},
{
source: '/foto/1589034829',
destination: '/foto/broekerbos',
permanent: true,
},
{
source: '/foto/1589034942',
destination: '/foto/naast-het-broekerbos-het-valleikanaal-bij-scherpenzeel',
permanent: true,
},
{
source: '/foto/1589035134',
destination: '/foto/broekerbos-naast-valleikanaal',
permanent: true,
},
{
source: '/foto/1589035271',
destination: '/foto/broekerbos',
permanent: true,
},
{
source: '/foto/1589035369',
destination: '/foto/broekerbos',
permanent: true,
},
{
source: '/foto/1589101653',
destination: '/foto/valleikanaal-voorbij-het-broekerbos',
permanent: true,
},
{
source: '/foto/1589188899',
destination: '/foto/hemelse-berg-oosterbeek',
permanent: true,
},
{
source: '/foto/1589189016',
destination: '/foto/de-hemelse-berg',
permanent: true,
},
{
source: '/foto/1589189068',
destination: '/foto/de-hemelse-berg',
permanent: true,
},
{
source: '/foto/1589191781',
destination: '/foto/de-hemelse-berg',
permanent: true,
},
{
source: '/foto/1589191897',
destination: '/foto/de-hemelse-berg',
permanent: true,
},
{
source: '/foto/1589192484',
destination: '/foto/park-sonsbeek',
permanent: true,
},
{
source: '/foto/1589192559',
destination: '/foto/park-sonsbeek',
permanent: true,
},
{
source: '/foto/1589365111',
destination: '/foto/martinus-nijhoffbrug',
permanent: true,
},
{
source: '/foto/1589380013',
destination: '/foto/wolfhezerheide',
permanent: true,
},
{
source: '/foto/1589380093',
destination: '/foto/wodanseiken',
permanent: true,
},
{
source: '/foto/1589380179',
destination: '/foto/wolfhezerheide',
permanent: true,
},
{
source: '/foto/1589380256',
destination: '/foto/wolfhezerheide',
permanent: true,
},
{
source: '/foto/1589380343',
destination: '/foto/wolfhezerheide',
permanent: true,
},
{
source: '/foto/1589380482',
destination: '/foto/wolfhezerheide',
permanent: true,
},
{
source: '/foto/1589482906',
destination: '/foto/rotterdam-city-skyline',
permanent: true,
},
{
source: '/foto/1589717578',
destination: '/foto/groot-wolfswinkel-renswoude',
permanent: true,
},
{
source: '/foto/1589717686',
destination: '/foto/groot-wolfswinkel',
permanent: true,
},
{
source: '/foto/1589718018',
destination: '/foto/groot-wolfswinkel',
permanent: true,
},
{
source: '/foto/1589718091',
destination: '/foto/groot-wolfswinkel',
permanent: true,
},
{
source: '/foto/1589736903',
destination: '/foto/deventer',
permanent: true,
},
{
source: '/foto/1589820555',
destination: '/foto/nederrijn',
permanent: true,
},
{
source: '/foto/1590095665',
destination: '/foto/zuidbuurt',
permanent: true,
},
{
source: '/foto/1590235145',
destination: '/foto/snelbinder-naaldwijk',
permanent: true,
},
{
source: '/foto/1590249996',
destination: '/foto/barneveld-klein-bylaer',
permanent: true,
},
{
source: '/foto/1590250072',
destination: '/foto/paradijs',
permanent: true,
},
{
source: '/foto/1590250128',
destination: '/foto/paradijs',
permanent: true,
},
{
source: '/foto/1590250237',
destination: '/foto/landgoed-klein-bylaer',
permanent: true,
},
{
source: '/foto/1590250294',
destination: '/foto/landgoed-klein-bylaer',
permanent: true,
},
{
source: '/foto/1590250354',
destination: '/foto/paradijs',
permanent: true,
},
{
source: '/foto/1590324831',
destination: '/foto/morning-glory',
permanent: true,
},
{
source: '/foto/1590325514',
destination: '/foto/de-bootjes',
permanent: true,
},
{
source: '/foto/1590329591',
destination: '/foto/veluwe',
permanent: true,
},
{
source: '/foto/1590329777',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1590506589',
destination: '/foto/slochter-ae',
permanent: true,
},
{
source: '/foto/1590519746',
destination: '/foto/zand-duinen-in-nederland',
permanent: true,
},
{
source: '/foto/1590519896',
destination: '/foto/bomen-groeien-in-de-zandduinen',
permanent: true,
},
{
source: '/foto/1590593102',
destination: '/foto/dokkum-stad',
permanent: true,
},
{
source: '/foto/1590593458',
destination: '/foto/dokkumer-molens',
permanent: true,
},
{
source: '/foto/1590593528',
destination: '/foto/dokkumer-molens-blauwe-uur',
permanent: true,
},
{
source: '/foto/1590701455',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1590859654',
destination: '/foto/lente-groen',
permanent: true,
},
{
source: '/foto/1590859942',
destination: '/foto/tjasker',
permanent: true,
},
{
source: '/foto/1590938240',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1590938346',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1591126580',
destination: '/foto/oude-stadscentrum-zierikzee',
permanent: true,
},
{
source: '/foto/1591126766',
destination: '/foto/molen-039-den-haas-039-in-zierikzee',
permanent: true,
},
{
source: '/foto/1591127925',
destination: '/foto/oosterscheldedam-met-de-waterkering-bescherming-tegen-hoog-water',
permanent: true,
},
{
source: '/foto/1591302535',
destination: '/foto/the-farm',
permanent: true,
},
{
source: '/foto/1591364156',
destination: '/foto/eemnesserpolder',
permanent: true,
},
{
source: '/foto/1591364332',
destination: '/foto/eemnesserpolder',
permanent: true,
},
{
source: '/foto/1591369108',
destination: '/foto/breugelse-beek',
permanent: true,
},
{
source: '/foto/1591369637',
destination: '/foto/breugelse-beek',
permanent: true,
},
{
source: '/foto/1591388138',
destination: '/foto/ring-of-fire',
permanent: true,
},
{
source: '/foto/1591624514',
destination: '/foto/kasteel-vorden',
permanent: true,
},
{
source: '/foto/1591624597',
destination: '/foto/rozenpracht',
permanent: true,
},
{
source: '/foto/1591624651',
destination: '/foto/gele-woonkamer',
permanent: true,
},
{
source: '/foto/1591624716',
destination: '/foto/kleine-loungeruimte',
permanent: true,
},
{
source: '/foto/1591624766',
destination: '/foto/luchtfoto',
permanent: true,
},
{
source: '/foto/1591624825',
destination: '/foto/kasteel-vorden-met-mooie-verlichting',
permanent: true,
},
{
source: '/foto/1591624910',
destination: '/foto/zomerfoto',
permanent: true,
},
{
source: '/foto/1591709505',
destination: '/foto/sprookjesbos',
permanent: true,
},
{
source: '/foto/1591710074',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1591711090',
destination: '/foto/marstrand-zweden',
permanent: true,
},
{
source: '/foto/1591711922',
destination: '/foto/borgloon',
permanent: true,
},
{
source: '/foto/1591711990',
destination: '/foto/reading-between-the-lines',
permanent: true,
},
{
source: '/foto/1591712973',
destination: '/foto/herfst-valle-de-la-hogne',
permanent: true,
},
{
source: '/foto/1592234599',
destination: '/foto/molen-etersheim',
permanent: true,
},
{
source: '/foto/1592306487',
destination: '/foto/veerse-meer',
permanent: true,
},
{
source: '/foto/1592369270',
destination: '/foto/fiets-schans',
permanent: true,
},
{
source: '/foto/1592738304',
destination: '/foto/ijssel-wijhe',
permanent: true,
},
{
source: '/foto/1593097221',
destination: '/foto/volendam-by-night',
permanent: true,
},
{
source: '/foto/1593250210',
destination: '/foto/zonsondergang-met-molen',
permanent: true,
},
{
source: '/foto/1593433068',
destination: '/foto/barco-technologies-kortrijk-belgium',
permanent: true,
},
{
source: '/foto/1593636145',
destination: '/foto/geestmerambacht',
permanent: true,
},
{
source: '/foto/1593636599',
destination: '/foto/st-laurenskerk',
permanent: true,
},
{
source: '/foto/1594157376',
destination: '/foto/muurschilderingen',
permanent: true,
},
{
source: '/foto/1594249135',
destination: '/foto/binnenhof-den-haag',
permanent: true,
},
{
source: '/foto/1594293083',
destination: '/foto/veerse-meer',
permanent: true,
},
{
source: '/foto/1594389785',
destination: '/foto/under-a-pink-sky',
permanent: true,
},
{
source: '/foto/1594640102',
destination: '/foto/stuck-in-mud',
permanent: true,
},
{
source: '/foto/1594652038',
destination: '/foto/metaal-kathedraal-utrecht',
permanent: true,
},
{
source: '/foto/1594658845',
destination: '/foto/schildmeer-steendam',
permanent: true,
},
{
source: '/foto/1594658991',
destination: '/foto/zonsopkomst-dannemeer',
permanent: true,
},
{
source: '/foto/1594660420',
destination: '/foto/sunset-ameland',
permanent: true,
},
{
source: '/foto/1594660464',
destination: '/foto/palen',
permanent: true,
},
{
source: '/foto/1594715588',
destination: '/foto/summer-feeling',
permanent: true,
},
{
source: '/foto/1594812402',
destination: '/foto/waterpoort-sneek',
permanent: true,
},
{
source: '/foto/1594812729',
destination: '/foto/aan-het-water-hindeloopen',
permanent: true,
},
{
source: '/foto/1594813068',
destination: '/foto/de-helper-molen',
permanent: true,
},
{
source: '/foto/1594835952',
destination: '/foto/morning-reflection',
permanent: true,
},
{
source: '/foto/1594907258',
destination: '/foto/vlissingen-boulevard',
permanent: true,
},
{
source: '/foto/1594908143',
destination: '/foto/terneuzen-cityscape',
permanent: true,
},
{
source: '/foto/1594909371',
destination: '/foto/avondrood-in-axel',
permanent: true,
},
{
source: '/foto/1594917899',
destination: '/foto/eend-in-de-mist',
permanent: true,
},
{
source: '/foto/1595070182',
destination: '/foto/buurman-039-s-gras-is-soms-echt-groener',
permanent: true,
},
{
source: '/foto/1595170752',
destination: '/foto/vlondertuin',
permanent: true,
},
{
source: '/foto/1595183864',
destination: '/foto/fiets-en-loopbrug-oirschot',
permanent: true,
},
{
source: '/foto/1595183931',
destination: '/foto/oirschot',
permanent: true,
},
{
source: '/foto/1595257391',
destination: '/foto/beacon-in-the-mist',
permanent: true,
},
{
source: '/foto/1595335358',
destination: '/foto/groenlo',
permanent: true,
},
{
source: '/foto/1595341844',
destination: '/foto/standing-still',
permanent: true,
},
{
source: '/foto/1595425168',
destination: '/foto/kasteel-de-keverberg',
permanent: true,
},
{
source: '/foto/1595431629',
destination: '/foto/nieuwe-sluis',
permanent: true,
},
{
source: '/foto/1595502839',
destination: '/foto/double-tree',
permanent: true,
},
{
source: '/foto/1595570150',
destination: '/foto/ijsbreker',
permanent: true,
},
{
source: '/foto/1595570723',
destination: '/foto/ijbreker',
permanent: true,
},
{
source: '/foto/1595686635',
destination: '/foto/kasteel-vorden',
permanent: true,
},
{
source: '/foto/1595743124',
destination: '/foto/boot-cornwerd',
permanent: true,
},
{
source: '/foto/1595750823',
destination: '/foto/structures',
permanent: true,
},
{
source: '/foto/1595854332',
destination: '/foto/rainbow-trees',
permanent: true,
},
{
source: '/foto/1596030442',
destination: '/foto/dive-city',
permanent: true,
},
{
source: '/foto/1596101516',
destination: '/foto/walking',
permanent: true,
},
{
source: '/foto/1596292197',
destination: '/foto/neeltje-jans',
permanent: true,
},
{
source: '/foto/1596543604',
destination: '/foto/tropical-dutch',
permanent: true,
},
{
source: '/foto/1596549276',
destination: '/foto/tulpenveld',
permanent: true,
},
{
source: '/foto/1596549465',
destination: '/foto/pier-koehool',
permanent: true,
},
{
source: '/foto/1596549600',
destination: '/foto/zonsondergang-glazen-bol',
permanent: true,
},
{
source: '/foto/1596555234',
destination: '/foto/spoorbruggen-hollands-diep',
permanent: true,
},
{
source: '/foto/1596555472',
destination: '/foto/botlekbrug-hoogvliet',
permanent: true,
},
{
source: '/foto/1596577875',
destination: '/foto/poptaslot-in-marsum',
permanent: true,
},
{
source: '/foto/1596707035',
destination: '/foto/fresh-start',
permanent: true,
},
{
source: '/foto/1596707112',
destination: '/foto/enthralling-view',
permanent: true,
},
{
source: '/foto/1596955000',
destination: '/foto/heat-wave',
permanent: true,
},
{
source: '/foto/1597165873',
destination: '/foto/vurige-stilte',
permanent: true,
},
{
source: '/foto/1597476823',
destination: '/foto/forest',
permanent: true,
},
{
source: '/foto/1597489450',
destination: '/foto/pink-party',
permanent: true,
},
{
source: '/foto/1597671875',
destination: '/foto/skyline-met-onweer',
permanent: true,
},
{
source: '/foto/1597675193',
destination: '/foto/mirror-mirror',
permanent: true,
},
{
source: '/foto/1597765627',
destination: '/foto/de-witte-molen-haren',
permanent: true,
},
{
source: '/foto/1597917486',
destination: '/foto/mist-wish',
permanent: true,
},
{
source: '/foto/1598085134',
destination: '/foto/railway-bridge',
permanent: true,
},
{
source: '/foto/1598105019',
destination: '/foto/colorful-sunset',
permanent: true,
},
{
source: '/foto/1598360554',
destination: '/foto/watertoren-de-esch',
permanent: true,
},
{
source: '/foto/1598554894',
destination: '/foto/hapert',
permanent: true,
},
{
source: '/foto/1598554988',
destination: '/foto/libelle',
permanent: true,
},
{
source: '/foto/1598555561',
destination: '/foto/bruggetje-aalst',
permanent: true,
},
{
source: '/foto/1598555648',
destination: '/foto/gebied-eekenroode-aalst',
permanent: true,
},
{
source: '/foto/1598558898',
destination: '/foto/nedereindse-plas',
permanent: true,
},
{
source: '/foto/1598823047',
destination: '/foto/terhorsterzand',
permanent: true,
},
{
source: '/foto/1598823223',
destination: '/foto/terhorsterzand-stilte',
permanent: true,
},
{
source: '/foto/1599061773',
destination: '/foto/stranded',
permanent: true,
},
{
source: '/foto/1599061936',
destination: '/foto/to-the-rescue',
permanent: true,
},
{
source: '/foto/1599062169',
destination: '/foto/endless',
permanent: true,
},
{
source: '/foto/1599225812',
destination: '/foto/de-zonsopkomst-die-niet-kwam',
permanent: true,
},
{
source: '/foto/1599225891',
destination: '/foto/de-witte-molen',
permanent: true,
},
{
source: '/foto/1599296832',
destination: '/foto/oude-kerk-soest',
permanent: true,
},
{
source: '/foto/1599423924',
destination: '/foto/den-bommel',
permanent: true,
},
{
source: '/foto/1599424057',
destination: '/foto/strand-den-bommel',
permanent: true,
},
{
source: '/foto/1599424228',
destination: '/foto/pier-den-bommel',
permanent: true,
},
{
source: '/foto/1599424689',
destination: '/foto/grevelingendam',
permanent: true,
},
{
source: '/foto/1599424825',
destination: '/foto/grevelingendam',
permanent: true,
},
{
source: '/foto/1599425105',
destination: '/foto/dreigende-lucht',
permanent: true,
},
{
source: '/foto/1599425191',
destination: '/foto/het-moment',
permanent: true,
},
{
source: '/foto/1599425265',
destination: '/foto/onder-de-wolken-door',
permanent: true,
},
{
source: '/foto/1599425355',
destination: '/foto/onweer-in-de-lucht',
permanent: true,
},
{
source: '/foto/1599425511',
destination: '/foto/doorkijkje-in-het-riet',
permanent: true,
},
{
source: '/foto/1599425615',
destination: '/foto/rustige-zonsondergang',
permanent: true,
},
{
source: '/foto/1599678246',
destination: '/foto/maritiem-district-rotterdam',
permanent: true,
},
{
source: '/foto/1599681864',
destination: '/foto/reflectie',
permanent: true,
},
{
source: '/foto/1599681987',
destination: '/foto/landgoed-staverden',
permanent: true,
},
{
source: '/foto/1599931154',
destination: '/foto/dreigende-luchten-boven-het-botlekgebied',
permanent: true,
},
{
source: '/foto/1599931646',
destination: '/foto/waalbrug-bij-ewijk',
permanent: true,
},
{
source: '/foto/1599940583',
destination: '/foto/hoog-water-in-de-waal',
permanent: true,
},
{
source: '/foto/1600027672',
destination: '/foto/serenity',
permanent: true,
},
{
source: '/foto/1600254766',
destination: '/foto/onder-de-zeelandbrug',
permanent: true,
},
{
source: '/foto/1600254969',
destination: '/foto/duikende-brug',
permanent: true,
},
{
source: '/foto/1600255528',
destination: '/foto/geen-zonsondergang',
permanent: true,
},
{
source: '/foto/1600284373',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1600284491',
destination: '/foto/kinderdijk',
permanent: true,
},
{
source: '/foto/1600344377',
destination: '/foto/besjes-in-het-bos',
permanent: true,
},
{
source: '/foto/1600363688',
destination: '/foto/palendorp-petten-long-exposure',
permanent: true,
},
{
source: '/foto/1600678704',
destination: '/foto/hostel-ani-amp-haakien',
permanent: true,
},
{
source: '/foto/1600681960',
destination: '/foto/ochtendmist',
permanent: true,
},
{
source: '/foto/1600725635',
destination: '/foto/pier-scheveningen',
permanent: true,
},
{
source: '/foto/1600803493',
destination: '/foto/mistige-brug',
permanent: true,
},
{
source: '/foto/1600850610',
destination: '/foto/lighthouse',
permanent: true,
},
{
source: '/foto/1600879524',
destination: '/foto/mistige-morgen',
permanent: true,
},
{
source: '/foto/1601043620',
destination: '/foto/meppen-drenthe',
permanent: true,
},
{
source: '/foto/1601045482',
destination: '/foto/marnehuizen',
permanent: true,
},
{
source: '/foto/1601063773',
destination: '/foto/elfbergen-oudemirdum',
permanent: true,
},
{
source: '/foto/1601106012',
destination: '/foto/retranchement',
permanent: true,
},
{
source: '/foto/1601201264',
destination: '/foto/arendshoofd',
permanent: true,
},
{
source: '/foto/1601281702',
destination: '/foto/kinderdijk-illumination-week-2020',
permanent: true,
},
{
source: '/foto/1601281860',
destination: '/foto/kinderdijk-illumination-week-2020',
permanent: true,
},
{
source: '/foto/1601634438',
destination: '/foto/scheveningen-zuidelijk-havenhoofd',
permanent: true,
},
{
source: '/foto/1601636457',
destination: '/foto/ijsbrekers-marken',
permanent: true,
},
{
source: '/foto/1601636831',
destination: '/foto/stijger-uitdam',
permanent: true,
},
{
source: '/foto/1601637570',
destination: '/foto/langevelderslag',
permanent: true,
},
{
source: '/foto/1601637983',
destination: '/foto/the-lake',
permanent: true,
},
{
source: '/foto/1601733004',
destination: '/foto/wilhelminabrug-deventer',
permanent: true,
},
{
source: '/foto/1601752839',
destination: '/foto/rotterdamse-havens',
permanent: true,
},
{
source: '/foto/1601802358',
destination: '/foto/molen-de-rat-in-ijlst',
permanent: true,
},
{
source: '/foto/1601975113',
destination: '/foto/hofvijver',
permanent: true,
},
{
source: '/foto/1601975278',
destination: '/foto/hofvijver-tijdens-blue-hour',
permanent: true,
},
{
source: '/foto/1602157339',
destination: '/foto/high-trees',
permanent: true,
},
{
source: '/foto/1602158524',
destination: '/foto/landgoed-de-gelder',
permanent: true,
},
{
source: '/foto/1602338843',
destination: '/foto/haven-van-hoorn',
permanent: true,
},
{
source: '/foto/1602760252',
destination: '/foto/warmond-039-t-joppe',
permanent: true,
},
{
source: '/foto/1602760996',
destination: '/foto/storm-op-komst',
permanent: true,
},
{
source: '/foto/1602841453',
destination: '/foto/kasteel-bouvigne',
permanent: true,
},
{
source: '/foto/1602859839',
destination: '/foto/mills-black-amp-white',
permanent: true,
},
{
source: '/foto/1603009992',
destination: '/foto/spoorpark',
permanent: true,
},
{
source: '/foto/1603010358',
destination: '/foto/duinen',
permanent: true,
},
{
source: '/foto/1603015973',
destination: '/foto/hageven-de-plateaux',
permanent: true,
},
{
source: '/foto/1603016350',
destination: '/foto/wildpark-gangelt',
permanent: true,
},
{
source: '/foto/1603016419',
destination: '/foto/wisent',
permanent: true,
},
{
source: '/foto/1603018249',
destination: '/foto/abdijkerk',
permanent: true,
},
{
source: '/foto/1603018576',
destination: '/foto/uitzicht-over-abdij',
permanent: true,
},
{
source: '/foto/1603363719',
destination: '/foto/039-in-the-dutch-mountains-039',
permanent: true,
},
{
source: '/foto/1603373139',
destination: '/foto/wisentbos-in-de-ochtend',
permanent: true,
},
{
source: '/foto/1603373218',
destination: '/foto/wisentbos-in-de-ochtend',
permanent: true,
},
{
source: '/foto/1603373370',
destination: '/foto/wisentbos-in-de-ochtend',
permanent: true,
},
{
source: '/foto/1603373490',
destination: '/foto/elburg-centrum',
permanent: true,
},
{
source: '/foto/1603373987',
destination: '/foto/schokland',
permanent: true,
},
{
source: '/foto/1603375182',
destination: '/foto/dronten',
permanent: true,
},
{
source: '/foto/1603375280',
destination: '/foto/wisentbos',
permanent: true,
},
{
source: '/foto/1603481781',
destination: '/foto/rhenen',
permanent: true,
},
{
source: '/foto/1604775075',
destination: '/foto/radio-kootwijk',
permanent: true,
},
{
source: '/foto/1604839808',
destination: '/foto/zonsondergang-dronten-west',
permanent: true,
},
{
source: '/foto/1604839843',
destination: '/foto/zonsopkomst-dronten',
permanent: true,
},
{
source: '/foto/1605102696',
destination: '/foto/zandwacht',
permanent: true,
},
{
source: '/foto/1605102880',
destination: '/foto/lensball-zandwacht',
permanent: true,
},
{
source: '/foto/1605103328',
destination: '/foto/veerhuis',
permanent: true,
},
{
source: '/foto/1605103606',
destination: '/foto/van-nelle-fabriek-met-lensball',
permanent: true,
},
{
source: '/foto/1605103660',
destination: '/foto/veerhuis',
permanent: true,
},
{
source: '/foto/1605103807',
destination: '/foto/veerhuis',
permanent: true,
},
{
source: '/foto/1605379491',
destination: '/foto/slochterbos',
permanent: true,
},
{
source: '/foto/1605379629',
destination: '/foto/prachtige-herfstkleuren-in-het-slochterbos',
permanent: true,
},
{
source: '/foto/1605379720',
destination: '/foto/het-eikelhuisje-in-het-slochterbos',
permanent: true,
},
{
source: '/foto/1605416878',
destination: '/foto/vreeswijk',
permanent: true,
},
{
source: '/foto/1605436479',
destination: '/foto/prachtige-zonsopkomst-bij-de-witte-molen',
permanent: true,
},
{
source: '/foto/1605557161',
destination: '/foto/strand-petten',
permanent: true,
},
{
source: '/foto/1605704599',
destination: '/foto/oude-loods',
permanent: true,
},
{
source: '/foto/1605704737',
destination: '/foto/trap-met-balustrade-helaas-niet-meer-in-deze-staat-te-fotograferen',
permanent: true,
},
{
source: '/foto/1606049475',
destination: '/foto/hemrik-in-herfstsferen',
permanent: true,
},
{
source: '/foto/1606063368',
destination: '/foto/sleipnir',
permanent: true,
},
{
source: '/foto/1606154861',
destination: '/foto/fietsbrug-tegenbosch',
permanent: true,
},
{
source: '/foto/1606154954',
destination: '/foto/fietsbrug-tegenbosch',
permanent: true,
},
{
source: '/foto/1606166586',
destination: '/foto/terugtrekkend-zeewater',
permanent: true,
},
{
source: '/foto/1606166715',
destination: '/foto/palendorp-in-tegenlicht',
permanent: true,
},
{
source: '/foto/1607195182',
destination: '/foto/la-defense-in-almere',
permanent: true,
},
{
source: '/foto/1607195289',
destination: '/foto/la-defense-in-almere-2',
permanent: true,
},
{
source: '/foto/1607252997',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1607257556',
destination: '/foto/reflections',
permanent: true,
},
{
source: '/foto/1607809297',
destination: '/foto/roptazijl',
permanent: true,
},
{
source: '/foto/1607856178',
destination: '/foto/thialf',
permanent: true,
},
{
source: '/foto/1608235012',
destination: '/foto/noordaa',
permanent: true,
},
{
source: '/foto/1608271927',
destination: '/foto/malpie-valkenswaard',
permanent: true,
},
{
source: '/foto/1608459307',
destination: '/foto/uitzicht-vanuit-een-vogelspot-plekje',
permanent: true,
},
{
source: '/foto/1608459510',
destination: '/foto/zonsopkomst',
permanent: true,
},
{
source: '/foto/1608463423',
destination: '/foto/vlieland-noordzeestrand',
permanent: true,
},
{
source: '/foto/1608465825',
destination: '/foto/de-bijenkorf-den-haag',
permanent: true,
},
{
source: '/foto/1608465991',
destination: '/foto/haagsche-sfeertjes',
permanent: true,
},
{
source: '/foto/1608466177',
destination: '/foto/haagsche-sfeertjes',
permanent: true,
},
{
source: '/foto/1608466273',
destination: '/foto/haasche-sfeertjes',
permanent: true,
},
{
source: '/foto/1608466487',
destination: '/foto/haagsche-sfeeertjes',
permanent: true,
},
{
source: '/foto/1608466741',
destination: '/foto/haagsche-sfeertjes',
permanent: true,
},
{
source: '/foto/1608467205',
destination: '/foto/amsterdamse-sfeertjes',
permanent: true,
},
{
source: '/foto/1608467283',
destination: '/foto/amsterdamse-sfeertjes',
permanent: true,
},
{
source: '/foto/1608467607',
destination: '/foto/amsterdamse-sfeertjes',
permanent: true,
},
{
source: '/foto/1608636830',
destination: '/foto/trap-kwintelooien',
permanent: true,
},
{
source: '/foto/1608658919',
destination: '/foto/geopende-stadsbrug-te-kampen',
permanent: true,
},
{
source: '/foto/1608659151',
destination: '/foto/geopende-stadsbrug-te-kampen',
permanent: true,
},
{
source: '/foto/1608824074',
destination: '/foto/ijskoude-ochtend',
permanent: true,
},
{
source: '/foto/1608824321',
destination: '/foto/de-eenzame-boom',
permanent: true,
},
{
source: '/foto/1608826051',
destination: '/foto/rust',
permanent: true,
},
{
source: '/foto/1608892854',
destination: '/foto/vlieland',
permanent: true,
},
{
source: '/foto/1608973066',
destination: '/foto/vlieland',
permanent: true,
},
{
source: '/foto/1609065959',
destination: '/foto/interpolis-tilburg',
permanent: true,
},
{
source: '/foto/1609082661',
destination: '/foto/stadspoort-van-hattem',
permanent: true,
},
{
source: '/foto/1609082763',
destination: '/foto/stadspoort-van-hattem',
permanent: true,
},
{
source: '/foto/1609082993',
destination: '/foto/stadspoort-van-hattem',
permanent: true,
},
{
source: '/foto/1609336197',
destination: '/foto/wrak-captain-a-duffy',
permanent: true,
},
{
source: '/foto/1609336500',
destination: '/foto/de-ospelse-peel',
permanent: true,
},
{
source: '/foto/1609336573',
destination: '/foto/ochtend-gloren',
permanent: true,
},
{
source: '/foto/1609336726',
destination: '/foto/moerputtenbrug',
permanent: true,
},
{
source: '/foto/1609430435',
destination: '/foto/spiegel-eiland',
permanent: true,
},
{
source: '/foto/1609430597',
destination: '/foto/vissersbootjes-aan-de-steiger',
permanent: true,
},
{
source: '/foto/1609539600',
destination: '/foto/zoutkamp',
permanent: true,
},
{
source: '/foto/1609539650',
destination: '/foto/zoutkamp',
permanent: true,
},
{
source: '/foto/1609540120',
destination: '/foto/hoorn',
permanent: true,
},
{
source: '/foto/1609697316',
destination: '/foto/pinky-morning-mate',
permanent: true,
},
{
source: '/foto/1609786399',
destination: '/foto/vuurtoren-breskens',
permanent: true,
},
{
source: '/foto/1609787060',
destination: '/foto/de-grote-ark',
permanent: true,
},
{
source: '/foto/1609789017',
destination: '/foto/zonsondergang-in-nieuwvliet',
permanent: true,
},
{
source: '/foto/1610037734',
destination: '/foto/kerk-aan-zee',
permanent: true,
},
{
source: '/foto/1610394570',
destination: '/foto/haventje-van-goes',
permanent: true,
},
{
source: '/foto/1610394878',
destination: '/foto/vervallen-huisje',
permanent: true,
},
{
source: '/foto/1610532037',
destination: '/foto/erasmusbrug-at-sunrise',
permanent: true,
},
{
source: '/foto/1610532454',
destination: '/foto/rust-in-rotterdam',
permanent: true,
},
{
source: '/foto/1610569974',
destination: '/foto/hoofdtoren',
permanent: true,
},
{
source: '/foto/1610570437',
destination: '/foto/oosterpoort',
permanent: true,
},
{
source: '/foto/1610570729',
destination: '/foto/molen-aan-de-zuiderdijk',
permanent: true,
},
{
source: '/foto/1610827756',
destination: '/foto/de-rotterdam',
permanent: true,
},
{
source: '/foto/1611166222',
destination: '/foto/vissersnetten-aan-de-ijsselmeerdijk',
permanent: true,
},
{
source: '/foto/1611266517',
destination: '/foto/heerema',
permanent: true,
},
{
source: '/foto/1611266655',
destination: '/foto/uitzichttoren-landtong',
permanent: true,
},
{
source: '/foto/1611266698',
destination: '/foto/crane',
permanent: true,
},
{
source: '/foto/1611266803',
destination: '/foto/oisterwijkse-ven',
permanent: true,
},
{
source: '/foto/1611266862',
destination: '/foto/rode-borst',
permanent: true,
},
{
source: '/foto/1611431467',
destination: '/foto/erasmusbrug',
permanent: true,
},
{
source: '/foto/1611619866',
destination: '/foto/rechtbank-zutphen',
permanent: true,
},
{
source: '/foto/1611784452',
destination: '/foto/kerk-wierum',
permanent: true,
},
{
source: '/foto/1611784682',
destination: '/foto/wad-moddergat',
permanent: true,
},
{
source: '/foto/1611784997',
destination: '/foto/wad-oosterbierum',
permanent: true,
},
{
source: '/foto/1611785040',
destination: '/foto/wad-oosterbierum',
permanent: true,
},
{
source: '/foto/1611954587',
destination: '/foto/thialf-amp-sleipnir',
permanent: true,
},
{
source: '/foto/1612642615',
destination: '/foto/sunset',
permanent: true,
},
{
source: '/foto/1612977524',
destination: '/foto/green-lantern',
permanent: true,
},
{
source: '/foto/1612987168',
destination: '/foto/passing-stuw-hagestein',
permanent: true,
},
{
source: '/foto/1613071396',
destination: '/foto/the-old-land',
permanent: true,
},
{
source: '/foto/1613121249',
destination: '/foto/layers',
permanent: true,
},
{
source: '/foto/1613164018',
destination: '/foto/schaatsers-op-de-belterwiede',
permanent: true,
},
{
source: '/foto/1613333131',
destination: '/foto/sunrise-at-a-cold-morning',
permanent: true,
},
{
source: '/foto/1613410432',
destination: '/foto/039-tunnel-vision-039',
permanent: true,
},
{
source: '/foto/1613410907',
destination: '/foto/stuw-bij-driel',
permanent: true,
},
{
source: '/foto/1613473215',
destination: '/foto/staircase-2',
permanent: true,
},
{
source: '/foto/1613481502',
destination: '/foto/paar-van-marken',
permanent: true,
},
{
source: '/foto/1613481724',
destination: '/foto/zonnestralen-in-het-bos',
permanent: true,
},
{
source: '/foto/1613481847',
destination: '/foto/bos',
permanent: true,
},
{
source: '/foto/1613499486',
destination: '/foto/booreiland-in-de-haven-van-ijmuiden',
permanent: true,
},
{
source: '/foto/1613499646',
destination: '/foto/kleine-strand-ijmuiden',
permanent: true,
},
{
source: '/foto/1613501615',
destination: '/foto/quot-golden-gate-vom-niederrhein-quot',
permanent: true,
},
{
source: '/foto/1613504010',
destination: '/foto/sluizen-van-amerongen',
permanent: true,
},
{
source: '/foto/1613672204',
destination: '/foto/wijchens-meer',
permanent: true,
},
{
source: '/foto/1613672506',
destination: '/foto/kasteel-hernen',
permanent: true,
},
{
source: '/foto/1613678603',
destination: '/foto/provinciehuis',
permanent: true,
},
{
source: '/foto/1613910336',
destination: '/foto/hembrug-terrein',
permanent: true,
},
{
source: '/foto/1613910463',
destination: '/foto/oude-loods',
permanent: true,
},
{
source: '/foto/1613936627',
destination: '/foto/sundown-at-schildmeer',
permanent: true,
},
{
source: '/foto/1614115190',
destination: '/foto/zonsopkomst',
permanent: true,
},
{
source: '/foto/1614363277',
destination: '/foto/botlekbrug',
permanent: true,
},
{
source: '/foto/1614503498',
destination: '/foto/sportcomplex',
permanent: true,
},
{
source: '/foto/1614540246',
destination: '/foto/schotse-hooglander-scherpe-hoorns',
permanent: true,
},
{
source: '/foto/1614540327',
destination: '/foto/close-up-van-een-schotse-hooglander',
permanent: true,
},
{
source: '/foto/1614540458',
destination: '/foto/mooie-close-up-van-een-schotse-hooglander',
permanent: true,
},
{
source: '/foto/1614917957',
destination: '/foto/kasteel-renswoude',
permanent: true,
},
{
source: '/foto/1615022237',
destination: '/foto/spoorweghaven',
permanent: true,
},
{
source: '/foto/1615036763',
destination: '/foto/039-too-many-lines-lead-to-heaven-039',
permanent: true,
},
{
source: '/foto/1615114301',
destination: '/foto/rotterdam-vanaf-schiedam',
permanent: true,
},
{
source: '/foto/1615114933',
destination: '/foto/schotse-hooglander',
permanent: true,
},
{
source: '/foto/1615146746',
destination: '/foto/zicht-op-de-grote-kerk-in-blokzijl',
permanent: true,
},
{
source: '/foto/1615197197',
destination: '/foto/molen-039-t-hoog-en-groenland',
permanent: true,
},
{
source: '/foto/1615197469',
destination: '/foto/molen-039-t-hoog-en-groenland',
permanent: true,
},
{
source: '/foto/1615217351',
destination: '/foto/de-vrijstaande-kerktoren-van-oosterwierum',
permanent: true,
},
{
source: '/foto/1615407326',
destination: '/foto/port-zelande',
permanent: true,
},
{
source: '/foto/1615811485',
destination: '/foto/bruggetje-sonsbeekpark',
permanent: true,
},
{
source: '/foto/1615811579',
destination: '/foto/reiger-sonsbeekpark',
permanent: true,
},
{
source: '/foto/1615824810',
destination: '/foto/039-gone-fishing-039',
permanent: true,
},
{
source: '/foto/1615978489',
destination: '/foto/wild-ijs-op-het-markermeer',
permanent: true,
},
{
source: '/foto/1615979389',
destination: '/foto/mistige-brug',
permanent: true,
},
{
source: '/foto/1616230522',
destination: '/foto/bergkerk-deventer',
permanent: true,
},
{
source: '/foto/1616257433',
destination: '/foto/boomstam-spookje',
permanent: true,
},
{
source: '/foto/1616273542',
destination: '/foto/valkenswaard-malpie',
permanent: true,
},
{
source: '/foto/1616349250',
destination: '/foto/039-calling-all-stations-039',
permanent: true,
},
{
source: '/foto/1616408374',
destination: '/foto/17th-century-windmills',
permanent: true,
},
{
source: '/foto/1616522563',
destination: '/foto/landgoed-en-bodega-salentein',
permanent: true,
},
{
source: '/foto/1616665500',
destination: '/foto/kraanschip-bij-zonsondergang',
permanent: true,
},
{
source: '/foto/1616666836',
destination: '/foto/eekhoorn',
permanent: true,
},
{
source: '/foto/1616871348',
destination: '/foto/watertoren-de-esch-rotterdam',
permanent: true,
},
{
source: '/foto/1616872959',
destination: '/foto/ss-rotterdam',
permanent: true,
},
{
source: '/foto/1616879770',
destination: '/foto/palendorp-laag-perspectief',
permanent: true,
},
{
source: '/foto/1617615439',
destination: '/foto/de-helper',
permanent: true,
},
{
source: '/foto/1617615617',
destination: '/foto/jozefkerk-assen',
permanent: true,
},
{
source: '/foto/1618009494',
destination: '/foto/ijsselbrug-bij-zonsondergang',
permanent: true,
},
{
source: '/foto/1618009636',
destination: '/foto/avond-in-elburg',
permanent: true,
},
{
source: '/foto/1618139096',
destination: '/foto/stormvloedkering',
permanent: true,
},
{
source: '/foto/1618139194',
destination: '/foto/de-kering-bij-storm',
permanent: true,
},
{
source: '/foto/1618303698',
destination: '/foto/stelledam',
permanent: true,
},
{
source: '/foto/1618304228',
destination: '/foto/rockanje',
permanent: true,
},
{
source: '/foto/1618304512',
destination: '/foto/zonondergang',
permanent: true,
},
{
source: '/foto/1618344541',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1618751435',
destination: '/foto/verlaten-fabriek',
permanent: true,
},
{
source: '/foto/1618751837',
destination: '/foto/vervallen-fabriek-ter-apel',
permanent: true,
},
{
source: '/foto/1618932284',
destination: '/foto/terp-hogebeintum',
permanent: true,
},
{
source: '/foto/1618937972',
destination: '/foto/ochtend-mist',
permanent: true,
},
{
source: '/foto/1618942097',
destination: '/foto/t-nije-hemelriek',
permanent: true,
},
{
source: '/foto/1619026065',
destination: '/foto/de-zon-komt-op',
permanent: true,
},
{
source: '/foto/1619031185',
destination: '/foto/riff-pd-18245',
permanent: true,
},
{
source: '/foto/1619093449',
destination: '/foto/ouddorp',
permanent: true,
},
{
source: '/foto/1619093527',
destination: '/foto/ouddorp',
permanent: true,
},
{
source: '/foto/1619110340',
destination: '/foto/039-i-fell-for-the-waterfall-039',
permanent: true,
},
{
source: '/foto/1619445498',
destination: '/foto/zonsopkomst',
permanent: true,
},
{
source: '/foto/1619457996',
destination: '/foto/pingjum',
permanent: true,
},
{
source: '/foto/1619458811',
destination: '/foto/stokkenbrug',
permanent: true,
},
{
source: '/foto/1619515644',
destination: '/foto/tulpenveld-in-een',
permanent: true,
},
{
source: '/foto/1619515742',
destination: '/foto/tulpenveld-in-een',
permanent: true,
},
{
source: '/foto/1619515820',
destination: '/foto/tulpenveld-in-een',
permanent: true,
},
{
source: '/foto/1619860697',
destination: '/foto/kunstmuseum-den-haag',
permanent: true,
},
{
source: '/foto/1619959062',
destination: '/foto/039-one-minute-passing-by-039',
permanent: true,
},
{
source: '/foto/1619961300',
destination: '/foto/zonsondergang-in-brandevoort',
permanent: true,
},
{
source: '/foto/1619961373',
destination: '/foto/winter-fairy-tale',
permanent: true,
},
{
source: '/foto/1620134778',
destination: '/foto/blije-dames-weer-voor-het-eerst-naar-buiten',
permanent: true,
},
{
source: '/foto/1620150551',
destination: '/foto/drunnense-duinen',
permanent: true,
},
{
source: '/foto/1620150763',
destination: '/foto/spoorzone-tilburg',
permanent: true,
},
{
source: '/foto/1620151318',
destination: '/foto/cadettenkamp-teteringen',
permanent: true,
},
{
source: '/foto/1620652848',
destination: '/foto/stelledam',
permanent: true,
},
{
source: '/foto/1620674904',
destination: '/foto/quot-early-view-on-deventer-skyline-quot',
permanent: true,
},
{
source: '/foto/1621249009',
destination: '/foto/het-kromme-zwaard-van-oss',
permanent: true,
},
{
source: '/foto/1621268975',
destination: '/foto/groen-genieten',
permanent: true,
},
{
source: '/foto/1621269135',
destination: '/foto/walking-between-bees',
permanent: true,
},
{
source: '/foto/1621340825',
destination: '/foto/inntel-hotel-zaandam',
permanent: true,
},
{
source: '/foto/1621870013',
destination: '/foto/voorste-goorven-oisterwijk',
permanent: true,
},
{
source: '/foto/1622648361',
destination: '/foto/rhenen',
permanent: true,
},
{
source: '/foto/1623257852',
destination: '/foto/039-clutching-at-straws-039',
permanent: true,
},
{
source: '/foto/1623422468',
destination: '/foto/cloudy-day',
permanent: true,
},
{
source: '/foto/1623764362',
destination: '/foto/fontein',
permanent: true,
},
{
source: '/foto/1623764653',
destination: '/foto/binnen-in-de-grote-kerk-in-oss',
permanent: true,
},
{
source: '/foto/1623765128',
destination: '/foto/broek-in-waterland',
permanent: true,
},
{
source: '/foto/1623765293',
destination: '/foto/kasteel-cannenburgh',
permanent: true,
},
{
source: '/foto/1623765542',
destination: '/foto/afas-theater-wereldbol',
permanent: true,
},
{
source: '/foto/1624203387',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1624204495',
destination: '/foto/leersumse-veld',
permanent: true,
},
{
source: '/foto/1624205927',
destination: '/foto/heidestein-zeist',
permanent: true,
},
{
source: '/foto/1624206001',
destination: '/foto/heideveld-op-landgoed-heidestein-en-bornia',
permanent: true,
},
{
source: '/foto/1624206769',
destination: '/foto/heideveld-op-landgoed-heidestein-en-bornia',
permanent: true,
},
{
source: '/foto/1624207523',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624346341',
destination: '/foto/uitkijktoren-in-de-kaapse-bossen',
permanent: true,
},
{
source: '/foto/1624346810',
destination: '/foto/park-kasteel-groeneveld',
permanent: true,
},
{
source: '/foto/1624346894',
destination: '/foto/winters-tafereel',
permanent: true,
},
{
source: '/foto/1624346998',
destination: '/foto/kasteel-groeneveld-baarn',
permanent: true,
},
{
source: '/foto/1624347089',
destination: '/foto/kasteel-groeneveld',
permanent: true,
},
{
source: '/foto/1624350954',
destination: '/foto/stille-kern-zeewolde',
permanent: true,
},
{
source: '/foto/1624351099',
destination: '/foto/stille-kern-zeewolde',
permanent: true,
},
{
source: '/foto/1624351136',
destination: '/foto/de-stille-kern-zeewolde',
permanent: true,
},
{
source: '/foto/1624351207',
destination: '/foto/stille-kern-zeewolde',
permanent: true,
},
{
source: '/foto/1624351268',
destination: '/foto/stille-kern-zeewolde',
permanent: true,
},
{
source: '/foto/1624352155',
destination: '/foto/tulp-eiland-zeewolde',
permanent: true,
},
{
source: '/foto/1624352210',
destination: '/foto/tulp-eiland-zeewolde',
permanent: true,
},
{
source: '/foto/1624352300',
destination: '/foto/tulp-eiland-zeewolde',
permanent: true,
},
{
source: '/foto/1624364725',
destination: '/foto/lepelaar-op-het-wad',
permanent: true,
},
{
source: '/foto/1624384379',
destination: '/foto/barneveld-klein-bylaer',
permanent: true,
},
{
source: '/foto/1624386649',
destination: '/foto/sanatorium-zonnestraal',
permanent: true,
},
{
source: '/foto/1624386821',
destination: '/foto/kasteel-de-haar',
permanent: true,
},
{
source: '/foto/1624386980',
destination: '/foto/kasteel-renswoude',
permanent: true,
},
{
source: '/foto/1624387023',
destination: '/foto/kasteel-renswoude',
permanent: true,
},
{
source: '/foto/1624387202',
destination: '/foto/amsterdamse-waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1624387385',
destination: '/foto/amsterdamse-waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1624448617',
destination: '/foto/arkemheem-nijkerk',
permanent: true,
},
{
source: '/foto/1624448684',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624448743',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624453495',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624453552',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624453636',
destination: '/foto/arkemheem',
permanent: true,
},
{
source: '/foto/1624454420',
destination: '/foto/millingerwaard',
permanent: true,
},
{
source: '/foto/1624539989',
destination: '/foto/amsterdamse-waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1624540099',
destination: '/foto/amsterdamse-waterleidingduinen-vogelenzang',
permanent: true,
},
{
source: '/foto/1624540302',
destination: '/foto/kasteel-de-cannenburgh-vaassen',
permanent: true,
},
{
source: '/foto/1624540359',
destination: '/foto/kasteel-de-cannenburgh-vaassen',
permanent: true,
},
{
source: '/foto/1624540443',
destination: '/foto/kasteel-de-cannenburgh-vaassen',
permanent: true,
},
{
source: '/foto/1624540524',
destination: '/foto/kasteel-de-cannenburgh-vaassen',
permanent: true,
},
{
source: '/foto/1624540934',
destination: '/foto/rijnhaven',
permanent: true,
},
{
source: '/foto/1624541079',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541116',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541227',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541332',
destination: '/foto/markthal-rotterdam',
permanent: true,
},
{
source: '/foto/1624541414',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541460',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541516',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541577',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624541791',
destination: '/foto/witte-huis-wijnhaven',
permanent: true,
},
{
source: '/foto/1624541997',
destination: '/foto/blaakse-bos-kubuswoningen',
permanent: true,
},
{
source: '/foto/1624542102',
destination: '/foto/blaak-kubuswoningen',
permanent: true,
},
{
source: '/foto/1624542152',
destination: '/foto/blaak-kubuswoningen',
permanent: true,
},
{
source: '/foto/1624542395',
destination: '/foto/delftse-poort-rotterdam',
permanent: true,
},
{
source: '/foto/1624554274',
destination: '/foto/039-a-touch-of-nature-039',
permanent: true,
},
{
source: '/foto/1624624792',
destination: '/foto/bergen-op-zoom',
permanent: true,
},
{
source: '/foto/1624624892',
destination: '/foto/fort-roovere-bergen-op-zoom',
permanent: true,
},
{
source: '/foto/1624698029',
destination: '/foto/amsterdamse-waterleidingduinen',
permanent: true,
},
{
source: '/foto/1624698082',
destination: '/foto/amsterdamse-waterleidingduinen',
permanent: true,
},
{
source: '/foto/1624698563',
destination: '/foto/fort-roovere-bergen-op-zoom',
permanent: true,
},
{
source: '/foto/1624698731',
destination: '/foto/fort-roovere-bergen-op-zoom',
permanent: true,
},
{
source: '/foto/1624698824',
destination: '/foto/fort-roovere-bergen-op-zoom',
permanent: true,
},
{
source: '/foto/1624699425',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624699504',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624699559',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624699999',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624700081',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624700171',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624700538',
destination: '/foto/hoorneboegse-heide',
permanent: true,
},
{
source: '/foto/1624700740',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624701070',
destination: '/foto/rotterdam',
permanent: true,
},
{
source: '/foto/1624701792',
destination: '/foto/coelhorst-hoogland',
permanent: true,
},
{
source: '/foto/1624702106',
destination: '/foto/coelhorst-hoogland',
permanent: true,
},
{
source: '/foto/1624702141',
destination: '/foto/coelhorst-hoogland',
permanent: true,
},
{
source: '/foto/1624702186',
destination: '/foto/coelhorst-hoogland',
permanent: true,
},
{
source: '/foto/1624702221',
destination: '/foto/coelhorst-hoogland',
permanent: true,
},
{
source: '/foto/1624727166',
destination: '/foto/den-treek-leusden',
permanent: true,
},
{
source: '/foto/1624799933',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800048',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800090',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800141',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800222',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800294',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800345',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800399',
destination: '/foto/blauwe-kamer',
permanent: true,
},
{
source: '/foto/1624800735',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1624800828',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1624800898',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1624800958',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1624801012',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1624801047',
destination: '/foto/rhenen-grebbeberg',
permanent: true,
},
{
source: '/foto/1625337247',
destination: '/foto/basilica-minor',
permanent: true,
},
{
source: '/foto/1625422395',
destination: '/foto/039-here-comes-the-sun-039',
permanent: true,
},
{
source: '/foto/1626420820',
destination: '/foto/hunebed-d15',
permanent: true,
},
{
source: '/foto/1626421529',
destination: '/foto/hunebed-d27-borger',
permanent: true,
},
{
source: '/foto/1626422249',
destination: '/foto/hunebed-d17-rolde',
permanent: true,
},
{
source: '/foto/1626422359',
destination: '/foto/rolde',
permanent: true,
},
{
source: '/foto/1626422418',
destination: '/foto/rolde',
permanent: true,
},
{
source: '/foto/1626424646',
destination: '/foto/hunebed-d16-balloo',
permanent: true,
},
{
source: '/foto/1626424728',
destination: '/foto/balloo',
permanent: true,
},
{
source: '/foto/1627211138',
destination: '/foto/hurkende-man',
permanent: true,
},
{
source: '/foto/1627211205',
destination: '/foto/hurkende-man-lelystad',
permanent: true,
},
{
source: '/foto/1627211277',
destination: '/foto/de-hurkende-man',
permanent: true,
},
{
source: '/foto/1627211539',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627211676',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627211840',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627211882',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627211937',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627226062',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226270',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226305',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226356',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226454',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226504',
destination: '/foto/kluizenaarsgrot-met-doolhof-op-de-paltz',
permanent: true,
},
{
source: '/foto/1627226581',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627226641',
destination: '/foto/landgoed-de-paltz',
permanent: true,
},
{
source: '/foto/1627229382',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627229427',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627229493',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627229531',
destination: '/foto/natuurpark-lelystad',
permanent: true,
},
{
source: '/foto/1627230917',
destination: '/foto/graftombe-van-nellesteyn',
permanent: true,
},
{
source: '/foto/1627231260',
destination: '/foto/folly-uilentoren-op-de-lombokheuvel',
permanent: true,
},
{
source: '/foto/1627231350',
destination: '/foto/kasteel-broekhuizen',
permanent: true,
},
{
source: '/foto/1627231401',
destination: '/foto/kasteel-broekhuizen',
permanent: true,
},
{
source: '/foto/1627231761',
destination: '/foto/graftombe-van-nellesteyn',
permanent: true,
},
{
source: '/foto/1627249884',
destination: '/foto/zonsondergang',
permanent: true,
},
{
source: '/foto/1627250039',
destination: '/foto/bootje-cornwerd',
permanent: true,
},
{
source: '/foto/1627748545',
destination: '/foto/rust',
permanent: true,
},
{
source: '/foto/1627857091',
destination: '/foto/forum-groningen',
permanent: true,
},
{
source: '/foto/1627883618',
destination: '/foto/provincie-huis-groningen',
permanent: true,
},
{
source: '/foto/1628018643',
destination: '/foto/rietveldse-molen',
permanent: true,
},
{
source: '/foto/1628180591',
destination: '/foto/steiger',
permanent: true,
},
    ]
  },
});
