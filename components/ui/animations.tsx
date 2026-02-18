"use client";

import { motion } from "framer-motion";
import {
  fadeIn,
  fadeInTransition,
  slideUp,
  slideUpTransition,
  staggerContainer,
  staggerItem,
  hoverScale,
  tapScale,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export { fadeIn, slideUp, staggerContainer, hoverScale, tapScale };
export { fadeInTransition, slideUpTransition, staggerItem };

type MotionDivProps = React.ComponentProps<typeof motion.div>;

export function FadeIn({
  children,
  className,
  delay = 0,
  ...rest
}: MotionDivProps & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      transition={{ ...fadeInTransition, delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({
  children,
  className,
  delay = 0,
  ...rest
}: MotionDivProps & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideUp}
      transition={{ ...slideUpTransition, delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...rest
}: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={staggerContainer}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: MotionDivProps) {
  return (
    <motion.div variants={staggerItem} className={cn(className)} {...rest}>
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  className,
  ...rest
}: MotionDivProps) {
  return (
    <motion.div
      whileHover={hoverScale}
      whileTap={tapScale}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
