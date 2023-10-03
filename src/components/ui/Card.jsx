import timeOutline from '/imgs/ion_time-outline.svg';
import imgIcon from '/imgs/image-icon.svg';
import arrowRightIcon from '/imgs/arrow-right.svg';

import dayjs from 'dayjs';
import relativeTIme from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTIme);

function Card({ article }) {
  return (
    <a
      target="_blank"
      href={article?.url || '#'}
      className="max-w-[400px] w-full relative p-3 bg-white rounded-3xl flex flex-col gap-2 text-xs group/card contain-layout overflow-hidden self-start"
      rel="noreferrer"
    >
      <div className="relative aspect-video w-full bg-gray-100 rounded-lg grid place-items-center overflow-hidden">
        <img
          src={article?.urlToImage ?? imgIcon}
          alt="image placeholder"
          loading="lazy"
          className="aspect-video object-center object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-full truncate max-w-[120px] whitespace-nowrap px-3 py-[2px] bg-gradient-to-r from-[#45C86A] via-[#56D67A] to-[#54BE9E] text-white">
          {article?.author || article?.source.name || 'No Author'}
        </div>
        <div className="flex items-center text-gray-400">
          {article.publishedAt
            ? dayjs(article.publishedAt).fromNow()
            : 'no published at'}
          <img src={timeOutline} alt="time" className=" ml-1" />
        </div>
      </div>
      <div className="text-gray-500">
        <span className="font-bold">Source:</span>{' '}
        {article?.source.name || 'No Source'}
      </div>
      <div className="text-sm text-gray-800 font-black leading-tight pl-2 my-2 border-l-[#3D5CCA] border-l-2">
        {article?.title || '- No Title -'}
      </div>
      <span className="flex items-center bg-white px-8 pb-2 pt-2 absolute bottom-1 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-bold translate-y-full group-hover/card:translate-y-0 transition-transform duration-200 border-b-4 rounded-md hover:bg-gray-50">
        more
        <img
          src={arrowRightIcon}
          alt="right arrow"
          loading="lazy"
          className="w-4 ml-2"
        />
      </span>
    </a>
  );
}

export default Card;
