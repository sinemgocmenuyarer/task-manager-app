import { useContext, useState, type ChangeEvent } from "react";
import { ProjectContext } from "../store/core";
import { Button } from "./Button";

export const NewTask = () => {
  const { handleAddTask } = useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    handleAddTask(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="new-task">
      <input
        type="text"
        className="new-task-input"
        onChange={handleChange}
        value={enteredTask}
        placeholder="Type here..."
      />
      <Button
        className="secondary-button new-task-add-button"
        onClick={handleClick}
      >
        Add Your Task
      </Button>
    </div>
  );
};
