import { useContext } from "react";
import { ProjectContext } from "../store/core.tsx";

export const Tasks = () => {
  const { projectsState, handleDeleteTask } = useContext(ProjectContext);

  const projectTasks =
    projectsState.selectedProjectId === null ||
    projectsState.selectedProjectId === undefined
      ? []
      : projectsState.tasks.filter(
          (task) => task.projectId === projectsState.selectedProjectId,
        );

  return (
    <section className="tasks">
      <h2 className="tasks-title">Tasks</h2>
      {projectTasks.length === 0 && (
        <p className="tasks-empty">This project does not have any tasks yet</p>
      )}
      {projectTasks.length > 0 && (
        <ul className="tasks-list">
          {projectTasks.map((task) => (
            <li className="tasks-item" key={task.id}>
              <span className="tasks-item-text">{task.text}</span>
              <button
                className="danger-text-button tasks-clear-button"
                onClick={() => handleDeleteTask(task.id)}
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
