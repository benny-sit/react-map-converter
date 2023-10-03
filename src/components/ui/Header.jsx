export default function Header() {
  return (
    <header className="w-full border-b">
      <nav className="max-w-4xl mx-auto p-2 flex items-baseline">
        <div className="font-bold text-gray-500 uppercase text-lg mr-3">
          CONVERTI.AI
        </div>
        <ul className="flex gap-2">
          <li className="text-slate-400 hover:text-gray-800 ">
            <a href="#map">Map</a>
          </li>
          <li className="text-slate-400 hover:text-gray-800 ">
            <a href="#news">News</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
