import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewTask } from "./NewTask";
import {
  ProjectContext,
  type ProjectContextValue,
  type ProjectsState,
} from "../store/context";

import { baseContext } from "../test/helper";

type ProjectContextOverrides = Omit<
  Partial<ProjectContextValue>,
  "projectsState"
> & {
  projectsState?: Partial<ProjectsState>;
};

const renderWithContext = (overrides: ProjectContextOverrides = {}) => {
  const value: ProjectContextValue = {
    ...baseContext,
    ...overrides,
    projectsState: {
      ...baseContext.projectsState,
      ...(overrides.projectsState ?? {}),
    },
  };

  return render(
    <ProjectContext.Provider value={value}>
      <NewTask />
    </ProjectContext.Provider>,
  );
};

describe("NewTask", () => {
  test("renders input and action button", () => {
    renderWithContext();
    expect(screen.getByLabelText("new-task-input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Your Task" }),
    ).toBeInTheDocument();
  });

  test("adds task on submit and clears input", async () => {
    const handleAddTask = jest.fn();
    const user = userEvent.setup();
    renderWithContext({ handleAddTask });

    const input = screen.getByLabelText("new-task-input");
    await user.type(input, "Ship landing page");
    await user.click(screen.getByRole("button", { name: "Add Your Task" }));

    expect(handleAddTask).toHaveBeenCalledTimes(1);
    expect(handleAddTask).toHaveBeenCalledWith("Ship landing page");
    expect(input).toHaveValue("");
  });

  test("does not add empty task", async () => {
    const handleAddTask = jest.fn();
    const user = userEvent.setup();
    renderWithContext({ handleAddTask });

    await user.click(screen.getByRole("button", { name: "Add Your Task" }));

    expect(handleAddTask).not.toHaveBeenCalled();
  });
});
