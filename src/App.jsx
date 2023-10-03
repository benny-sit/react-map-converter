import { Suspense, lazy, useState } from 'react';
import Select from 'react-select';
import { ALL_CURRENCIES } from './assets/constants';
import Header from './components/ui/Header';
import News from './components/News';
import Footer from './components/ui/Footer';
// import MapChart from './components/MapChart';
import { ISO3 } from './assets/constants';

const MapChart = lazy(() => import('./components/MapChart'));
const TooltipsWithConversion = lazy(() =>
  import('./components/TooltipsWithConversion')
);

const ALL_CURRENCIES_SELECT = ALL_CURRENCIES.map((c) => ({
  value: {
    currency: c,
    country: ISO3.find((country) => country.currencyCode === c)?.iso3,
  },
  label: c,
}));

const LoadingMap = () => (
  <div className="w-full relative aspect-[881/661] grid place-content-center place-items-center">
    <div className="inset-0 absolute animate-transform-x-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-5 before:sm:w-10 before:bg-slate-200 before:animate-pulse before:blur-md"></div>
  </div>
);

const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

function App() {
  const [convertAmount, setConvertAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCountry, setSelectedCountry] = useState('USA');

  function handleSelectChange(selected) {
    console.log(selected);
    setSelectedCurrency(selected.value.currency);
    setSelectedCountry(selected.value.country);
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-2 sm:px-0 w-full mt-8 flex flex-col sm:flex-row justify-center items-stretch gap-2">
        <div className="relative self-stretch">
          <input
            type="number"
            placeholder="1"
            min={0}
            className="border-2 rounded outline-none self-stretch h-full focus:border-slate-300 px-2 py-1 text-gray-800"
            value={convertAmount}
            onChange={(e) => setConvertAmount(e.target.value)}
          />
          <span className="absolute -top-4 left-0 text-xs font-bold text-gray-500">
            your currency:
          </span>
        </div>
        <Select
          unstyled
          classNames={{
            control: () =>
              'border-2 focus-within:border-slate-300 rounded-md bg-white hover:cursor-pointer',
            valueContainer: () => 'px-2',
            indicatorsContainer: () => 'p-1 gap-1',
            indicatorSeparator: () => 'bg-gray-300',
            dropdownIndicator: () =>
              'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black',
            menu: () => 'p-1 mt-2 border border-gray-200 bg-white rounded-md',
            option: ({ isSelected }) =>
              `$'hover:cursor-pointer px-3 py-2 rounded focus:bg-gray-100 active:bg-gray-200' ${
                (isSelected && 'bg-blue-200') || 'hover:bg-gray-50'
              }`,
            noOptionsMessage: () => noOptionsMessageStyles,
          }}
          options={ALL_CURRENCIES_SELECT}
          defaultValue={{ value: 'USD', label: 'USD' }}
          onChange={handleSelectChange}
        />
      </div>
      <div
        className="max-w-4xl mx-auto border-8 rounded-xl mt-8 overflow-hidden"
        id="map"
      >
        <Suspense fallback={<LoadingMap />}>
          <MapChart setSelectedCountry={setSelectedCountry} />
        </Suspense>
        <Suspense fallback={null}>
          <TooltipsWithConversion
            selectedAmount={convertAmount}
            selectedCurrency={selectedCurrency}
          />
        </Suspense>
      </div>
      <News selectedCountry={selectedCountry} />
      <Footer />
    </>
  );
}

export default App;
