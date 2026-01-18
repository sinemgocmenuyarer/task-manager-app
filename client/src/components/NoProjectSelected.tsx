import { useContext } from "react";
import { Button } from "./Button.js";
import { ProjectContext } from "../store/core.js";

export const NoProjectSelected = () => {
  const { handleAddProject } = useContext(ProjectContext);
  return (
    <div className="no-project-selected">
      {/* <img
        src={}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      /> */}
      <h2>No Project Selected</h2>
      <p>Select a project or get started with a new one</p>
      <p>
        <Button onClick={handleAddProject}>Create new project</Button>
      </p>
    </div>
  );
};
