import { useContext, useState, type ChangeEvent } from "react";
import { Button } from "./Button";
import { ProjectContext, type GenerateResponse } from "../store/core";

export const GenerateTaskButton = () => {
  const { handleAddTasks, handleUserMessage, handleClearProjectTasks } =
    useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  const handlePromptSubmit = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await generateResponse();
      const message = response.user_message ?? null;

      if (response.status === "success") {
        const titles = response.steps
          .map((step) => step.title)
          .filter((title) => title.trim().length > 0);
        handleAddTasks(titles);
        setEnteredTask("");
      } else {
        handleClearProjectTasks();
      }

      handleUserMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (): Promise<GenerateResponse> => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: enteredTask }),
    });

    const data = (await response.json()) as GenerateResponse;
    return data;
  };

  return (
    <div className="ai-task-generator">
      <p className="ai-generator-text">
        Do you want to generate your tasks with AI?
      </p>
      {isLoading && <p className="ai-loading-text">Generating tasks...</p>}
      <input
        type="text"
        className="new-task-input"
        onChange={handleChange}
        value={enteredTask}
        placeholder="Type here..."
        disabled={isLoading}
      />
      <Button
        className="primary-button ai-generate-button"
        onClick={handlePromptSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate with AI"}
      </Button>
    </div>
  );
};
