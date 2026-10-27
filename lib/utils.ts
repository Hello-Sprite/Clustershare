/** Small class helper: this project has no Tailwind or conflicting utility classes. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
