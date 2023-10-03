export default function Footer() {
  return (
    <footer className="w-full  isolate relative ">
      <div className="absolute max-w-4xl w-full -top-3 bottom-0 left-1/2 -translate-x-1/2  bg-white rounded-lg -z-10 border-gray-100 border-2"></div>
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="max-w-4xl mx-auto p-2 items-baseline flex relative">
        <div className="font-bold text-white uppercase text-lg mr-3">
          CONVERTI.AI
        </div>
        <p className="text-sm text-gray-50">
          Copyright © - 2023 ConvertiAi®. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
