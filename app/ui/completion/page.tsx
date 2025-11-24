"use client";
import { useState } from "react";

const Completion = () => {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setCompletion(data.text);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full border border-gray-300 bg-white shadow-xl rounded-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white text-lg font-semibold p-4">
          Gemini Chat
        </div>

        {/* Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {error && (
            <div className="text-red-500 font-medium">
              ⚠️ {error}
            </div>
          )}

          {loading? (
            <div className="text-gray-600 animate-pulse">
              ⏳ Generating response...
            </div>
          ): completion?  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-gray-800 whitespace-pre-wrap">
              {completion}
            </div>:null}

         
        </div>

        {/* Input Form */}
        <form onSubmit={handleForm} className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Completion;
