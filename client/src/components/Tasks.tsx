import { useContext, type ReactNode } from "react";
import { ProjectContext } from "../store/context";

export const Tasks = () => {
  const { projectsState, handleDeleteTask } = useContext(ProjectContext);

  const { selectedProjectId, projects } = projectsState;
  if (!selectedProjectId) return null;

  const selectedProject =
    projects.find((projectItem) => projectItem.id === selectedProjectId) ??
    null;

  const projectTasks = selectedProject?.tasks ?? [];
  const userMessage = selectedProject?.userMessage ?? null;

  let content: ReactNode;

  if (projectTasks.length === 0 && userMessage === null) {
    content = (
      <p className="tasks-empty">
        This project does not have any tasks yet. Please add a new task by
        either generating with AI or adding manually.
      </p>
    );
  } else if (projectTasks.length !== 0) {
    content = (
      <>
        {userMessage !== null ? (
          <p className="user-message">{userMessage}</p>
        ) : null}
        <ul className="tasks-list">
          {projectTasks.map((task) => (
            <li className="tasks-item" key={task.taskId}>
              <span className="tasks-item-text">{task.text}</span>
              <button
                className="danger-text-button tasks-clear-button"
                onClick={() => handleDeleteTask(task.taskId)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    content = <p className="user-message">{userMessage}</p>;
  }

  return (
    <section className="tasks">
      <h2 className="tasks-title">Tasks</h2>
      {content}
    </section>
  );
};
