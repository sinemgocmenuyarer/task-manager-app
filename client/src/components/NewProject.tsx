import { useContext, useRef } from "react";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { ProjectContext } from "../store/core";

export const NewProject = () => {
  const { handleSaveProject, handleCancelProject } = useContext(ProjectContext);

  const modal = useRef<{ open: () => void } | null>(null);

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  function onSaveProject() {
    const enteredTitle = title?.current?.value;
    const enteredDescription = description?.current?.value;
    const enteredDueDate = dueDate?.current?.value;

    if (
      !enteredTitle ||
      !enteredDescription ||
      !enteredDueDate ||
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current?.open();
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
        <p className="modal-message">
          Please make sure you provide a valid input
        </p>
      </Modal>
      <div className="new-project">
        <menu className="new-project-actions">
          <li className="new-project-action">
            <button className="ghost-button" onClick={handleCancelProject}>
              Cancel
            </button>
          </li>
          <li className="new-project-action">
            <button className="primary-button" onClick={onSaveProject}>
              Save
            </button>
          </li>
        </menu>
        <div className="new-project-form">
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
};
