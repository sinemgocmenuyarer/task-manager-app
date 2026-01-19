import { useContext } from "react";

import { Tasks } from "./Tasks.tsx";
import { ProjectContext } from "../store/core.tsx";
import { GenerateTaskButton } from "./GenerateTask.tsx";
import { NewTask } from "./NewTask.tsx";

export const SelectedProject = () => {
  const { projectsState, handleDeleteProject } = useContext(ProjectContext);

  const project = projectsState.projects.find(
    (projectItem) => projectItem.id === projectsState.selectedProjectId,
  );

  if (!project) {
    return null;
  }

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="selected-project-layout">
      <div className="selected-project-main">
        <header className="selected-project-header">
          <div className="selected-project-header-row">
            <h1 className="selected-project-title">{project.title}</h1>
            <button className="danger-button" onClick={handleDeleteProject}>
              Delete
            </button>
          </div>
          <p className="selected-project-date">{formattedDate}</p>
          <p className="selected-project-description">{project.description}</p>
        </header>

        <div className="selected-project-generator">
          <GenerateTaskButton />
        </div>
        <div className="tasks-new">
          <NewTask />
        </div>
      </div>
      <div className="selected-project-tasks">
        <Tasks />
      </div>
    </div>
  );
};
