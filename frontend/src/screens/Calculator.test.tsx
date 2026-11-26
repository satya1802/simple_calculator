import { fireEvent, render, screen } from "@testing-library/react";
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

  it("[AC-003] displays the correct difference of two whole numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-3")); // −
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("7");
  });

  it("[AC-003] displays the correct difference when both operands are decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("9-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-3")); // −
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("7.25");
  });

  it("[AC-004] displays a negative result correctly when the subtraction result is negative", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-3")); // −
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("-7");
  });

  it("[AC-004] displays a negative decimal result correctly when the subtraction result is negative", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-3")); // −
    await user.click(screen.getByTestId("9-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("7-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("-7.25");
  });

  it("[AC-005] displays the correct product of two whole numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-2")); // ×
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("6");
  });

  it("[AC-005] displays the correct product when the first operand has more than one digit", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-2")); // ×
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("36");
  });

  it("[AC-006] displays the correct product when both operands are decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-2")); // ×
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.75");
  });

  it("[AC-006] rounds away floating point drift when multiplying decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-2")); // ×
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0.3");
  });

  it("[AC-007] displays the correct quotient of two whole numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("4");
  });

  it("[AC-007] displays the correct quotient when the first operand has more than one digit", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("4-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");
  });

  it("[AC-007] shows the incomplete-calculation message when requesting the result without entering a second number", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "That calculation is incomplete. Check your entry and try again.",
    );
  });

  it("[AC-007] shows the divide-by-zero message when the second number is zero", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "Cannot divide by zero. Press C to start over.",
    );
  });

  it("[AC-008] displays the decimal quotient when division produces a decimal result", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("2.5");
  });

  it("[AC-008] rounds away floating point drift when dividing decimal numbers", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3");
  });

  it("opens on a worked decimal addition example showing its correct sum", () => {
    render(<Calculator />);

    expect(screen.getByTestId("calculator-title")).toHaveTextContent("Calculator");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("16.5");
  });

  it("[AC-009] displays the result on the same render pass, with no waiting for it to appear", () => {
    render(<Calculator />);

    // fireEvent dispatches synchronously: if the result needed a later tick (a
    // network round-trip or a reload) it would not yet be on screen here.
    fireEvent.click(screen.getByTestId("c-btn"));
    fireEvent.click(screen.getByTestId("2-btn"));
    fireEvent.click(screen.getByTestId("btn-4")); // +
    fireEvent.click(screen.getByTestId("3-btn"));
    fireEvent.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");
  });

  it("[AC-009] shows the result in the same page without any page reload", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    // The title node is captured before the calculation and checked for
    // identity afterwards: a page reload would unmount and remount it.
    const titleBeforeResult = screen.getByTestId("calculator-title");

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("8-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("20");
    expect(screen.getByTestId("calculator-title")).toBe(titleBeforeResult);
  });

  it("[AC-009] keeps keypad buttons as plain buttons, so pressing = never submits a form or reloads the page", () => {
    render(<Calculator />);

    expect(screen.getByTestId("btn-5")).toHaveAttribute("type", "button");
    expect(document.querySelector("form")).toBeNull();
  });
});
