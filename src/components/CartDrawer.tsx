"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/stock-utils";
import { SITE_CONFIG } from "@/lib/config";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = async () => {
    for (const item of items) {
      await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        }),
      });
    }

    const lines = items.map(
      (i) =>
        `• ${i.name} — ${i.color}, ${i.size} × ${i.quantity} — ${formatPrice(i.price * i.quantity)}`
    );
    const message = encodeURIComponent(
      `Hola Maison Valdezzani,\n\nQuiero realizar el siguiente pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(totalPrice())}\n\nGracias.`
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
      "_blank"
    );
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-matte/30 backdrop-blur-[2px]"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-ivory border-l border-matte/5 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-matte/5">
              <div>
                <h2 className="font-display text-2xl font-light text-matte">
                  Carrito
                </h2>
                <p className="text-[9px] uppercase tracking-luxury text-silver mt-1">
                  {items.length === 1
                    ? "1 artículo"
                    : `${items.length} artículos`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="text-[10px] uppercase tracking-luxury text-matte/50 hover:text-matte transition-colors"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <p className="font-display text-xl font-light text-matte/40 mb-2">
                    Tu carrito está vacío
                  </p>
                  <p className="text-[10px] uppercase tracking-luxury text-silver">
                    Descubre nuestra colección
                  </p>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.color}-${item.size}`}
                      className="flex gap-4"
                    >
                      <motion.div className="relative w-24 h-32 flex-shrink-0 bg-pearl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-light text-matte truncate">
                          {item.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-wide text-silver mt-1">
                          {item.color} · {item.size}
                        </p>
                        <p className="text-sm font-light text-charcoal/70 mt-2">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-matte/15">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.color,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-1.5 text-matte/60 hover:text-matte transition-colors"
                            >
                              −
                            </button>
                            <span className="px-3 text-sm text-matte">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.color,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1.5 text-matte/60 hover:text-matte transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.productId,
                                item.color,
                                item.size
                              )
                            }
                            className="text-[9px] uppercase tracking-luxury text-matte/40 hover:text-matte transition-colors"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-matte/5 space-y-4">
                <motion.div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-luxury text-silver">
                    Total
                  </span>
                  <span className="font-display text-2xl font-light text-matte">
                    {formatPrice(totalPrice())}
                  </span>
                </motion.div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="luxury-btn-gold w-full"
                >
                  Comprar por WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
