import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectedProject } from "./SelectedProject";
import {
  ProjectContext,
  type ProjectContextValue,
  type ProjectsState,
} from "../store/context";
import { baseContext } from "../test/helper";

jest.mock("./GenerateTask", () => ({
  GenerateTaskButton: () => <div data-testid="generate-task" />,
}));

jest.mock("./NewTask", () => ({
  NewTask: () => <div data-testid="new-task" />,
}));

jest.mock("./Tasks", () => ({
  Tasks: () => <div data-testid="tasks" />,
}));

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
      <SelectedProject />
    </ProjectContext.Provider>,
  );
};

describe("SelectedProject", () => {
  test("renders selected project details and children", () => {
    renderWithContext({
      projectsState: {
        selectedProjectId: "project-1",
        projects: [
          {
            id: "project-1",
            title: "Marketing plan",
            description: "Outline channels and milestones.",
            dueDate: "2024-01-15",
            tasks: [],
            userMessage: null,
          },
        ],
      },
    });

    expect(
      screen.getByRole("heading", { name: "Marketing plan" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Outline channels and milestones."),
    ).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
    expect(screen.getByTestId("generate-task")).toBeInTheDocument();
    expect(screen.getByTestId("new-task")).toBeInTheDocument();
    expect(screen.getByTestId("tasks")).toBeInTheDocument();
  });

  test("calls delete handler when delete button is clicked", async () => {
    const handleDeleteProject = jest.fn();
    const user = userEvent.setup();
    renderWithContext({
      handleDeleteProject,
      projectsState: {
        selectedProjectId: "project-1",
        projects: [
          {
            id: "project-1",
            title: "Marketing plan",
            description: "Outline channels and milestones.",
            dueDate: "2024-01-15",
            tasks: [],
            userMessage: null,
          },
        ],
      },
    });

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleDeleteProject).toHaveBeenCalledTimes(1);
  });
});
