"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimatedPageWrapperProps = {
  children: React.ReactNode;
  className?: string;
  /** Use stagger so direct children animate in sequence */
  stagger?: boolean;
};

export function AnimatedPageWrapper({
  children,
  className,
  stagger = true,
}: AnimatedPageWrapperProps) {
  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className={cn("space-y-6", className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Wrap each top-level section so it participates in stagger */
export function AnimatedPageSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section variants={staggerItem} className={cn(className)}>
      {children}
    </motion.section>
  );
}
