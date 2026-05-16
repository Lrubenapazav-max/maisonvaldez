"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Logo } from "./Logo";
import { SITE_CONFIG } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988351-763728e1935b?w=1920&q=85"
          alt="Maison Valdezzani"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-ivory/90 via-ivory/75 to-ivory"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto pt-24">
        <Logo size="hero" animated />

        <motion.div
          className="luxury-line w-24 my-10 md:my-14"
          initial={false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="font-sans text-sm md:text-base font-extralight tracking-[0.25em] uppercase text-charcoal/80 max-w-md text-balance"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <a href="#collection" className="luxury-btn">
            Descubrir
          </a>
          <a href="#maison" className="luxury-btn border-matte/30 text-matte/70 hover:text-ivory">
            La casa
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-luxury text-silver">
          Desplazar
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
