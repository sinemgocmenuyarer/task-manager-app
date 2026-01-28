import { createContext } from "react";

export type Task = {
  text: string;
  taskId: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  tasks: Task[];
  userMessage: null | string;
};

export type ProjectsState = {
  selectedProjectId: string | null | undefined;
  projects: Project[];
};

type GeneratedStep = {
  id: string;
  title: string;
};

export type GenerateResponse = {
  steps: GeneratedStep[];
  user_message: string | null;
};

export type ProjectContextValue = {
  projectsState: ProjectsState;
  handleAddProject: () => void;
  handleSaveProject: (
    projectData: Omit<Project, "id" | "tasks" | "userMessage">,
  ) => void;
  handleCancelProject: () => void;
  handleSelectProject: (id: string) => void;
  handleAddTask: (text: string) => void;
  handleAddTasks: (titles: string[]) => void;
  handleDeleteTask: (taskId: string) => void;
  handleDeleteProject: () => void;
  handleUserMessage: (userMessage: null | string) => void;
};

export const ProjectContext = createContext<ProjectContextValue>({
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
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
});
