// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { X, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "Simple Calculator";
const SCREEN = "Calculator";
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const SYMBOL = { add: "+", sub: "−", mul: "×", div: "÷" };

// Row 3 → Row 7 of the keypad, in wireframe order. 12-column spans.
const KEYS = [
  {
    id: "clear",
    wf: "b-2-0",
    label: "C",
    aria: "Clear and start over",
    span: "col-span-6",
    kind: "clear",
  },
  { id: "div", wf: "b-2-1", label: "÷", aria: "Divide", span: "col-span-3", kind: "op" },
  { id: "mul", wf: "b-2-2", label: "×", aria: "Multiply", span: "col-span-3", kind: "op" },
  { id: "7", wf: "b-3-0", label: "7", aria: "Seven", span: "col-span-3", kind: "digit" },
  { id: "8", wf: "b-3-1", label: "8", aria: "Eight", span: "col-span-3", kind: "digit" },
  { id: "9", wf: "b-3-2", label: "9", aria: "Nine", span: "col-span-3", kind: "digit" },
  { id: "sub", wf: "b-3-3", label: "−", aria: "Subtract", span: "col-span-3", kind: "op" },
  { id: "4", wf: "b-4-0", label: "4", aria: "Four", span: "col-span-3", kind: "digit" },
  { id: "5", wf: "b-4-1", label: "5", aria: "Five", span: "col-span-3", kind: "digit" },
  { id: "6", wf: "b-4-2", label: "6", aria: "Six", span: "col-span-3", kind: "digit" },
  { id: "add", wf: "b-4-3", label: "+", aria: "Add", span: "col-span-3", kind: "op" },
  { id: "1", wf: "b-5-0", label: "1", aria: "One", span: "col-span-3", kind: "digit" },
  { id: "2", wf: "b-5-1", label: "2", aria: "Two", span: "col-span-3", kind: "digit" },
  { id: "3", wf: "b-5-2", label: "3", aria: "Three", span: "col-span-3", kind: "digit" },
  {
    id: "equals",
    wf: "b-5-3",
    label: "=",
    aria: "Equals, show the answer",
    span: "col-span-3",
    kind: "equals",
  },
  { id: "0", wf: "b-6-0", label: "0", aria: "Zero", span: "col-span-9", kind: "digit" },
  { id: "dot", wf: "b-6-1", label: ".", aria: "Decimal point", span: "col-span-3", kind: "digit" },
];

const ERRORS = {
  divzero: {
    title: "Cannot divide by zero",
    body: "Press C to start over.",
  },
  incomplete: {
    title: "That calculation is incomplete",
    body: "Check your entry and try again.",
  },
};

// Maps each key's internal id to the test id the approved screen spec requires.
const TESTID = {
  clear: "c-btn",
  div: "btn-1",
  mul: "btn-2",
  "7": "7-btn",
  "8": "8-btn",
  "9": "9-btn",
  sub: "btn-3",
  "4": "4-btn",
  "5": "5-btn",
  "6": "6-btn",
  add: "btn-4",
  "1": "1-btn",
  "2": "2-btn",
  "3": "3-btn",
  equals: "btn-5",
  "0": "0-btn",
  dot: "btn-6",
};

const BLANK = { expr: "", entry: "0", prev: null, op: null, fresh: true, done: false, error: null };
// The screen opens on a worked example; C returns it to BLANK. Nothing is stored anywhere.
const OPENING = {
  expr: "12.5 + 4",
  entry: "16.5",
  prev: null,
  op: null,
  fresh: true,
  done: true,
  error: null,
};

const fmt = (n) => {
  if (!Number.isFinite(n)) return "0";
  const r = Math.round((n + Number.EPSILON) * 1e10) / 1e10;
  if (Math.abs(r) >= 1e13) return r.toExponential(6);
  return String(r);
};

const apply = (a, op, b) => {
  if (op === "add") return a + b;
  if (op === "sub") return a - b;
  if (op === "mul") return a * b;
  return b === 0 ? null : a / b;
};

