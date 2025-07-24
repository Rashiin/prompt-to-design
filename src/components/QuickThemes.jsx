import { defaultThemes } from "../data/defaultThemes";

export default function QuickThemes({ onSelect }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-4">⚡ Try a Quick Theme:</h2>
      <div className="flex flex-wrap gap-4">
        {defaultThemes.map((theme, index) => (
          <button
            key={index}
            onClick={() => onSelect(theme)}
            className="px-4 py-2 rounded-lg bg-white shadow text-sm font-medium hover:scale-105 transition-all border"
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
