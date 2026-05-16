"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { getTotalStock } from "@/lib/stock-utils";
import { formatPrice } from "@/lib/stock-utils";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Acceso denegado");
      const data = await res.json();
      setProducts(data);
      setAuthenticated(true);
    } catch {
      setError("Contraseña incorrecta");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const updateStock = (
    productIndex: number,
    colorIndex: number,
    size: string,
    value: number
  ) => {
    setProducts((prev) => {
      const next = structuredClone(prev);
      next[productIndex].colors[colorIndex].stock[size] = Math.max(0, value);
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${password}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("No se ha podido guardar");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <motion.div className="min-h-screen flex items-center justify-center px-6 bg-ivory pt-24">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/"
            className="text-[9px] uppercase tracking-luxury text-silver hover:text-matte transition-colors mb-12 inline-block"
          >
            ← Volver
          </Link>
          <h1 className="font-display text-3xl font-light text-matte mb-2">
            Administración
          </h1>
          <p className="text-sm font-light text-charcoal/60 mb-10">
            Maison Valdezzani — Gestión de stock
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="luxury-input"
              required
            />
            {error && (
              <p className="text-sm text-red-800/70 font-light">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="luxury-btn w-full"
            >
              {loading ? "Conectando..." : "Entrar"}
            </button>
          </form>
          <p className="mt-8 text-[9px] text-silver tracking-wide">
            Contraseña por defecto: mv2026
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link
              href="/"
              className="text-[9px] uppercase tracking-luxury text-silver hover:text-matte transition-colors mb-6 inline-block"
            >
              ← Volver al sitio
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-light text-matte">
              Gestión de stock
            </h1>
            <p className="text-sm font-light text-charcoal/60 mt-2">
              {products.length} productos
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="luxury-btn-gold"
          >
            {loading ? "Guardando..." : saved ? "✓ Guardado" : "Guardar"}
          </button>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-800/70">{error}</p>
        )}

        <div className="space-y-10">
          {products.map((product, pi) => (
            <motion.div
              key={product.id}
              className="border border-matte/10 bg-pearl/30 p-6 md:p-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.05 }}
            >
              <div className="flex gap-6 mb-6">
                <div className="relative w-20 h-24 flex-shrink-0 bg-pearl overflow-hidden hidden sm:block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h2 className="font-display text-xl font-light text-matte">
                    {product.name}
                  </h2>
                  <p className="text-sm text-charcoal/60 mt-1">
                    {formatPrice(product.price)} · Stock total:{" "}
                    <span className="text-gold">{getTotalStock(product)}</span>
                  </p>
                </div>
              </div>

              {product.colors.map((color, ci) => (
                <div key={color.name} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-3 h-3 rounded-full border border-matte/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] uppercase tracking-luxury text-matte/70">
                      {color.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                    {Object.entries(color.stock).map(([size, qty]) => (
                      <div key={size}>
                        <label className="text-[9px] uppercase tracking-wide text-silver block mb-1">
                          {size}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={qty}
                          onChange={(e) =>
                            updateStock(pi, ci, size, parseInt(e.target.value) || 0)
                          }
                          className="w-full border border-matte/15 bg-ivory px-3 py-2 text-sm font-light text-matte focus:outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
