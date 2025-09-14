import React, { useState } from "react";
import { FiSend, FiTrash2, FiFileText } from "react-icons/fi";

const GenerateResume = () => {
  const [description, setDescription] = useState("");

  const handleGenerate = () => {
    console.log("Generating Resume with description:", description);
  };

  const handleClear = () => {
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10">
      <div className="card w-full max-w-2xl shadow-xl bg-base-100/80 backdrop-blur-md p-8 border border-base-300">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
          <FiFileText className="text-primary" /> AI Resume Generator
        </h1>
        
        {/* Subheading / Explanation */}
        <p className="text-center text-base-content/70 mb-6">
          ✍️ <span className="font-medium">Write about yourself</span> in the box below —
          and our <span className="text-primary font-semibold">AI</span> will transform it
          into a <span className="text-secondary font-semibold">professional, ATS-friendly resume</span> in seconds 🚀
        </p>

        {/* Textarea */}
        <textarea
          className="textarea textarea-bordered w-full h-48 mb-6 focus:shadow-md transition"
          placeholder="Enter your description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGenerate}
            className="btn btn-primary flex items-center gap-2 hover:scale-105 transition"
          >
            <FiSend /> Generate
          </button>
          <button
            onClick={handleClear}
            className="btn btn-secondary flex items-center gap-2 hover:scale-105 transition"
          >
            <FiTrash2 /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateResume;
