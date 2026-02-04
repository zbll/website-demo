import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

export function cn(...classes: ClassValue[]): string {
  // 合并条件类名，避免 Tailwind 冲突。
  return twMerge(clsx(...classes));
}
