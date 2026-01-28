import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenerateTaskButton } from "./GenerateTask";
import { ProjectContext, type ProjectContextValue } from "../store/context";

import { baseContext } from "../test/helper";

const renderWithContext = (overrides?: Partial<ProjectContextValue>) => {
  const value = { ...baseContext, ...overrides };
  return render(
    <ProjectContext.Provider value={value}>
      <GenerateTaskButton />
    </ProjectContext.Provider>,
  );
};

describe("GenerateTaskButton", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("submits prompt and adds tasks on success", async () => {
    const handleAddTasks = jest.fn();
    const handleUserMessage = jest.fn();

    const user = userEvent.setup();

    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        status: "success",
        steps: [
          { id: "1", title: "First task" },
          { id: "2", title: "  " },
        ],
        user_message: null,
      }),
    });

    renderWithContext({
      handleAddTasks,
      handleUserMessage,
    });

    await user.type(screen.getByLabelText("ai-task-input"), "Plan trip");
    await user.click(screen.getByRole("button", { name: "Generate with AI" }));

    await waitFor(() => {
      expect(handleAddTasks).toHaveBeenCalledWith(["First task"]);
    });

    expect(handleUserMessage).toHaveBeenCalledWith(null);
    expect(screen.getByLabelText("ai-task-input")).toHaveValue("");
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "Plan trip" }),
    });
  });

  test("shows user message when response has no steps", async () => {
    const handleAddTasks = jest.fn();
    const handleUserMessage = jest.fn();
    const user = userEvent.setup();

    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        status: "error",
        steps: [],
        user_message: "Please try again.",
      }),
    });

    renderWithContext({
      handleAddTasks,
      handleUserMessage,
    });

    await user.type(screen.getByLabelText("ai-task-input"), "Plan trip");
    await user.click(screen.getByRole("button", { name: "Generate with AI" }));

    expect(handleAddTasks).not.toHaveBeenCalled();
    expect(handleUserMessage).toHaveBeenCalledWith("Please try again.");
  });

  test("shows mapped user message for non-ok response", async () => {
    const handleAddTasks = jest.fn();
    const handleUserMessage = jest.fn();
    const user = userEvent.setup();

    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: "InvalidRequest",
      }),
    });

    renderWithContext({
      handleAddTasks,
      handleUserMessage,
    });

    await user.type(screen.getByLabelText("ai-task-input"), "Plan trip");
    await user.click(screen.getByRole("button", { name: "Generate with AI" }));

    expect(handleAddTasks).not.toHaveBeenCalled();
    expect(handleUserMessage).toHaveBeenCalledWith(
      "Please enter a valid task prompt.",
    );
  });
});
