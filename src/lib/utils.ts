import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format target date for display in abbreviated format
 */
export function formatDisplayTargetDate(dateString?: string): string | null {
  if (!dateString) return null;

  try {
    // Parse the ISO date string
    const targetDate = new Date(dateString);

    // Format to match "Mar 17, 08:51 PM" pattern
    const month = targetDate.toLocaleString("en-US", { month: "short" });
    const day = targetDate.getDate();
    const hour = targetDate.getHours() % 12 || 12;
    const minute = targetDate.getMinutes().toString().padStart(2, "0");
    const period = targetDate.getHours() >= 12 ? "PM" : "AM";

    return `${month} ${day}, ${hour}:${minute} ${period}`;
  } catch (error) {
    console.error("Error formatting target date:", error);
    return null;
  }
}
