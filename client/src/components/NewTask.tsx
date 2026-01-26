import { useContext, useRef, type FormEvent } from "react";
import { ProjectContext } from "../store/context";
import { Button } from "./Button";
import { Input } from "./Input";

export const NewTask = () => {
  const { handleAddTask } = useContext(ProjectContext);

  const task = useRef<HTMLInputElement>(null);

  function handleClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTask = task.current?.value;

    if (!enteredTask || enteredTask.trim() === "") {
      return;
    }
    handleAddTask(enteredTask);

    if (task.current) {
      task.current.value = "";
    }
  }

  return (
    <>
      <p className="tasks-subtitle">
        You can also add your own tasks to this project.
      </p>
      <form className="new-task-form" onSubmit={handleClick}>
        <Input
          type="text"
          className="new-task-input"
          ref={task}
          placeholder="Type here..."
          label={"new-task-input"}
        />
        <div className="new-task-actions">
          <Button className="secondary-button new-task-add-button">
            Add Your Task
          </Button>
        </div>
      </form>
    </>
  );
};
