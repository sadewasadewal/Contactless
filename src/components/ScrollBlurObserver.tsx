"use client";

import { useEffect } from "react";

export default function ScrollBlurObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".blur-reveal, .hero-title, .section-title, .editorial-quote, .section-tag"
    );

    // Initial class tag
    targets.forEach((el) => {
      el.classList.add("blur-reveal-target");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else {
            // If scrolled way above or below, optionally re-blur for dynamic scrolling effect
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove("is-revealed");
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
