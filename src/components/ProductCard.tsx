"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice, getTotalStock } from "@/lib/stock-utils";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const totalStock = getTotalStock(product);
  const isLowStock = totalStock > 0 && totalStock <= 3;

  return (
    <>
      <motion.article
        className="group cursor-pointer"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.9,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <motion.div
          className="relative aspect-[3/4] overflow-hidden bg-pearl mb-5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-1000 ease-luxury ${
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} — vista alternativa`}
            fill
            className={`object-cover transition-all duration-1000 ease-luxury ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <motion.div
            className="absolute inset-0 bg-matte/0 group-hover:bg-matte/5 transition-colors duration-700"
          />

          {totalStock === 0 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-ivory/80"
              initial={false}
              animate={{ opacity: 1 }}
            >
              <span className="text-[10px] uppercase tracking-luxury text-matte/60">
                Agotado
              </span>
            </motion.div>
          )}

          {isLowStock && totalStock > 0 && (
            <div className="absolute top-4 left-4">
              <span className="text-[9px] uppercase tracking-luxury text-ivory bg-matte/70 px-3 py-1.5">
                Últimas unidades
              </span>
            </div>
          )}

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury"
          >
            <span className="text-[10px] uppercase tracking-luxury text-ivory bg-matte/80 px-4 py-2 inline-block">
              Ver detalle
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-1.5"
          initial={false}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[9px] uppercase tracking-luxury text-silver">
            {product.collection}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-light text-matte tracking-wide">
            {product.name}
          </h3>
          <p className="text-sm font-light text-charcoal/70 tracking-wide">
            {formatPrice(product.price, product.currency)}
          </p>
        </motion.div>
      </motion.article>

      <ProductModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
