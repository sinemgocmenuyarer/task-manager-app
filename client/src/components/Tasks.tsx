import { useContext } from "react";
import { ProjectContext } from "../store/core.tsx";

export const Tasks = () => {
  const { projectsState, handleDeleteTask } = useContext(ProjectContext);

  console.log("Projects State in Tasks Component:", projectsState);

  const projectTasks =
    projectsState.selectedProjectId === null ||
    projectsState.selectedProjectId === undefined
      ? []
      : projectsState.tasks
          .map((task, index) => ({ task, index }))
          .filter(
            ({ task }) => task.projectId === projectsState.selectedProjectId,
          );
  console.log("User Message:", projectsState);
  return (
    <section className="tasks">
      <h2 className="tasks-title">Tasks</h2>
      {projectsState.userMessage !== null && (
        <p className="user-message">{projectsState.userMessage}</p>
      )}
      {projectTasks.length === 0 && projectsState.userMessage === null && (
        <p className="tasks-empty">This project does not have any tasks yet</p>
      )}

      {projectTasks.length > 0 && (
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
      )}
    </section>
  );
};
