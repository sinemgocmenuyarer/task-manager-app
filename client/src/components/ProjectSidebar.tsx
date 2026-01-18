import { useContext } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/core";

export const ProjectSidebar = () => {
  const { handleAddProject, projectsState, handleSelectProject } =
    useContext(ProjectContext);

  return (
    <aside className="sidebar">
      <h2 className="project-sidebar-title">Your Project</h2>
      <div>
        <Button onClick={handleAddProject}>+ Add Project</Button>
      </div>
      <ul>
        {projectsState.projects.map((project) => {
          return (
            <li key={project.id}>
              <button onClick={() => handleSelectProject(project.id)}>
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
