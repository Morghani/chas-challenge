"use client";

import { useState } from "react";

export default function FirstPage() {
  const [joke, setJoke] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  async function fetchJoke() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3010/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
      setJoke("Failed to load a joke. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-between px-10 md:px-20 pt-10">
        <p className="text-3xl">logo</p>
        <p className="text-4xl font-medium">☰</p>
      </div>
      <div className=" flex justify-center">
        <h1 className="text-4xl mt-10 font-semibold">Gratitude</h1>
      </div>

      <div className="h-full flex flex-col items-start w-full md:px-20 px-10 border-solid border-1 border-slate-800">
        <h2 className="font-semibold mt-14 mb-5 text-xl">
          Daily Reflection Prompt
        </h2>
        <div className="h-1/2 w-full bg-slate-200 rounded-xl p-5">{joke}</div>

        <input
          type="text"
          className="h-16 text-2xl p-5 rounded-xl bg-slate-300 w-full my-5"
          placeholder="Write here..."
          value={input}
          onChange={handleInputChange}
        />

        <button
          onClick={() => {
            fetchJoke();
            setInput("");
          }}
          disabled={!input.trim()} // Disable button when input is empty or only contains whitespace
          className={`text-xl h-16 w-full bg-slate-200 rounded-3xl font-semibold ${
            !input.trim() ? "text-gray-400" : "text-black"
          }`} // Conditional class to change text color when disabled
        >
          {loading ? "loading..." : "Send to gratitude guru"}
        </button>
      </div>
    </div>
  );
}
