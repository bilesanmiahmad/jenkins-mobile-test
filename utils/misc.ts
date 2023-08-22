import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const formatErrorMsgs = (msg: string) => {
  if (msg.includes("400")) {
    return "Invalid email or password";
  } else if (msg.includes("401")) {
    return "Invalid email or password";
  } else if (msg.includes("404")) {
    return "Invalid email or password";
  }
  setTimeout(() => {
    return msg;
  }, 1000);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
