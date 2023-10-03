import timeOutline from '/imgs/ion_time-outline.svg';
import imgIcon from '/imgs/image-icon.svg';

export default function FakeCard({ isPulsing = true }) {
  const pulseClass = (isPulsing && 'animate-pulse') || '';

  return (
    <div className="max-w-[400px] w-full relative p-3 bg-white rounded-3xl flex flex-col gap-2 text-xs">
      <div className="relative aspect-video w-full bg-gray-100 rounded-lg grid place-items-center overflow-hidden">
        <img
          src={imgIcon}
          alt="image placeholder"
          loading="lazy"
          className="aspect-video object-center object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <div
          className={`rounded-full truncate max-w-[120px] whitespace-nowrap px-3 h-2 w-full py-[2px] bg-gray-200 ${pulseClass} text-white`}
        ></div>
        <div className="flex items-center text-gray-400">
          <img src={timeOutline} alt="time" className=" ml-1" />
        </div>
      </div>
      <div className={`rounded-full w-20 h-3 bg-gray-200 ${pulseClass}`}></div>
      <div className="text-sm text-gray-800 font-black leading-tight pl-2 my-2 border-l-[#3D5CCA] border-l-2 flex flex-col gap-2">
        <div
          className={`rounded-full w-24 h-3 bg-gray-200 ${pulseClass}`}
        ></div>
        <div
          className={`rounded-full w-16 h-3 bg-gray-200 ${pulseClass}`}
        ></div>
        <div
          className={`rounded-full w-32 h-3 bg-gray-200 ${pulseClass}`}
        ></div>
      </div>
    </div>
  );
}
