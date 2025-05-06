import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = "https://dev.codeleap.co.uk/careers/"

export function getPostTimeCreation(timestamp: string) {
  const nowMiliseconds = Date.now()
  const createdMiliseconds = new Date(timestamp).getTime()
  const seconds = (nowMiliseconds - createdMiliseconds) / 1000

  if (seconds < 60) {
    return "just now"
  }

  const minutes = seconds / 60
  if (minutes < 60) {
    const m = Math.floor(minutes)
    return `${m} minute${m !== 1 ? "s" : ""} ago`
  }

  const hours = minutes / 60
  if (hours < 24) {
    const h = Math.floor(hours)
    return `${h} hour${h !== 1 ? "s" : ""} ago`
  }

  const days = hours / 24
  const d = Math.floor(days)
  return `${d} day${d !== 1 ? "s" : ""} ago`
}
