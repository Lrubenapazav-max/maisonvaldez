"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer id="contact" className="bg-matte text-ivory py-20 md:py-28">
      <motion.div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Logo size="md" variant="light" />
          <motion.div className="luxury-line w-24 my-10 opacity-30" />
          <p className="text-[10px] uppercase tracking-luxury text-silver-light/60 max-w-sm">
            Con cita previa
          </p>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-ivory/10">
          <p className="text-[9px] uppercase tracking-luxury text-silver-light/40">
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
          <Link
            href="/admin"
            className="text-[9px] uppercase tracking-luxury text-silver-light/40 hover:text-gold-light transition-colors duration-500"
          >
            Administración
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
}
