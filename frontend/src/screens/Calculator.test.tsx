import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Calculator from "./Calculator";

describe("Calculator", () => {
  it("[AC-001] displays the correct sum of two whole numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    // Start from a clean slate: the screen opens on a worked example.
    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");
  });

  it("[AC-001] displays the correct sum when the first operand has more than one digit", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("8-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("20");
  });

  it("[AC-002] displays the correct sum when both operands are decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.75");
  });

  it("[AC-002] rounds away floating point drift when adding decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0.3");
  });

  it("opens on a worked decimal addition example showing its correct sum", () => {
    render(<Calculator />);

    expect(screen.getByTestId("calculator-title")).toHaveTextContent("Calculator");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("16.5");
  });
});
