"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CyberButton from "@/components/cyber-button"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/utils/format-price"
import { ArrowLeft, CreditCard, Truck, Check, ShoppingBag } from "lucide-react"

// Checkout steps
type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [orderNumber, setOrderNumber] = useState("")

  // Calculate shipping cost
  const shippingCost = shippingMethod === "express" ? 25 : 10

  // Calculate total
  const total = subtotal + shippingCost

  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("payment")
  }

  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate random order number
    const randomOrderNumber = `FD-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    setOrderNumber(randomOrderNumber)

    // Process order (in a real app, this would call an API)
    setCurrentStep("confirmation")

    // Clear cart after successful order
    clearCart()
  }

  // If cart is empty and not in confirmation step, redirect to shop
  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <PageLayout>
        <div className="py-20 px-4 md:px-10 min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <ShoppingBag size={48} className="text-[#00ff41]/30 mx-auto mb-4" />
            <h1 className="text-[#00ff41] text-2xl font-mono font-bold tracking-tight mb-4">YOUR CART IS EMPTY</h1>
            <p className="text-white/70 font-mono text-sm mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop">
              <CyberButton>EXPLORE_PRODUCTS</CyberButton>
            </Link>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="py-12 px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/shop" className="text-white/60 hover:text-white/80 font-mono text-xs flex items-center">
            <ArrowLeft size={12} className="mr-1" /> BACK TO SHOP
          </Link>
        </div>

        <ScrollReveal variant="fadeInUp" className="mb-12 text-center">
          <VHSGlitch>
            <SimpleDistressedText
              text="CHECKOUT"
              tag="h1"
              className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
            />
          </VHSGlitch>
        </ScrollReveal>

        {/* Checkout progress */}
        <div className="mb-12">
          <div className="flex justify-between max-w-3xl mx-auto">
            {[
              { id: "cart", label: "CART", icon: ShoppingBag },
              { id: "shipping", label: "SHIPPING", icon: Truck },
              { id: "payment", label: "PAYMENT", icon: CreditCard },
              { id: "confirmation", label: "CONFIRMATION", icon: Check },
            ].map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                {/* Progress line */}
                {index < 3 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-px ${
                      ["cart", "shipping", "payment"].indexOf(currentStep) > index ? "bg-[#00ff41]" : "bg-white/20"
                    }`}
                    style={{ transform: "translateX(50%)" }}
                  />
                )}

                {/* Step circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 mb-2 ${
                    currentStep === step.id
                      ? "bg-[#00ff41] text-black"
                      : ["cart", "shipping", "payment"].indexOf(currentStep) >
                          ["cart", "shipping", "payment"].indexOf(step.id as CheckoutStep)
                        ? "bg-[#00ff41]/80 text-black"
                        : "bg-black/50 text-white/50 border border-white/20"
                  }`}
                >
                  <step.icon size={16} />
                </div>

                {/* Step label */}
                <span
                  className={`font-mono text-xs ${
                    currentStep === step.id
                      ? "text-[#00ff41]"
                      : ["cart", "shipping", "payment"].indexOf(currentStep) >
                          ["cart", "shipping", "payment"].indexOf(step.id as CheckoutStep)
                        ? "text-white/80"
                        : "text-white/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cart step */}
        {currentStep === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">YOUR_CART</h2>

              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={item.variant.id}
                    className="border border-[#00ff41]/20 bg-black/50 p-4 grid grid-cols-[80px,1fr,auto] md:grid-cols-[100px,1fr,auto] gap-4"
                  >
                    {/* Product image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-black/70 border border-[#00ff41]/10 overflow-hidden">
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex flex-col">
                      <h3 className="text-[#00ff41] font-mono text-sm">{item.product.name}</h3>
                      <p className="text-white/60 font-mono text-xs">
                        {item.variant.size} / {item.variant.color}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          className="text-white/70 hover:text-white p-1 border border-[#00ff41]/20"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-white font-mono text-xs mx-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          className="text-white/70 hover:text-white p-1 border border-[#00ff41]/20"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.variant.stock}
                        >
                          +
                        </button>
                        <span className="text-white/80 font-mono text-xs ml-4">
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="text-white/50 hover:text-[#ff3366] transition-colors self-start"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Link href="/shop">
                  <CyberButton variant="secondary" size="sm">
                    CONTINUE_SHOPPING
                  </CyberButton>
                </Link>
                <button
                  onClick={() => setCurrentStep("shipping")}
                  className="bg-[#00ff41] text-black font-mono text-sm px-6 py-2 hover:bg-[#00ff41]/80 transition-colors"
                >
                  PROCEED_TO_SHIPPING
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-black/50 border border-[#00ff41]/20 p-6">
                <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">ORDER_SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>

                <div className="border-t border-[#00ff41]/20 pt-4">
                  <div className="flex justify-between text-[#00ff41] font-mono text-lg">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-white/50 font-mono text-xs mt-2">Shipping and taxes calculated at checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping step */}
        {currentStep === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">SHIPPING_INFORMATION</h2>

              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      FIRST_NAME
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      LAST_NAME
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-[#00ff41] mb-2 font-mono text-sm">
                    ADDRESS
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      CITY
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      STATE
                    </label>
                    <input
                      type="text"
                      id="state"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      ZIP_CODE
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      required
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-[#00ff41] mb-2 font-mono text-sm">
                    COUNTRY
                  </label>
                  <select
                    id="country"
                    required
                    className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>

                <h3 className="text-[#00ff41] text-lg font-mono tracking-tight mt-8 mb-4">SHIPPING_METHOD</h3>

                <div className="space-y-4">
                  <label className="flex items-start p-4 border border-[#00ff41]/30 bg-black/50 cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="text-white font-mono text-sm">Standard Shipping</div>
                      <div className="text-white/60 font-mono text-xs">5-7 business days</div>
                      <div className="text-[#00ff41] font-mono text-sm mt-1">{formatPrice(10)}</div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border border-[#00ff41]/30 bg-black/50 cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="text-white font-mono text-sm">Express Shipping</div>
                      <div className="text-white/60 font-mono text-xs">2-3 business days</div>
                      <div className="text-[#00ff41] font-mono text-sm mt-1">{formatPrice(25)}</div>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="text-white/70 hover:text-white font-mono text-sm border border-white/30 px-4 py-2 hover:border-white/50 transition-colors"
                  >
                    BACK_TO_CART
                  </button>
                  <button
                    type="submit"
                    className="bg-[#00ff41] text-black font-mono text-sm px-6 py-2 hover:bg-[#00ff41]/80 transition-colors"
                  >
                    CONTINUE_TO_PAYMENT
                  </button>
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-black/50 border border-[#00ff41]/20 p-6">
                <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">ORDER_SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <div className="border-t border-[#00ff41]/20 pt-4">
                  <div className="flex justify-between text-[#00ff41] font-mono text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="text-white/80 font-mono text-sm">ORDER ITEMS</h3>
                  {items.map((item) => (
                    <div key={item.variant.id} className="flex justify-between text-white/60 font-mono text-xs">
                      <span>
                        {item.product.name} ({item.variant.size}, {item.variant.color}) × {item.quantity}
                      </span>
                      <span>{formatPrice(item.variant.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment step */}
        {currentStep === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">PAYMENT_INFORMATION</h2>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-[#00ff41] mb-2 font-mono text-sm">
                    CARD_NUMBER
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-[#00ff41] mb-2 font-mono text-sm">
                    NAME_ON_CARD
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    required
                    className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expiry" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      EXPIRY_DATE
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      required
                      placeholder="MM/YY"
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-[#00ff41] mb-2 font-mono text-sm">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      placeholder="123"
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="text-white/70 hover:text-white font-mono text-sm border border-white/30 px-4 py-2 hover:border-white/50 transition-colors"
                  >
                    BACK_TO_SHIPPING
                  </button>
                  <button
                    type="submit"
                    className="bg-[#00ff41] text-black font-mono text-sm px-6 py-2 hover:bg-[#00ff41]/80 transition-colors"
                  >
                    PLACE_ORDER
                  </button>
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-black/50 border border-[#00ff41]/20 p-6">
                <h2 className="text-[#00ff41] text-xl font-mono tracking-tight mb-6">ORDER_SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 font-mono text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <div className="border-t border-[#00ff41]/20 pt-4">
                  <div className="flex justify-between text-[#00ff41] font-mono text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="text-white/80 font-mono text-sm">SHIPPING ADDRESS</h3>
                  <p className="text-white/60 font-mono text-xs">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    <br />
                    {shippingInfo.country}
                  </p>

                  <h3 className="text-white/80 font-mono text-sm pt-2">SHIPPING METHOD</h3>
                  <p className="text-white/60 font-mono text-xs">
                    {shippingMethod === "express" ? "Express Shipping (2-3 days)" : "Standard Shipping (5-7 days)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation step */}
        {currentStep === "confirmation" && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black/50 border border-[#00ff41]/20 p-8 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#00ff41]/20 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-[#00ff41]" />
              </div>

              <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight mb-4">ORDER_CONFIRMED</h2>

              <p className="text-white/70 font-mono text-sm mb-6">
                Thank you for your order! We've received your payment and will begin processing your items immediately.
              </p>

              <div className="bg-black/30 border border-[#00ff41]/10 p-4 mb-6">
                <h3 className="text-white/80 font-mono text-sm mb-2">ORDER NUMBER</h3>
                <p className="text-[#00ff41] font-mono text-lg">{orderNumber}</p>
              </div>

              <p className="text-white/70 font-mono text-sm">
                A confirmation email has been sent to <span className="text-white">{shippingInfo.email}</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link href="/shop">
                <CyberButton>CONTINUE_SHOPPING</CyberButton>
              </Link>
              <Link href="/">
                <CyberButton variant="secondary">RETURN_TO_HOME</CyberButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
