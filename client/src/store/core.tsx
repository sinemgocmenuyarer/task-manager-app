import { createContext } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

export type Task = {
  text: string;
  projectId: number;
};

export type ProjectsState = {
  selectedProjectId: number | null | undefined;
  projects: Project[];
  tasks: Task[];
  userMessage: null | string;
};

export type ProjectContextValue = {
  projectsState: ProjectsState;
  handleAddProject: () => void;
  handleSaveProject: (projectData: Omit<Project, "id">) => void;
  handleCancelProject: () => void;
  handleSelectProject: (id: number) => void;
  handleAddTask: (text: string) => void;
  handleAddTasks: (titles: string[]) => void;
  handleDeleteTask: (taskIndex: number) => void;
  handleDeleteProject: () => void;
  handleUserMessage: (userMessage: null | string) => void;
  handleClearProjectTasks: () => void;
};

export const ProjectContext = createContext<ProjectContextValue>({
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    userMessage: null,
  },
  handleAddProject: () => {},
  handleSaveProject: () => {},
  handleCancelProject: () => {},
  handleSelectProject: () => {},
  handleAddTask: () => {},
  handleAddTasks: () => {},
  handleDeleteTask: () => {},
  handleDeleteProject: () => {},
  handleUserMessage: () => {},
  handleClearProjectTasks: () => {},
});
