import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";

const MonacoEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("No output yet...");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  const handleRunCode = async () => {
    setOutput("Running...");

    try {
        const response = await fetch("http://localhost:5000/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, language }),
        });

        const data = await response.json();
        setOutput(data.output || "No output");  // Show error or output in UI
    } catch (error) {
        setOutput("Error: Unable to connect to the server.");
    }
};

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4 relative">
      {/* Editor Title & Language Dropdown */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold">Monaco Editor</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white text-sm px-2 py-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="60vh"
        language={language}
        defaultValue={code}
        theme="vs-dark"
        onMount={(editor) => (editorRef.current = editor)}
      />

      {/* Run Button */}
      <button
        onClick={handleRunCode}
        className="absolute bottom-56 z-30 right-8 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
      >
        <Play className="w-4 h-4 mr-1" />
        Run
      </button>

      {/* Output Section */}
      <div className="mt-8 p-3 bg-black rounded h-40 overflow-auto">
        <h3 className="text-sm font-bold">Output:</h3>
        <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default MonacoEditor;
