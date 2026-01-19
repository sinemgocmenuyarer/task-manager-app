import { useContext } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/context";

export const ProjectSidebar = () => {
  const { handleAddProject, projectsState, handleSelectProject } =
    useContext(ProjectContext);

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">Your Project</h2>

        <ul className="sidebar-project-list">
          {projectsState.projects.map((project) => {
            return (
              <li className="sidebar-project-item" key={project.id}>
                <Button
                  className="sidebar-project-button"
                  onClick={() => handleSelectProject(project.id)}
                >
                  {project.title}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebar-actions">
        <Button
          className="primary-button sidebar-add-button"
          onClick={handleAddProject}
        >
          + Add Project
        </Button>
      </div>
    </aside>
  );
};
