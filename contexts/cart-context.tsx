"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Product type definition
export type ProductVariant = {
  id: string
  size: string
  color: string
  price: number
  stock: number
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  fullDescription?: string
  price: number
  images: string[]
  collection: string
  category: string
  variants: ProductVariant[]
  featured?: boolean
  new?: boolean
}

// Cart item type definition
export type CartItem = {
  product: Product
  variant: ProductVariant
  quantity: number
}

// Cart context type definition
type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts (to avoid hydration issues)
  useEffect(() => {
    setIsClient(true)

    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse saved cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isClient && items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isClient])

  // Add item to cart
  const addItem = (product: Product, variant: ProductVariant, quantity: number) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.variant.id === variant.id)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, variant, quantity }]
      }
    })

    // Open cart when item is added
    setIsCartOpen(true)
  }

  // Remove item from cart
  const removeItem = (variantId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.variant.id !== variantId))

    // If cart becomes empty after removing item, update localStorage
    if (items.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  // Update item quantity
  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.variant.id === variantId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  // Calculate total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.variant.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
