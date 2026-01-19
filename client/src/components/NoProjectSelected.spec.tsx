import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoProjectSelected } from "./NoProjectSelected";
import { ProjectContext, type ProjectContextValue } from "../store/core";

const baseContext: Partial<ProjectContextValue> = {
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    userMessage: null,
  },
  handleAddProject: () => {},
};

const renderWithContext = (overrides?: Partial<ProjectContextValue>) => {
  const value = { ...baseContext, ...overrides } as ProjectContextValue;
  return render(
    <ProjectContext.Provider value={value}>
      <NoProjectSelected />
    </ProjectContext.Provider>,
  );
};

describe("NoProjectSelected", () => {
  test("renders heading and helper text", () => {
    renderWithContext();
    expect(
      screen.getByRole("heading", { name: "No Project Selected" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select a project or get started with a new one"),
    ).toBeInTheDocument();
  });

  test("renders create project button", () => {
    renderWithContext();
    expect(
      screen.getByRole("button", { name: "Create new project" }),
    ).toBeInTheDocument();
  });

  test("calls handleAddProject when clicking create project button", async () => {
    const handleAddProject = jest.fn();
    const user = userEvent.setup();
    renderWithContext({ handleAddProject });

    await user.click(
      screen.getByRole("button", { name: "Create new project" }),
    );

    expect(handleAddProject).toHaveBeenCalledTimes(1);
  });
});
