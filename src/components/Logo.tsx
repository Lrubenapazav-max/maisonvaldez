"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "dark" | "light";
  className?: string;
  animated?: boolean;
}

const sizes = {
  sm: { main: "text-lg" },
  md: { main: "text-2xl" },
  lg: { main: "text-4xl" },
  hero: { main: "text-5xl md:text-7xl lg:text-8xl" },
};

export function Logo({
  size = "md",
  variant = "dark",
  className = "",
  animated = false,
}: LogoProps) {
  const s = sizes[size];
  const textColor = variant === "light" ? "text-ivory" : "text-matte";

  const content = (
    <>
      <span
        className={`font-display font-light ${s.main} leading-none tracking-[0.08em] ${textColor}`}
      >
        Maison
      </span>
      <span
        className={`block font-display font-medium ${s.main} leading-none tracking-[0.12em] ${textColor} mt-0.5`}
      >
        Valdezzani
      </span>
    </>
  );

  if (animated) {
    return (
      <motion.div
        className={`text-center ${className}`}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.div>
    );
  }

  return <motion.div className={`text-center ${className}`}>{content}</motion.div>;
}
