import { createContext } from "react";

export type Projects = {
  project: { id: number; title: string }[];
};

export type NewProjectData = {
  selectedProjectId: string | undefined;
  projects: Projects;
  tasks: { id: number; text: string; projectId: number }[];
};

export const ProjectContext = createContext({
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  },
  handleAddProject: () => {},
  handleSaveProject: () => {},
  handleCancelProject: () => {},
  handleSelectProject: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleDeleteProject: () => {},
});
