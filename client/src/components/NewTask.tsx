import { useContext, useState, type ChangeEvent } from "react";
import { ProjectContext } from "../store/core";
import { Button } from "./Button";
import Input from "./Input";

export const NewTask = () => {
  const { handleAddTask } = useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleClick(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enteredTask.trim() === "") {
      return;
    }
    handleAddTask(enteredTask);
    setEnteredTask("");
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
          onChange={handleChange}
          value={enteredTask}
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
