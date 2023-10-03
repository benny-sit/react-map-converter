import fs from 'fs';

const cities = JSON.parse(
  fs.readFileSync('./public/worldcities_all.json', 'utf8')
);
const iso2ToCurrency = JSON.parse(
  fs.readFileSync('./public/iso2_to_currency.json', 'utf8')
);

const onlyCapitals = cities
  .filter((c) => c.capital === 'primary')
  .map((c) => ({ ...c, coordinates: [c.lng, c.lat] }));

onlyCapitals.forEach((c) => {
  c.currencyCode = (
    iso2ToCurrency.find((cur) => cur.CountryCode === c.iso2) || {}
  ).Code;
  delete c.lat;
  delete c.lng;
  delete c.capital;
});

fs.writeFileSync(
  './public/worldcities_capitals.json',
  JSON.stringify(onlyCapitals)
);
fs.writeFileSync(
  './public/world_iso3.json',
  JSON.stringify(
    [...new Set(onlyCapitals.map((c) => c.iso3))].map((c) => {
      const city = onlyCapitals.find((country) => country.iso3 === c);
      return {
        iso3: c,
        iso2: city.iso2,
        currencyCode: city.currencyCode,
        country: city.country,
      };
    })
  )
);
fs.writeFileSync(
  './public/currency_codes.json',
  JSON.stringify([...new Set(iso2ToCurrency.map((c) => c.Code))])
);
