"use client"

import { Fragment } from "react"
import Link from "next/link"
import { X, ShoppingBag, ChevronRight, Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/utils/format-price"
import CyberButton from "./cyber-button"

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, subtotal, isCartOpen, setIsCartOpen, itemCount } = useCart()

  return (
    <Fragment>
      {/* Cart overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-black border-l border-[#00ff41]/30 z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00ff41]/30">
            <h2 className="text-[#00ff41] font-mono text-lg flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              CART ({itemCount})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart content */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={40} className="text-white/30 mb-4" />
                <p className="text-white/70 font-mono text-sm mb-6">YOUR CART IS EMPTY</p>
                <Link href="/shop">
                  <button className="text-[#00ff41] font-mono text-sm border border-[#00ff41]/50 px-4 py-2 hover:bg-[#00ff41]/10 transition-colors">
                    CONTINUE SHOPPING
                  </button>
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.variant.id} className="border border-[#00ff41]/20 bg-black/50 p-3">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 bg-black/70 flex-shrink-0">
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-[#00ff41] font-mono text-sm">{item.product.name}</h3>
                          <span className="text-white font-mono text-sm">
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-white/60 font-mono text-xs mt-1">
                          {item.variant.color} / {item.variant.size}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-[#00ff41]/30 text-white/70 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 h-6 flex items-center justify-center text-white font-mono text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-[#00ff41]/30 text-white/70 hover:text-white"
                              aria-label="Increase quantity"
                              disabled={item.quantity >= item.variant.stock}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variant.id)}
                            className="text-white/50 hover:text-white/80"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart footer */}
          {items.length > 0 && (
            <div className="border-t border-[#00ff41]/30 p-4">
              <div className="flex justify-between mb-4">
                <span className="text-white/70 font-mono text-sm">SUBTOTAL</span>
                <span className="text-white font-mono text-sm">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-white/50 font-mono text-xs mb-4">Shipping and taxes calculated at checkout</p>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <CyberButton className="w-full justify-center">
                  CHECKOUT <ChevronRight size={16} className="ml-1" />
                </CyberButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
