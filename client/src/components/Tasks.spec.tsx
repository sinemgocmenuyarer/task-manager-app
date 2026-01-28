import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tasks } from "./Tasks";
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
      <Tasks />
    </ProjectContext.Provider>,
  );
};

describe("Tasks", () => {
  test("renders empty state when no tasks and no user message", () => {
    renderWithContext();
    expect(
      screen.getByText(
        "This project does not have any tasks yet. Please add a new task by either generating with AI or adding manually.",
      ),
    ).toBeInTheDocument();
  });

  test("renders user message when present", () => {
    renderWithContext({
      projectsState: {
        selectedProjectId: "project-1",
        projects: [
          {
            id: "project-1",
            title: "Alpha",
            description: "A",
            dueDate: "2024-01-01",
            tasks: [],
            userMessage: "Please enter a valid task.",
          },
        ],
      },
    });

    expect(screen.getByText("Please enter a valid task.")).toBeInTheDocument();
  });

  test("renders tasks for selected project", () => {
    renderWithContext({
      projectsState: {
        selectedProjectId: "project-1",
        projects: [
          {
            id: "project-1",
            title: "Alpha",
            description: "A",
            dueDate: "2024-01-01",
            tasks: [
              { taskId: "task-a", text: "Task A" },
              { taskId: "task-c", text: "Task C" },
            ],
            userMessage: null,
          },
          {
            id: "project-2",
            title: "Beta",
            description: "B",
            dueDate: "2024-02-01",
            tasks: [{ taskId: "task-b", text: "Task B" }],
            userMessage: null,
          },
        ],
      },
    });

    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();
    expect(screen.getByText("Task C")).toBeInTheDocument();
  });

  test("calls delete handler with correct index", async () => {
    const handleDeleteTask = jest.fn();
    const user = userEvent.setup();

    renderWithContext({
      handleDeleteTask,
      projectsState: {
        selectedProjectId: "project-1",
        projects: [
          {
            id: "project-1",
            title: "Alpha",
            description: "A",
            dueDate: "2024-01-01",
            tasks: [
              { taskId: "task-a", text: "Task A" },
              { taskId: "task-b", text: "Task B" },
            ],
            userMessage: null,
          },
        ],
      },
    });

    const clearButtons = screen.getAllByRole("button", { name: "Clear" });
    await user.click(clearButtons[1]);

    expect(handleDeleteTask).toHaveBeenCalledTimes(1);
    expect(handleDeleteTask).toHaveBeenCalledWith("task-b");
  });
});
