import { useContext, useMemo, type ReactNode } from "react";
import { ProjectContext } from "../store/context";

export const Tasks = () => {
  const { projectsState, handleDeleteTask } = useContext(ProjectContext);

  const projectTasks = useMemo(() => {
    const { selectedProjectId, tasks } = projectsState;
    if (!selectedProjectId) return [];

    return tasks
      .map((task, index) => ({ task, index }))
      .filter(({ task }) => task.projectId === selectedProjectId);
  }, [projectsState]);

  let content: ReactNode;

  if (projectTasks.length === 0 && projectsState.userMessage === null) {
    content = (
      <p className="tasks-empty">
        This project does not have any tasks yet. Please add a new task by
        either generating with AI or adding manually.
      </p>
    );
  } else if (projectsState.userMessage !== null) {
    content = <p className="user-message">{projectsState.userMessage}</p>;
  } else {
    content = (
      <ul className="tasks-list">
        {projectTasks.map(({ task, index }) => (
          <li className="tasks-item" key={task.text}>
            <span className="tasks-item-text">{task.text}</span>
            <button
              className="danger-text-button tasks-clear-button"
              onClick={() => handleDeleteTask(index)}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="tasks">
      <h2 className="tasks-title">Tasks</h2>
      {content}
    </section>
  );
};
