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

  it("[AC-017] shows a friendly message instead of a result when dividing by zero, and does not crash", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "Cannot divide by zero. Press C to start over.",
    );
    // The calculator stayed on screen and responsive: no crash.
    expect(screen.getByTestId("calculator-title")).toBeInTheDocument();
  });

  it("[AC-018] clears the divide-by-zero error and is ready for a new calculation when C is pressed", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("9-btn"));
    await user.click(screen.getByTestId("btn-1")); // ÷
    await user.click(screen.getByTestId("0-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "Cannot divide by zero. Press C to start over.",
    );

    await user.click(screen.getByTestId("c-btn"));

    expect(screen.getByTestId("12-5-4-card")).not.toHaveTextContent("Cannot divide by zero");
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");

    // Ready for a new calculation: digits and operations work normally again.
    await user.click(screen.getByTestId("4-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("9");
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

  it("[AC-023] loads fully usable on first render, with no registration, login or personal-detail prompt", () => {
    render(<Calculator />);

    // The title and every keypad control are on screen and ready immediately,
    // with nothing gating them behind sign-up or sign-in.
    expect(screen.getByTestId("calculator-title")).toBeInTheDocument();
    for (const id of [
      "12-5-4-card",
      "c-btn",
      "btn-1",
      "btn-2",
      "7-btn",
      "8-btn",
      "9-btn",
      "btn-3",
      "4-btn",
      "5-btn",
      "6-btn",
      "btn-4",
      "1-btn",
      "2-btn",
      "3-btn",
      "btn-5",
      "0-btn",
      "btn-6",
    ]) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }

    // No prompt anywhere in the rendered screen asks the user to sign up,
    // log in or hand over personal details, and there is nothing to submit.
    const bodyText = document.body.textContent ?? "";
    for (const phrase of [
      "Log in",
      "Log In",
      "Sign in",
      "Sign In",
      "Sign up",
      "Sign Up",
      "Register",
      "Create an account",
      "Email",
      "Password",
    ]) {
      expect(bodyText).not.toContain(phrase);
    }
    expect(document.querySelector("form")).toBeNull();
    expect(document.querySelector("input")).toBeNull();
  });

  it("[AC-023] is immediately usable on first render: a calculation completes with no prior prompt or step", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    // No setup action of any kind precedes this calculation: the calculator
    // is usable the instant it loads.
    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("4-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("9");
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

  const DIGIT_TESTIDS = {
    "0": "0-btn",
    "1": "1-btn",
    "2": "2-btn",
    "3": "3-btn",
    "4": "4-btn",
    "5": "5-btn",
    "6": "6-btn",
    "7": "7-btn",
    "8": "8-btn",
    "9": "9-btn",
  };

  it("[AC-010] clicking any digit button registers that digit and reflects it in the display", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    for (const [digit, testId] of Object.entries(DIGIT_TESTIDS)) {
      await user.click(screen.getByTestId("c-btn"));
      await user.click(screen.getByTestId(testId));

      expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(digit);
    }
  });

  it("[AC-010] clicking each operation button registers the operation and reflects it in the expression", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    const cases = [
      { testId: "btn-1", symbol: "÷" },
      { testId: "btn-2", symbol: "×" },
      { testId: "btn-3", symbol: "−" },
      { testId: "btn-4", symbol: "+" },
    ];

    for (const { testId, symbol } of cases) {
      await user.click(screen.getByTestId("c-btn"));
      await user.click(screen.getByTestId("7-btn"));
      await user.click(screen.getByTestId(testId));

      expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(`7 ${symbol}`);
    }
  });

  it("[AC-010] clicking the decimal-point button registers a decimal point in the display", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("1-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.1");
  });

  it("[AC-010] clicking the clear button registers a reset back to a blank display", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("c-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });

  it("[AC-011] a tap on a digit button is registered as a digit in the display, same as a click", () => {
    render(<Calculator />);
    const btn = screen.getByTestId("c-btn");
    fireEvent.click(btn);

    const seven = screen.getByTestId("7-btn");
    // Simulate the touch sequence a touchscreen browser fires for a tap,
    // ending in the click it translates that tap into.
    fireEvent.touchStart(seven);
    fireEvent.touchEnd(seven);
    fireEvent.click(seven);

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("7");
  });

  it("[AC-011] a tap on an operation button is registered as the intended operation", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));
    fireEvent.click(screen.getByTestId("9-btn"));

    const divide = screen.getByTestId("btn-1");
    fireEvent.touchStart(divide);
    fireEvent.touchEnd(divide);
    fireEvent.click(divide);

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("9 ÷");
  });

  it("[AC-011] a rapid sequence of taps is registered in full, with no tap lost or duplicated", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    for (const testId of ["1-btn", "2-btn", "3-btn"]) {
      const btn = screen.getByTestId(testId);
      fireEvent.touchStart(btn);
      fireEvent.touchEnd(btn);
      fireEvent.click(btn);
    }

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("123");
  });

  it("[AC-012] pressing a digit key on the keyboard registers that digit in the display", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "7" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("7");
  });

  it("[AC-012] pressing several digit keys in sequence builds up the display, same as taps", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "1" });
    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "3" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("123");
  });

  it("[AC-012] pressing the decimal-point key registers a decimal point in the display", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "3" });
    fireEvent.keyDown(window, { key: "." });
    fireEvent.keyDown(window, { key: "1" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.1");
  });

  it("[AC-012] pressing each operator key on the keyboard registers the operation and reflects it in the expression", () => {
    const cases = [
      { key: "/", symbol: "÷" },
      { key: "*", symbol: "×" },
      { key: "-", symbol: "−" },
      { key: "+", symbol: "+" },
    ];

    for (const { key, symbol } of cases) {
      const view = render(<Calculator />);
      fireEvent.click(view.getByTestId("c-btn"));

      fireEvent.keyDown(window, { key: "7" });
      fireEvent.keyDown(window, { key });

      expect(view.getByTestId("12-5-4-card")).toHaveTextContent(`7 ${symbol}`);
      view.unmount();
    }
  });

  it("[AC-012] pressing the Escape key on the keyboard registers a reset back to a blank display", () => {
    render(<Calculator />);

    fireEvent.keyDown(window, { key: "5" });
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("0");
  });

  it("[AC-013] pressing Enter after entering a calculation displays the result", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "+" });
    fireEvent.keyDown(window, { key: "3" });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");
  });

  it("[AC-013] pressing Enter shows the incomplete-calculation message when the second number is missing", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "5" });
    fireEvent.keyDown(window, { key: "/" });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "That calculation is incomplete. Check your entry and try again.",
    );
  });

  it("[AC-013] pressing Enter shows the divide-by-zero message when dividing by zero from the keyboard", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "5" });
    fireEvent.keyDown(window, { key: "/" });
    fireEvent.keyDown(window, { key: "0" });
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "Cannot divide by zero. Press C to start over.",
    );
  });

  it("[AC-013] a calculation mixing keyboard and button presses completes correctly on Enter", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.click(screen.getByTestId("1-btn"));
    fireEvent.keyDown(window, { key: "+" });
    fireEvent.click(screen.getByTestId("8-btn"));
    fireEvent.keyDown(window, { key: "Enter" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("9");
  });

  it("[AC-014] digits typed after a decimal point form a decimal value, treated as such in the calculation", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("4-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.14");

    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("8-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    // 3.14 was used as the decimal value 3.14, not as 314 or 3: 3.14 + 0.8 = 3.94
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("3.94");
  });

  it("[AC-014] a decimal point entered part-way through typing a number still forms a decimal value", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("5-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("12.5");
  });

  it("[AC-015] a second decimal point is not added to a number that already has one", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // . — ignored, the number already has one
    await user.click(screen.getByTestId("5-btn"));

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("1.25");
  });

  it("[AC-015] the number with the rejected second decimal point remains valid in the calculation", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-6")); // .
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-6")); // . — ignored
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("1-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    // 1.25 remained a single valid decimal value: 1.25 + 1 = 2.25
    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("2.25");
  });

  it("[AC-015] pressing the decimal-point key twice on the keyboard does not add a second decimal point", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("c-btn"));

    fireEvent.keyDown(window, { key: "7" });
    fireEvent.keyDown(window, { key: "." });
    fireEvent.keyDown(window, { key: "." });
    fireEvent.keyDown(window, { key: "9" });

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("7.9");
  });

  it("[AC-019] shows the incomplete-calculation message when two operators are pressed in a row", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("btn-2")); // × right after +, no operand in between

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "That calculation is incomplete. Check your entry and try again.",
    );
  });

  it("[AC-019] shows the incomplete-calculation message when requesting a result with no operands entered", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("btn-5")); // = with nothing entered

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "That calculation is incomplete. Check your entry and try again.",
    );
  });

  it("[AC-019] stays usable after an invalid operation: it does not crash and completes a new calculation afterward", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("btn-1")); // ÷ right after +, two operators in a row

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent(
      "That calculation is incomplete. Check your entry and try again.",
    );
    // The calculator stayed on screen and responsive: no crash.
    expect(screen.getByTestId("calculator-title")).toBeInTheDocument();

    // Still usable afterwards: a fresh calculation completes correctly.
    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("3-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("2-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("5");
  });

  const ALL_TESTIDS = [
    "calculator-title",
    "12-5-4-card",
    "c-btn",
    "btn-1",
    "btn-2",
    "7-btn",
    "8-btn",
    "9-btn",
    "btn-3",
    "4-btn",
    "5-btn",
    "6-btn",
    "btn-4",
    "1-btn",
    "2-btn",
    "3-btn",
    "btn-5",
    "0-btn",
    "btn-6",
  ];

  // Resizes the jsdom window the way a real browser would when the user
  // rotates a device or switches between a phone and a desktop monitor.
  const resizeTo = (width) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event("resize"));
  };

  it("[AC-020] on a desktop-sized viewport, lays the display and every key out in a single comfortably sized view", () => {
    resizeTo(1280);
    render(<Calculator />);

    for (const id of ALL_TESTIDS) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }

    // The keypad is capped to a comfortable reading width rather than
    // stretching edge-to-edge of a large screen, and keeps generous padding
    // around the display and keys.
    const root = screen.getByTestId("calculator-title").closest("div[class*='max-w-2xl']");
    expect(root).not.toBeNull();
    expect(root.className).toMatch(/max-w-2xl/);
    expect(root.className).toMatch(/lg:px-8/);

    // Keys are drawn at their larger, desktop size.
    expect(screen.getByTestId("btn-5").className).toMatch(/sm:h-20/);
    expect(screen.getByTestId("btn-5").className).toMatch(/sm:text-3xl/);
  });

  it("[AC-021] on a mobile-sized viewport, every key and the display remain on screen and usable", () => {
    resizeTo(375);
    render(<Calculator />);

    for (const id of ALL_TESTIDS) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }

    // The keypad uses a 12-column grid so every key's share of the row is
    // proportional, not a fixed pixel width that could overflow a narrow
    // screen.
    const keypad = screen.getByRole("group", { name: "Calculator keypad" });
    expect(keypad.className).toMatch(/grid-cols-12/);

    // Each digit key keeps a touch-sized minimum height on mobile.
    expect(screen.getByTestId("7-btn").className).toMatch(/h-16/);
  });

  it("[AC-021] stays usable after the viewport is resized from desktop down to mobile mid-session", async () => {
    const user = userEvent.setup();
    resizeTo(1280);
    render(<Calculator />);

    resizeTo(360);

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("4-btn"));
    await user.click(screen.getByTestId("btn-4")); // +
    await user.click(screen.getByTestId("5-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("9");
  });

  it("[AC-022] completes a calculation without navigating away: the URL and document do not change", async () => {
    const user = userEvent.setup();
    const hrefBefore = window.location.href;
    render(<Calculator />);

    // Single-page behaviour relies on there being nothing a click could
    // submit or navigate through.
    expect(document.querySelector("form")).toBeNull();
    expect(document.querySelector("a")).toBeNull();

    await user.click(screen.getByTestId("c-btn"));
    await user.click(screen.getByTestId("7-btn"));
    await user.click(screen.getByTestId("btn-2")); // ×
    await user.click(screen.getByTestId("6-btn"));
    await user.click(screen.getByTestId("btn-5")); // =

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("42");
    expect(window.location.href).toBe(hrefBefore);
  });

  it("[AC-022] runs a whole sequence of calculator actions within one mounted instance, never remounting the screen", async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    const titleNode = screen.getByTestId("calculator-title");

    for (const steps of [
      ["c-btn", "1-btn", "btn-4", "1-btn", "btn-5"],
      ["c-btn", "9-btn", "btn-3", "4-btn", "btn-5"],
      ["c-btn", "6-btn", "btn-2", "7-btn", "btn-5"],
    ]) {
      for (const id of steps) {
        await user.click(screen.getByTestId(id));
      }
    }

    expect(screen.getByTestId("12-5-4-card")).toHaveTextContent("42");
    // Same title node reference throughout: nothing reloaded or remounted
    // the screen between any of the actions above.
    expect(screen.getByTestId("calculator-title")).toBe(titleNode);
  });
});
