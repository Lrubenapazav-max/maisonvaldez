"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MaisonSection() {
  return (
    <section id="maison" className="py-24 md:py-40 bg-pearl/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1558176288-9e799f39cdef?w=1200&q=80"
              alt="El taller Maison Valdezzani"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[9px] uppercase tracking-luxury text-gold mb-4">
              La casa
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-matte tracking-wide mb-8">
              La excelencia<br />sin concesiones
            </h2>
            <div className="luxury-line w-20 mb-8" />
            <p className="text-sm md:text-base font-light text-charcoal/70 leading-relaxed mb-6">
              Fundada en los valores de la artesanía europea, Maison Valdezzani
              encarna una visión del lujo donde cada pieza cuenta una historia de
              elegancia, precisión y refinamiento absoluto.
            </p>
            <p className="text-sm md:text-base font-light text-charcoal/60 leading-relaxed">
              Nuestras colecciones se conciben en el espíritu de las grandes casas
              de costura — materiales nobles, cortes impecables y acabados
              excepcionales para una clientela exigente.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
