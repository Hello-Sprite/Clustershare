import { isValidElement } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { cn } from "../../lib/utils";

const seen = new Set<string>();
export interface RevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
}
/** Section-level enhancement. Static source markup remains usable without this bundle. */
export default function Reveal({
  children,
  className,
  index = 0,
}: RevealProps) {
  const reduced = useReducedMotion();
  const key = isValidElement<{ id?: string }>(children)
    ? children.props.id
    : undefined;
  const immediate =
    reduced ||
    typeof window === "undefined" ||
    !("IntersectionObserver" in window) ||
    !!(key && seen.has(key));
  const variants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.38,
        ease: "easeOut",
        delay: reduced ? 0 : Math.min(Math.max(index, 0) * 0.04, 0.12),
      },
    },
  };
  return (
    <motion.div
      className={cn("reveal-frame", className)}
      variants={variants}
      initial={immediate ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => {
        if (key) seen.add(key);
      }}
      onFocusCapture={(event) => {
        event.currentTarget.style.opacity = "1";
        event.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
