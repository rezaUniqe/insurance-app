import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findArrayInObject(obj: Record<string, unknown>): string[] {
  return Object.values(obj).find(value => Array.isArray(value))??[];
}