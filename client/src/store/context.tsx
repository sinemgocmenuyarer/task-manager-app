import { useState, type ReactNode } from "react";
import { ProjectContext, type Project, type ProjectsState } from "./core";

export const ProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsState, setProjectState] = useState<ProjectsState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    userMessage: null,
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
      const projectId = prevState.selectedProjectId;
      if (projectId === null || projectId === undefined) {
        return prevState;
      }
      const newTask = {
        text: text,
        projectId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleAddTasks(titles: string[]) {
    setProjectState((prevState) => {
      const projectId = prevState.selectedProjectId;
      if (projectId === null || projectId === undefined) {
        return prevState;
      }
      if (titles.length === 0) {
        return prevState;
      }
      const newTasks = titles.map((title) => ({
        text: title,
        projectId,
      }));
      return {
        ...prevState,
        tasks: [...newTasks, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(taskIndex: number) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((_, index) => index !== taskIndex),
      };
    });
  }

  function handleUserMessage(userMessage: string | null) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        userMessage,
      };
    });
  }

  function handleClearProjectTasks() {
    setProjectState((prevState) => {
      if (
        prevState.selectedProjectId === null ||
        prevState.selectedProjectId === undefined
      ) {
        return prevState;
      }
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.projectId !== prevState.selectedProjectId,
        ),
      };
    });
  }

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      if (
        prevState.selectedProjectId === null ||
        prevState.selectedProjectId === undefined
      ) {
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
    handleAddTasks,
    handleDeleteTask,
    handleDeleteProject,
    handleUserMessage,
    handleClearProjectTasks,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
};