export default function Screen() {
  const [st, setSt] = React.useState(OPENING);
  const [flash, setFlash] = React.useState(null);

  React.useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 170);
    return () => clearTimeout(t);
  }, [flash]);

  const act = (id) => {
    setSt((s) => {
      if (id === "clear") return BLANK;

      if (/^[0-9]$/.test(id)) {
        if (s.error) return { ...s, error: null, entry: id, fresh: false, done: false };
        if (s.done) return { ...BLANK, entry: id, fresh: false };
        if (s.fresh) return { ...s, entry: id, fresh: false };
        if (s.entry.replace(/[-.]/g, "").length >= 14) return s;
        return { ...s, entry: s.entry === "0" ? id : s.entry + id };
      }

      if (id === "dot") {
        if (s.error) return { ...s, error: null, entry: "0.", fresh: false, done: false };
        if (s.done) return { ...BLANK, entry: "0.", fresh: false };
        if (s.fresh) return { ...s, entry: "0.", fresh: false };
        if (s.entry.includes(".")) return s; // never a second decimal point
        return { ...s, entry: s.entry + "." };
      }

      if (id === "add" || id === "sub" || id === "mul" || id === "div") {
        const sym = SYMBOL[id];
        if (s.error) {
          return {
            expr: `${s.entry} ${sym}`,
            entry: s.entry,
            prev: Number(s.entry),
            op: id,
            fresh: true,
            done: false,
            error: null,
          };
        }
        if (s.op && s.fresh && !s.done) return { ...s, error: ERRORS.incomplete };
        if (s.op && !s.fresh) {
          const out = apply(s.prev, s.op, Number(s.entry));
          if (out === null) return { ...s, error: ERRORS.divzero };
          const shown = fmt(out);
          return {
            expr: `${shown} ${sym}`,
            entry: shown,
            prev: out,
            op: id,
            fresh: true,
            done: false,
            error: null,
          };
        }
        return {
          expr: `${s.entry} ${sym}`,
          entry: s.entry,
          prev: Number(s.entry),
          op: id,
          fresh: true,
          done: false,
          error: null,
        };
      }

      if (id === "equals") {
        if (s.error) return s;
        if (!s.op) {
          if (s.done) return s;
          return { ...s, error: ERRORS.incomplete };
        }
        if (s.fresh) {
          return { ...s, error: ERRORS.incomplete };
        }
        const out = apply(s.prev, s.op, Number(s.entry));
        if (out === null) return { ...s, error: ERRORS.divzero };
        return {
          expr: `${fmt(s.prev)} ${SYMBOL[s.op]} ${s.entry}`,
          entry: fmt(out),
          prev: null,
          op: null,
          fresh: true,
          done: true,
          error: null,
        };
      }

      return s;
    });
  };

  const press = (id) => {
    setFlash({ id, at: Date.now() });
    act(id);
  };

  const pressRef = React.useRef(press);
  pressRef.current = press;

  React.useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const onKeyButton = target && target.closest && target.closest("[data-np-key]");
      if (onKeyButton && (e.key === "Enter" || e.key === " ")) return; // let the focused button act
      let id = null;
      if (/^[0-9]$/.test(e.key)) id = e.key;
      else if (e.key === "." || e.key === ",") id = "dot";
      else if (e.key === "+") id = "add";
      else if (e.key === "-") id = "sub";
      else if (e.key === "*" || e.key === "x" || e.key === "X") id = "mul";
      else if (e.key === "/") id = "div";
      else if (e.key === "Enter" || e.key === "=") id = "equals";
      else if (e.key === "Escape" || e.key === "Delete") id = "clear";
      if (!id) return;
      e.preventDefault();
      pressRef.current(id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const glass = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: brand.radius,
  };

  const keyStyle = (kind) => {
    if (kind === "equals") {
      return {
        background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`,
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: brand.radius,
        color: brand.backgroundColor,
        boxShadow: `0 0 44px ${mix(brand.accentColor, 55)}`,
      };
    }
    if (kind === "op") {
      return {
        backgroundColor: mix(brand.primaryColor, 12),
        border: `1px solid ${mix(brand.primaryColor, 45)}`,
        borderRadius: brand.radius,
        color: brand.primaryColor,
      };
    }
    if (kind === "clear") {
      return {
        backgroundColor: mix(brand.accentColor, 12),
        border: `1px solid ${mix(brand.accentColor, 45)}`,
        borderRadius: brand.radius,
        color: brand.accentColor,
      };
    }
    return { ...glass, color: "var(--brand-fg)" };
  };

  return (
    <div
      className="mx-auto w-full max-w-2xl space-y-6"
      style={{
        color: "var(--brand-fg)",
        fontFamily: brand.fontBody,
        "--np-focus": brand.primaryColor,
        "--np-glow": mix(brand.primaryColor, 60),
      }}
    >
      <style>{`
        .np-key { transition: transform .12s ease, background-color .2s ease, filter .2s ease, box-shadow .2s ease; }
        .np-key:hover { transform: translateY(-2px); }
        .np-key:active { transform: translateY(1px) scale(.985); }
        .np-glass:hover { background-color: rgba(255,255,255,0.14); }
        .np-tint:hover { filter: brightness(1.25); }
        .np-equals:hover { filter: brightness(1.08); }
        .np-key:focus-visible { outline: 3px solid var(--np-focus); outline-offset: 3px; }
        .np-key[data-flash="on"] { box-shadow: 0 0 0 2px var(--np-focus), 0 0 30px var(--np-glow); }
        .np-read { animation: np-rise .26s cubic-bezier(.2,.8,.3,1); }
        @keyframes np-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .np-alert { animation: np-fade .2s ease-out; }
        @keyframes np-fade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .np-key, .np-read, .np-alert { transition: none; animation: none; }
          .np-key:hover, .np-key:active { transform: none; }
        }
      `}</style>

      <header data-wf="b-0-0">
        <h1
          data-testid="calculator-title"
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ fontFamily: brand.fontHeading }}
        >
          {SCREEN}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
          {PRODUCT} — add, subtract, multiply and divide, decimals included.
        </p>
      </header>

      <article
        data-wf="b-1-0"
        data-testid="12-5-4-card"
        className="relative overflow-hidden p-6 backdrop-blur-xl sm:p-8"
        style={{ ...glass, boxShadow: "0 30px 70px -35px rgba(0,0,0,0.8)" }}
      >
        <div
          aria-hidden
          className="absolute -right-12 -top-16 h-52 w-52 rounded-full blur-[70px]"
          style={{
            backgroundColor: mix(st.error ? brand.accentColor : brand.primaryColor, 55),
            opacity: 0.7,
          }}
        />
        <div className="relative flex items-center justify-between gap-4">
          <p
            className="truncate text-sm font-semibold tabular-nums"
            style={{ color: "var(--brand-fg-muted)" }}
          >
            {st.expr || "Ready when you are"}
          </p>
          {st.done && !st.error ? (
            <span
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: mix(brand.primaryColor, 22), color: brand.primaryColor }}
            >
              <CheckCircle className="h-3.5 w-3.5" aria-hidden />
              Answer
            </span>
          ) : null}
        </div>

        <div className="relative mt-3" role="status" aria-live="polite">
          <span
            data-wf="i-1-0-0"
            key={st.entry + "|" + st.expr}
            className={`block break-all text-right text-5xl font-extrabold tabular-nums sm:text-6xl ${st.done && !st.error ? "np-read" : ""}`}
            style={{ fontFamily: brand.fontHeading, letterSpacing: "-0.02em" }}
          >
            {st.entry}
          </span>
        </div>

        <div className="relative mt-4 min-h-[3.25rem]">
          {st.error ? (
            <div
              role="alert"
              className="np-alert flex items-start gap-3 p-3"
              style={{
                backgroundColor: mix(brand.accentColor, 14),
                border: `1px solid ${mix(brand.accentColor, 45)}`,
                borderRadius: `calc(${brand.radius} - 4px)`,
              }}
            >
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: brand.accentColor }}
                aria-hidden
              />
              <p className="text-sm leading-snug">
                <span className="font-bold" style={{ color: brand.accentColor }}>
                  {st.error.title}.
                </span>{" "}
                <span style={{ color: "var(--brand-fg-muted)" }}>{st.error.body}</span>
              </p>
            </div>
          ) : (
            <p className="text-right text-xs" style={{ color: "var(--brand-fg-muted)" }}>
              {st.op
                ? `Enter the number after the ${SYMBOL[st.op]}, then press =`
                : "Pick ÷ × − or + to start a calculation"}
            </p>
          )}
        </div>
      </article>

      <h2 className="sr-only">Keypad</h2>
      <div role="group" aria-label="Calculator keypad" className="grid grid-cols-12 gap-3">
        {KEYS.map((k) => (
          <button
            key={k.id}
            type="button"
            data-wf={k.wf}
            data-testid={TESTID[k.id]}
            data-np-key={k.id}
            data-flash={flash && flash.id === k.id ? "on" : "off"}
            aria-label={k.aria}
            onClick={() => press(k.id)}
            className={`np-key ${k.span} ${k.kind === "digit" ? "np-glass" : k.kind === "equals" ? "np-equals" : "np-tint"} flex h-16 items-center justify-center text-2xl font-extrabold tabular-nums sm:h-20 sm:text-3xl`}
            style={keyStyle(k.kind)}
          >
            <span aria-hidden>{k.label}</span>
          </button>
        ))}
      </div>

      <p
        data-wf="b-7-0"
        className="p-4 text-sm leading-relaxed"
        style={{ ...glass, color: "var(--brand-fg-muted)" }}
      >
        Keyboard works too: type digits and . for decimals, use + − * / for operations, Enter for =,
        and Esc or Delete to clear.
      </p>

      <p
        data-wf="b-8-0"
        className="text-xs leading-relaxed"
        style={{ color: "var(--brand-fg-muted)" }}
      >
        No account, no sign-in and no payment needed. Every calculation runs in your browser and
        nothing is saved after you close or reload the page.
      </p>
    </div>
  );
}
