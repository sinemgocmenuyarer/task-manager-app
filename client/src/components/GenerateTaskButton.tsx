import { useContext } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/core";

export const GenerateTaskButton = () => {
  const { projectsState } = useContext(ProjectContext);

  const project = projectsState.projects.find(
    (projectItem) => projectItem.id === projectsState.selectedProjectId,
  );

  if (!project) {
    return null;
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
    <Button
      className="text-stone-700 hover:text-stone-950"
      onClick={handlePromptSubmit}
    >
      Generate your task with AI...
    </Button>
  );
};
