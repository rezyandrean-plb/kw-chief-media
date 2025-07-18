"use client";
import { useEffect, useState } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  // Return a consistent value during SSR and initial client render
  if (!mounted) {
    return <>{new Date().getFullYear()}</>;
  }

  return <>{year}</>;
} 