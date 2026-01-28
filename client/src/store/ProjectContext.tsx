import { useEffect, useState, type ReactNode } from "react";
import { ProjectContext, type Project, type ProjectsState } from "./context";

export const ProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const defaultState: ProjectsState = {
    selectedProjectId: undefined,
    projects: [],
  };

  const [projectsState, setProjectState] = useState<ProjectsState>(() => {
    const storeProjectData = localStorage.getItem("projectsState");
    if (!storeProjectData) {
      return defaultState;
    }
    return JSON.parse(storeProjectData);
  });

  useEffect(() => {
    localStorage.setItem("projectsState", JSON.stringify(projectsState));
  }, [projectsState]);

  const handleAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleSaveProject(
    projectData: Omit<Project, "id" | "tasks" | "userMessage">,
  ) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: crypto.randomUUID(),
        tasks: [],
        userMessage: null,
      };

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

  const handleSelectProject = (id: string) => {
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
        taskId: crypto.randomUUID(),
        text: text,
      };
      const updatedProject = prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [newTask, ...project.tasks],
              userMessage: null,
            }
          : project,
      );
      return {
        ...prevState,
        projects: updatedProject,
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
        taskId: crypto.randomUUID(),
        text: title,
      }));
      const updatedProject = prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...newTasks, ...project.tasks],
              userMessage: null,
            }
          : project,
      );
      return {
        ...prevState,
        projects: updatedProject,
      };
    });
  }

  function handleDeleteTask(taskId: string) {
    setProjectState((prevState) => {
      const projectId = prevState.selectedProjectId;
      if (projectId === null || projectId === undefined) {
        return prevState;
      }
      const updatedProject = prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.taskId !== taskId),
            }
          : project,
      );
      return {
        ...prevState,
        projects: updatedProject,
      };
    });
  }

  function handleUserMessage(userMessage: string | null) {
    setProjectState((prevState) => {
      const projectId = prevState.selectedProjectId;
      if (projectId === null || projectId === undefined) {
        return prevState;
      }
      const updatedProject = prevState.projects.map((project) =>
        project.id === projectId
          ? { ...project, userMessage: userMessage }
          : project,
      );
      return {
        ...prevState,
        projects: updatedProject,
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
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
};
