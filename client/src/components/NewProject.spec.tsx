import { render, screen } from "@testing-library/react";
import { ProjectContext, type ProjectContextValue } from "../store/context";
import { NewProject } from "./NewProject";

import { baseContext } from "../test/helper";

const renderWithContext = (overrides: Partial<ProjectContextValue> = {}) => {
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
