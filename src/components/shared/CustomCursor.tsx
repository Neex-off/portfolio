"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (el) {
        el.style.transform = `translate(${posRef.current.x - 10}px, ${posRef.current.y - 10}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleEnter = () => {
      if (el) el.style.opacity = "1";
    };
    const handleLeave = () => {
      if (el) el.style.opacity = "0";
    };
    const handleLinkEnter = () => {
      if (el) {
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.marginLeft = "-10px";
        el.style.marginTop = "-10px";
        el.style.background = "rgba(168, 85, 247, 0.4)";
      }
    };
    const handleLinkLeave = () => {
      if (el) {
        el.style.width = "20px";
        el.style.height = "20px";
        el.style.marginLeft = "0";
        el.style.marginTop = "0";
        el.style.background = "rgba(168, 85, 247, 0.7)";
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{ opacity: 0, transition: "width 0.2s, height 0.2s, opacity 0.2s" }}
      aria-hidden="true"
    />
  );
}
