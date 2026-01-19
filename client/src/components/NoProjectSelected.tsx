import { useContext } from "react";
import { Button } from "./Button";
import { ProjectContext } from "../store/context";

export const NoProjectSelected = () => {
  const { handleAddProject } = useContext(ProjectContext);
  return (
    <div className="no-project-selected">
      <h2 className="no-project-title">No Project Selected</h2>
      <p className="no-project-text">
        Select a project or get started with a new one
      </p>
      <p className="no-project-cta">
        <Button
          className="primary-button no-project-button"
          onClick={handleAddProject}
        >
          Create new project
        </Button>
      </p>
    </div>
  );
};
