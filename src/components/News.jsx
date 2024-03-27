import { useEffect, useMemo, useState } from 'react';
import Card from './ui/Card';
import FakeCard from './ui/FakeCard';
import { ISO3, NEWS_API_ISO2 } from '../assets/constants';

function News({ selectedCountry }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);

  const iso2 = useMemo(() => {
    return ISO3.find(
      (c) => c.iso3 === selectedCountry
    )?.iso2.toLocaleLowerCase();
  }, [selectedCountry]);

  useEffect(() => {
    const abortController = new AbortController();

    if (!NEWS_API_ISO2.includes(iso2)) {
      setIsError(true);
      setArticles([]);
      return;
    }

    const url = `${import.meta.env.VITE_REDIS_URL}/news/${iso2}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ans = await fetch(url, { signal: abortController.signal }).then(
          (data) => data.json()
        );

        setArticles(ans.articles || []);
        setIsError(false);
      } catch (error) {
        console.log('ERROR GETTING ARTICLES', error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  return (
    <section
      id="news"
      className="bg-gray-50 w-full mt-10 pt-6 pb-8"
      aria-labelledby="home-news"
    >
      <div className="max-w-4xl mx-auto px-2 relative animate-transform-y-minus-full">
        <h2 className="text-2xl font-semibold -mt-3 " id="home-news">
          News{' '}
          <span className="font-bold text-base text-gray-500/60 inline-block py-2 px-3 bg-slate-50 rounded-md">
            {iso2?.toUpperCase()}
          </span>
        </h2>
        <span className="w-14 h-1 scale-x-0 rounded-full absolute bottom-0 left-2 bg-blue-400 animate-scale-x-full origin-left"></span>
      </div>
      <div className="max-w-4xl grid grid-cols-1 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 gap-4 mx-auto px-2 justify-items-center place-content-center relative">
        {articles?.length > 0 && !isLoading ? (
          articles.map((article, idx) => (
            <Card key={article?.url + idx} article={article} />
          ))
        ) : (
          <>
            <FakeCard isPulsing={!isError} />
            <FakeCard isPulsing={!isError} />
            <FakeCard isPulsing={!isError} />
          </>
        )}
        {isError && (
          <div className="absolute top-20 left-40 right-40 py-3 px-4 text-center border-b-red-400 border-b-4 bg-white rounded-lg text-xl font-bold text-gray-600">
            Our Api Not Supports News For - <span>{iso2?.toUpperCase()}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default News;
