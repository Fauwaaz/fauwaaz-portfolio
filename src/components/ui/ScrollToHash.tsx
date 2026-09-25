"use client";

import { useEffect } from "react";

/** Scrolls to #hash on first render, e.g. when arriving at /work/slug#section. */
export function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return null;
}
