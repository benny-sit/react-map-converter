import { useEffect, useState } from 'react';
import { ISO3 } from '../assets/constants';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const customPlacement = {
  USA: 'bottom-start',
  RUS: 'bottom-end',
};

const TooltipsWithConversion = ({
  selectedCurrency = 'USD',
  selectedAmount = 1,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversionRate, setConversionRate] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${import.meta.env.VITE_REDIS_URL}/conversion/${(
      selectedCurrency || ''
    ).toUpperCase()}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ans = await fetch(url, { signal: abortController.signal }).then(
          (data) => data.json()
        );

        setConversionRate(ans.conversion_rates || {});
      } catch (e) {
        console.log('ERROR CANT LOAD CONVERSION RATES');
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [selectedCurrency]);

  return (
    <>
      {ISO3.map((i) => (
        <ReactTooltip
          key={i.iso3}
          id={`map-${i.iso3}`}
          place={customPlacement[i.iso3] || 'top'}
        >
          <div className="flex flex-col ">
            <span className="font-bold">{i.country}</span>
            <span>
              ≈{' '}
              {isLoading
                ? 'loading...'
                : parseFloat(
                    (conversionRate[i.currencyCode] * selectedAmount).toFixed(3)
                  ) || 'no rate'}{' '}
              {i.currencyCode}
            </span>
          </div>
        </ReactTooltip>
      ))}
    </>
  );
};

export default TooltipsWithConversion;
