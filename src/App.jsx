import { useState, useEffect } from "react";
import PromptForm from "./components/PromptForm";
import ThemePreview from "./components/ThemePreview";
import ThemeCard from "./components/ThemeCard";
import { extractDesign } from "./utils/extractDesignFromPrompt";
import QuickThemes from "./components/QuickThemes";

function App() {
  const [theme, setTheme] = useState(null);
  const [savedThemes, setSavedThemes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("themes");
    if (stored) {
      setSavedThemes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(savedThemes));
  }, [savedThemes]);

  const handlePrompt = (prompt) => {
    const newTheme = extractDesign(prompt);
    setTheme(newTheme);
    setSavedThemes((prev) => [newTheme, ...prev.slice(0, 9)]);
  };

  // When theme is edited in preview
  const handleThemeUpdate = (updatedTheme) => {
    setTheme(updatedTheme);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 font-inter text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
         Prompt to Design
      </h1>

      <QuickThemes onSelect={(t) => setTheme(t)} />

      <PromptForm onSubmit={handlePrompt} />

      <ThemePreview theme={theme} onUpdate={handleThemeUpdate} />

      {savedThemes.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-6 text-center">🗂️ Saved Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedThemes.map((t, index) => (
              <ThemeCard key={index} theme={t} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
