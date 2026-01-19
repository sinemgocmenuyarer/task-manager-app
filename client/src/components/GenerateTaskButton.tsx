import { useContext, useState, type ChangeEvent } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/core";

export const GenerateTaskButton = () => {
  const { handleAddTasks, handleUserMessage, handleClearProjectTasks } =
    useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  const handlePromptSubmit = async () => {
    const response = await generateResponse();
    console.log("AI Response:", response);
    const message = response.user_message ?? null;

    if (response.status === "success") {
      const titles = response.steps
        .map((step) => step.title)
        .filter((title) => title && title.trim().length > 0);
      handleAddTasks(titles);
    } else {
      handleClearProjectTasks();
    }

    handleUserMessage(message);
  };

  const generateResponse = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: enteredTask }),
    });

    const data = response.json();
    return data;
  };

  return (
    <div className="ai-task-generator">
      <p className="ai-generator-text">
        Do you want to generate your tasks with AI?
      </p>
      <input
        type="text"
        className="new-task-input"
        onChange={handleChange}
        value={enteredTask}
        placeholder="Type here..."
      />
      <Button
        className="primary-button ai-generate-button"
        onClick={handlePromptSubmit}
      >
        Generate with AI
      </Button>
    </div>
  );
};
