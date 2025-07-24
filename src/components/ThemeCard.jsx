import React from "react";

function getContrastColor(bgColor = "#ffffff") {
  const color = bgColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? "#000000" : "#ffffff";
}

export default function ThemeCard({ theme, index }) {
  const contrastColor = getContrastColor(theme.primaryColor);

  return (
    <div
      className="rounded-xl shadow-lg p-6 transition hover:scale-105"
      style={{
        backgroundColor: theme.primaryColor,
        fontFamily: theme.font,
        color: contrastColor,
      }}
    >
      <h3 className="text-xl font-bold mb-2"> Theme #{index + 1}</h3>
      <p className="mb-2">Font: {theme.font}</p>
      <button
        className={`${theme.buttonStyle || "bg-blue-600 text-white"} transition-all px-4 py-2 rounded-md`}
      >
        Sample
      </button>
    </div>
  );
}
