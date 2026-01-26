import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectSidebar } from "./ProjectSidebar";
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
      <ProjectSidebar />
    </ProjectContext.Provider>,
  );
};

describe("ProjectSidebar", () => {
  test("renders project list and add button", () => {
    renderWithContext({
      projectsState: {
        projects: [
          {
            id: "project-1",
            title: "Alpha",
            description: "A",
            dueDate: "2024-01-01",
            tasks: [],
            userMessage: null,
          },
          {
            id: "project-2",
            title: "Beta",
            description: "B",
            dueDate: "2024-02-01",
            tasks: [],
            userMessage: null,
          },
        ],
      },
    });

    expect(
      screen.getByRole("heading", { name: "Your Project" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beta" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "+ Add Project" }),
    ).toBeInTheDocument();
  });

  test("calls handleSelectProject for selected project", async () => {
    const handleSelectProject = jest.fn();
    const user = userEvent.setup();
    renderWithContext({
      handleSelectProject,
      projectsState: {
        projects: [
          {
            id: "project-1",
            title: "Alpha",
            description: "A",
            dueDate: "2024-01-01",
            tasks: [],
            userMessage: null,
          },
          {
            id: "project-2",
            title: "Beta",
            description: "B",
            dueDate: "2024-02-01",
            tasks: [],
            userMessage: null,
          },
        ],
      },
    });

    await user.click(screen.getByRole("button", { name: "Beta" }));

    expect(handleSelectProject).toHaveBeenCalledTimes(1);
    expect(handleSelectProject).toHaveBeenCalledWith("project-2");
  });

  test("calls handleAddProject when add button clicked", async () => {
    const handleAddProject = jest.fn();
    const user = userEvent.setup();
    renderWithContext({ handleAddProject });

    await user.click(screen.getByRole("button", { name: "+ Add Project" }));

    expect(handleAddProject).toHaveBeenCalledTimes(1);
  });
});
