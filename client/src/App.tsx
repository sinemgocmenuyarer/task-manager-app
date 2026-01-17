import "./App.css";
import { useState } from "react";

function App() {
  const [userPrompt, setUserPrompt] = useState<string>("");

  // TODO: Handle this logic in a seperate file to keep the App tsx clean.
  const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User Prompt Submitted:", userPrompt);
  };

  // TODO: Make this input value controlled by setting its value to userPrompt.
  // We do not want to state in a more performance way so that react will not re-render on every keystroke.
  return (
    <main>
      <h3>Generate with AI</h3>

      <form onSubmit={handlePromptSubmit}>
        <input
          type="text"
          name="promt-description"
          placeholder="Enter a prompt"
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <input type="submit" value="Generate your task" />
      </form>
    </main>
  );
}

export default App;
