import { useState } from "react";

function getContrastColor(bgColor = "#ffffff") {
  const color = bgColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? "#000000" : "#ffffff";
}

export default function ThemePreview({ theme, onUpdate }) {
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedJSON, setEditedJSON] = useState("");

  if (!theme) return null;

  const json = JSON.stringify(theme, null, 2);
  const contrastColor = getContrastColor(theme.primaryColor);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(" Copy failed");
    }
  };

  const handleEditToggle = () => {
    setEditMode(true);
    setEditedJSON(json);
  };

  const handleApplyEdit = () => {
    try {
      const parsed = JSON.parse(editedJSON);
      onUpdate(parsed);
      setEditMode(false);
    } catch (err) {
      alert(" Invalid JSON format");
    }
  };

  return (
    <div
      className="p-8 rounded-lg mt-6 shadow-xl transition-all animate-fade-in"
      style={{
        backgroundColor: theme.primaryColor,
        fontFamily: theme.font,
        color: contrastColor,
      }}
    >
      <h1 className="text-3xl mb-4 font-bold"> Your Theme Preview</h1>
      <p className="mb-4 text-lg">Live preview of your generated design:</p>

      <button
        className={`${theme.buttonStyle || "bg-blue-600 text-white"} transition-all hover:scale-105 px-4 py-2 rounded-md`}
      >
        Explore
      </button>

      <div className="mt-6 bg-white p-4 rounded-md shadow-md text-black">
        <h3 className="font-semibold mb-2">Generated JSON:</h3>

        {editMode ? (
          <>
            <textarea
              value={editedJSON}
              onChange={(e) => setEditedJSON(e.target.value)}
              rows={8}
              className="w-full p-2 border rounded bg-gray-50 font-mono text-sm"
            />
            <button
              onClick={handleApplyEdit}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
               Apply Changes
            </button>
          </>
        ) : (
          <>
            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto">
              {json}
            </pre>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                 Copy JSON
              </button>
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                 Edit Theme
              </button>
            </div>
            {copied && (
              <p className="text-green-600 mt-2 text-sm"> Copied to clipboard!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
