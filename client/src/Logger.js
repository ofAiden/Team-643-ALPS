import { useState } from "react";

export default function Logger() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState([]);

  const Submit = async () => {
    if (text.trim() !== "") {
      // Send the log to the backend (Node.js + MySQL)
      await fetch("http://localhost:5000/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "Log Entry", content: text }),
      });
      
      // Add the log to the local state
      setLogs([...logs, text]);
      setText(""); // Clear the input field
    }
  };

  const Clear = () => {
    if (setLogs != null) {
      setLogs([]);
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter log message"
      />
      <button onClick={Submit}>Submit</button>
      <button onClick={Clear}>Clear</button>
      <div>
        {logs.length === 0 ? (
          <p>No logs yet</p>
        ) : (
          logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))
        )}
      </div>
    </div>
  );
}