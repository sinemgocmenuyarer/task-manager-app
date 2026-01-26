import type { ProjectContextValue } from "../store/context";

export const baseContext: ProjectContextValue = {
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
};
