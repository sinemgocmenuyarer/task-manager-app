import { useContext, useState, type ChangeEvent } from "react";
import { ProjectContext } from "../store/core";
import { Button } from "./Button";
import { GenerateTaskButton } from "./GenerateTaskButton";

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
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <Button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </Button>
      <GenerateTaskButton />
    </div>
  );
};
