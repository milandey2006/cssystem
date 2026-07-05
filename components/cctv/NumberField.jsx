"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

// Numeric input backed by external state (a Zustand store) needs its own
// local text buffer: without it, clearing the field to type a new number gets
// immediately overwritten by the old committed value on every keystroke.
export function NumberField({ id, value, onCommit, min, max, step, className }) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const commit = () => {
    const parsed = Number(text);
    if (text.trim() === "" || Number.isNaN(parsed)) {
      setText(String(value));
      return;
    }
    let next = parsed;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    setText(String(next));
    if (next !== value) onCommit(next);
  };

  return (
    <Input
      id={id}
      type="number"
      min={min}
      max={max}
      step={step}
      className={className}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.target.blur();
      }}
    />
  );
}
