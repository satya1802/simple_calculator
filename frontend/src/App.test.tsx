import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("renders a screen inside the app shell and shows its menu", () => {
    render(
      <MemoryRouter initialEntries={["/calculator"]}>
        <App />
      </MemoryRouter>,
    );
    // getAllByText, not getByText: the page may repeat its menu item's text.
    expect(screen.getAllByText("Calculator").length).toBeGreaterThan(0);
  });

  it("[AC-016] activating the clear control via button resets the display to its initial state after numbers were entered", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/calculator"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("3-btn"));

    await user.click(screen.getByTestId("c-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("Ready when you are");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });

  it("[AC-016] activating the clear control via button resets the display to its initial state after a result is displayed", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/calculator"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");

    await user.click(screen.getByTestId("c-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("Ready when you are");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });

  it("[AC-016] activating the clear control via the keyboard (Escape) resets the display to its initial state", () => {
    render(
      <MemoryRouter initialEntries={["/calculator"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: "7" });
    fireEvent.keyDown(window, { key: "+" });
    fireEvent.keyDown(window, { key: "2" });

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("Ready when you are");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });

  it("[AC-016] activating the clear control via the keyboard (Delete) resets the display to its initial state", () => {
    render(
      <MemoryRouter initialEntries={["/calculator"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: "9" });
    fireEvent.keyDown(window, { key: "Delete" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("Ready when you are");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });
});
