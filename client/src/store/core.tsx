import { createContext } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

export type Task = {
  id: number;
  text: string;
  projectId: number;
};

export type ProjectsState = {
  selectedProjectId: number | null | undefined;
  projects: Project[];
  tasks: Task[];
};

export type ProjectContextValue = {
  projectsState: ProjectsState;
  handleAddProject: () => void;
  handleSaveProject: (projectData: Omit<Project, "id">) => void;
  handleCancelProject: () => void;
  handleSelectProject: (id: number) => void;
  handleAddTask: (text: string) => void;
  handleDeleteTask: (taskId: number) => void;
  handleDeleteProject: () => void;
};

export const ProjectContext = createContext<ProjectContextValue>({
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
