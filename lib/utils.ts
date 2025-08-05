import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullImageUrl(url: string) {
  if (!url) return "/placeholder.svg"
  return url.startsWith("/") ? `http://localhost:1337${url}` : url
}
