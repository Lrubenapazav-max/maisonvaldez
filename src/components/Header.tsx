"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useCart } from "@/store/cart";

const navLinks = [
  { href: "#collection", label: "Colección" },
  { href: "#maison", label: "La casa" },
  { href: "#contact", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md border-b border-matte/5 py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="group flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Abrir menú"
          >
            <span className="block h-px w-6 bg-matte transition-all duration-500 group-hover:w-8" />
            <span className="block h-px w-4 bg-matte transition-all duration-500 group-hover:w-6" />
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] uppercase tracking-luxury text-matte/70 hover:text-matte transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo size="sm" />
          </Link>

          <motion.div
            className="flex items-center gap-6"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <nav className="hidden md:flex items-center gap-10">
              <Link
                href="#contact"
                className="text-[10px] uppercase tracking-luxury text-matte/70 hover:text-matte transition-colors duration-500"
              >
                Contacto
              </Link>
            </nav>

            <button
              type="button"
              onClick={toggleCart}
              className="relative group flex items-center gap-2 text-[10px] uppercase tracking-luxury text-matte/70 hover:text-matte transition-colors duration-500"
              aria-label="Carrito"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="transition-transform duration-500 group-hover:scale-110"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M6 6L5 3H2" />
              </svg>
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center bg-gold text-[9px] text-ivory">
                  {count}
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ivory md:hidden"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-12"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="absolute top-8 right-6 text-[10px] uppercase tracking-luxury text-matte/60"
              >
                Cerrar
              </button>
              <Logo size="md" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-light text-matte tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
