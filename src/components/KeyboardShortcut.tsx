"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcut() {
  const router = useRouter();

  useEffect(() => {
    let sequence = "";
    const target = "delta";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form fields
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }
      
      sequence += e.key.toLowerCase();
      
      // Keep sequence length limited to the target word's length
      if (sequence.length > target.length) {
        sequence = sequence.slice(-target.length);
      }

      if (sequence === target) {
        // Trigger dashboard navigation
        router.push("/dashboard");
        sequence = ""; // Reset after trigger
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null; // This component doesn't render anything visually
}
