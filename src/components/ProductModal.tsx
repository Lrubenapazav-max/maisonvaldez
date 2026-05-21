"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/product";
import {
  formatPrice,
  getSizesForColor,
  getStock,
} from "@/lib/stock-utils";
import { useCart } from "@/store/cart";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  const sizes = getSizesForColor(product, selectedColor);
  const stock = selectedSize
    ? getStock(product, selectedColor, selectedSize)
    : 0;
  const imageFit = product.image.startsWith("/")
    ? "object-contain"
    : "object-cover";

  useEffect(() => {
    if (isOpen) {
      setSelectedColor(product.colors[0]?.name ?? "");
      setSelectedSize("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  useEffect(() => {
    const firstAvailable = sizes.find(
      (s) => getStock(product, selectedColor, s) > 0
    );
    setSelectedSize(firstAvailable ?? sizes[0] ?? "");
  }, [selectedColor, product, sizes]);

  const handleAdd = async () => {
    if (!selectedSize || stock <= 0) return;
    setAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    });
    setAdding(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-matte/40 backdrop-blur-sm"
            onClick={onClose}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-5xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto bg-ivory md:mx-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 text-[10px] uppercase tracking-luxury text-matte/50 hover:text-matte transition-colors"
            >
              Cerrar
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] bg-pearl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={imageFit}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[9px] uppercase tracking-luxury text-gold mb-3">
                  {product.collection}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-matte tracking-wide mb-4">
                  {product.name}
                </h2>
                <p className="text-lg font-light text-charcoal/80 mb-6">
                  {formatPrice(product.price, product.currency)}
                </p>
                <p className="text-sm font-light text-charcoal/60 leading-relaxed mb-10">
                  {product.description}
                </p>

                <motion.div className="mb-8">
                  <p className="text-[9px] uppercase tracking-luxury text-silver mb-4">
                    Color
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex items-center gap-2 px-3 py-2 border transition-all duration-500 ${
                          selectedColor === color.name
                            ? "border-matte"
                            : "border-matte/15 hover:border-matte/40"
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-4 h-4 rounded-full border border-matte/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] uppercase tracking-wide text-matte/70">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="mb-10">
                  <p className="text-[9px] uppercase tracking-luxury text-silver mb-4">
                    Talla
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => {
                      const sizeStock = getStock(product, selectedColor, size);
                      const unavailable = sizeStock <= 0;
                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={unavailable}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] px-4 py-2.5 text-[11px] uppercase tracking-wide border transition-all duration-500 ${
                            selectedSize === size
                              ? "border-matte bg-matte text-ivory"
                              : unavailable
                                ? "border-matte/10 text-matte/20 cursor-not-allowed line-through"
                                : "border-matte/20 text-matte/70 hover:border-matte"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {selectedSize && stock > 0 && stock <= 3 && (
                    <p className="mt-3 text-[10px] text-gold tracking-wide">
                      Solo {stock} en stock
                    </p>
                  )}
                </motion.div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!selectedSize || stock <= 0 || adding}
                  className="luxury-btn-gold w-full"
                >
                  {stock <= 0 ? "Agotado" : "Añadir al carrito"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
