import { useState } from "react";

export default function PromptForm({ onSubmit }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. A dark-themed dashboard for crypto"
        className="w-full px-5 py-3 rounded-lg bg-white/60 backdrop-blur border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all placeholder-gray-500 text-gray-900"
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      >
         Generate Theme
      </button>
    </form>
  );
}
