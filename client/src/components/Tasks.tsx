import { useContext } from "react";
import { NewTask } from "./NewTask.tsx";
import { ProjectContext } from "../store/core.tsx";

export const Tasks = () => {
  const { projectsState, handleDeleteTask } = useContext(ProjectContext);
  return (
    <section>
      <h2>Tasks</h2>
      <NewTask />

      {projectsState.tasks.length === 0 && (
        <p>This project does not have any tasks yet</p>
      )}
      {projectsState.tasks.length > 0 && (
        <ul>
          {projectsState.tasks.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(task.id)}>Clear</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
