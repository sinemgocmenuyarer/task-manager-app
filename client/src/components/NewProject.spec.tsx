import { render, screen } from "@testing-library/react";
import { ProjectContext, type ProjectContextValue } from "../store/core";
import { NewProject } from "./NewProject";

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
      <NewProject />
    </ProjectContext.Provider>,
  );
};

describe("NewProject", () => {
  test("renders NewProject component", () => {
    renderWithContext();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
