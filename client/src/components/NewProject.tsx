import { useContext, useRef } from "react";
import Input from "./Input.tsx";
import Modal from "./Modal.tsx";
import { ProjectContext } from "../store/core.tsx";

export const NewProject = () => {
  const { handleSaveProject, handleCancelProject } = useContext(ProjectContext);

  const modal = useRef();

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  function onSaveProject() {
    const enteredTitle = title?.current?.value;
    const enteredDescription = description?.current?.value;
    const enteredDueDate = dueDate?.current?.value;

    if (
      enteredTitle?.trim() === "" ||
      enteredDescription?.trim() === "" ||
      enteredDueDate?.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    handleSaveProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <p>Please make sure you provide a valid input</p>{" "}
      </Modal>
      <div>
        <menu>
          <li>
            <button onClick={handleCancelProject}>Cancel</button>
          </li>
          <li>
            <button onClick={onSaveProject}>Save</button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
};
