import { useState, type ReactNode } from "react";
import {
  ProjectContext,
  type Project,
  type ProjectsState,
} from "./core";

export const ProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsState, setProjectState] = useState<ProjectsState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleSaveProject(projectData: Omit<Project, "id">) {
    setProjectState((prevState) => {
      const newProject = { ...projectData, id: Math.random() };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const handleCancelProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleSelectProject = (id: number) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  function handleAddTask(text: string) {
    setProjectState((prevState) => {
      if (prevState.selectedProjectId === null || prevState.selectedProjectId === undefined) {
        return prevState;
      }
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(taskId: number) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      if (prevState.selectedProjectId === null || prevState.selectedProjectId === undefined) {
        return prevState;
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId,
        ),
      };
    });
  };

  const ctxValue = {
    projectsState,
    handleAddProject,
    handleSaveProject,
    handleCancelProject,
    handleSelectProject,
    handleAddTask,
    handleDeleteTask,
    handleDeleteProject,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
};
