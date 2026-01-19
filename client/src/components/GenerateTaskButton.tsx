import { useContext, useState, type ChangeEvent } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/core";

export const GenerateTaskButton = () => {
  const { projectsState } = useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState("");

  const project = projectsState.projects.find(
    (projectItem) => projectItem.id === projectsState.selectedProjectId,
  );

  if (!project) {
    return null;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  const handlePromptSubmit = async () => {
    const response = await generateResponse();
    console.log("response:", response);
  };

  const generateResponse = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: project.description }),
    });

    const data = await response.json();
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
