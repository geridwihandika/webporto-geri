"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?`-=[]\\;',./";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  speed?: number;
  scrambleOnMount?: boolean;
}

export default function ScrambleText({
  text,
  className = "",
  as: Component = "span",
  speed = 25,
  scrambleOnMount = false,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    let iteration = 0;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      iteration += 1 / 2;

      if (iteration >= text.length) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
        isRunningRef.current = false;
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    setDisplayText(text);
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, scrambleOnMount, startScramble]);

  return (
    <Component
      onMouseEnter={startScramble}
      className={`inline-block cursor-default select-none ${className}`}
    >
      {displayText}
    </Component>
  );
}
