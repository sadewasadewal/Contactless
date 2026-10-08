"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => {
      if (cursor) {
        cursor.style.transform = `translate(-50%, -50%) scale(0.85)`;
      }
    };

    const onMouseUp = () => {
      if (cursor) {
        cursor.style.transform = `translate(-50%, -50%) scale(1)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const loop = () => {
      currX += (mouseX - currX) * 0.18;
      currY += (mouseY - currY) * 0.18;

      if (cursor) {
        cursor.style.left = `${currX}px`;
        cursor.style.top = `${currY}px`;
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="cursor-wave" />
    </div>
  );
}
