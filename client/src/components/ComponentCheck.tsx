import { useContext } from "react";
import { NewProject } from "./NewProject.tsx";
import { NoProjectSelected } from "./NoProjectSelected.tsx";
import { SelectedProject } from "./SelectedProject.tsx";
import { ProjectContext } from "../store/core.tsx";

export const ComponentCheck = () => {
  const { projectsState } = useContext(ProjectContext);

  let content;

  if (projectsState?.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectsState?.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  } else {
    content = <SelectedProject />;
  }

  return <div>{content}</div>;
};
