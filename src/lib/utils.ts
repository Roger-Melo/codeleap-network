import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = "https://dev.codeleap.co.uk/careers/"

export async function delay(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const generateTempTimestamp = () => {
  const now = new Date()
  const iso = now.toISOString()
  const [date, time] = iso.split('T')
  const [hms, msAndZ] = time.split('.')
  const ms = msAndZ.slice(0, 3) // milliseconds part
  const extraMicroseconds = String(Math.floor(Math.random() * 1000)).padStart(3, '0') // fake microseconds
  return `${date}T${hms}.${ms}${extraMicroseconds}Z`
}
