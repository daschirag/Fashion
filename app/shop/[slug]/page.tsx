"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CyberButton from "@/components/cyber-button"
import { useCart, type Product } from "@/contexts/cart-context"
import { formatPrice } from "@/utils/format-price"
import { ArrowLeft, Info, ShoppingBag } from "lucide-react"

// First, import the ZoomableImage component at the top of the file
import ZoomableImage from "@/components/zoomable-image"

// Import mock product data
// This would normally come from an API or database
const products: Product[] = [
  {
    id: "p1",
    name: "PINK FURY JACKET",
    slug: "pink-fury-jacket",
    description: "Vibrant pink leather jacket with luxurious fur cuffs",
    fullDescription:
      "Make a bold statement with this eye-catching pink leather jacket featuring plush fur cuffs. The cropped silhouette and vibrant color create a perfect balance between edgy and playful. Pair with the matching skirt or contrast with dark pieces for maximum impact.",
    price: 1200,
    images: ["/images/pink-jacket.png", "/placeholder.svg?height=800&width=600&text=PINK+FURY+JACKET+2"],
    collection: "NEON DYSTOPIA",
    category: "Outerwear",
    variants: [
      { id: "v1", size: "S", color: "Pink", price: 1200, stock: 5 },
      { id: "v2", size: "M", color: "Pink", price: 1200, stock: 8 },
      { id: "v3", size: "L", color: "Pink", price: 1200, stock: 3 },
    ],
    featured: true,
    new: true,
  },
  {
    id: "p2",
    name: "MANIAC LEATHER JACKET",
    slug: "maniac-leather-jacket",
    description: "Black leather jacket with bold red MANIAC graphic",
    fullDescription:
      "This statement leather jacket features a striking red 'MANIAC' graphic and demon skull design on the back. Crafted from premium black leather with a glossy finish, it represents the perfect fusion of streetwear and high fashion. The oversized fit and bold graphics make this piece impossible to ignore.",
    price: 1450,
    images: ["/images/maniac-jacket.png", "/placeholder.svg?height=800&width=600&text=MANIAC+JACKET+2"],
    collection: "URBAN WARFARE",
    category: "Outerwear",
    variants: [
      { id: "v6", size: "S", color: "Black", price: 1450, stock: 10 },
      { id: "v7", size: "M", color: "Black", price: 1450, stock: 15 },
      { id: "v8", size: "L", color: "Black", price: 1450, stock: 7 },
      { id: "v9", size: "XL", color: "Black", price: 1450, stock: 5 },
    ],
    featured: true,
  },
  {
    id: "p3",
    name: "MIHAELA TOTE BAG",
    slug: "mihaela-tote-bag",
    description: "Vibrant orange designer tote with signature branding",
    fullDescription:
      "This eye-catching orange tote bag combines functionality with high fashion sensibility. The structured design features the signature Mihaela branding, premium leather construction, and ample storage space. The vibrant color makes it the perfect statement accessory for any outfit.",
    price: 850,
    images: ["/images/orange-bag.png", "/placeholder.svg?height=800&width=600&text=MIHAELA+TOTE+2"],
    collection: "DIGITAL COUTURE",
    category: "Accessories",
    variants: [{ id: "v10", size: "One Size", color: "Orange", price: 850, stock: 12 }],
    new: true,
  },
  {
    id: "p4",
    name: "TEXTURED LEATHER JACKET",
    slug: "textured-leather-jacket",
    description: "Premium black leather jacket with textured detailing",
    fullDescription:
      "This premium black leather jacket features unique textured detailing and an avant-garde silhouette. The oversized collar and asymmetrical design elements create a dramatic look that's both edgy and sophisticated. Crafted from the finest leather, this piece is designed to develop a beautiful patina over time.",
    price: 1800,
    images: ["/images/leather-editorial.png", "/placeholder.svg?height=800&width=600&text=TEXTURED+LEATHER+JACKET+2"],
    collection: "SYNTHETIC EVOLUTION",
    category: "Outerwear",
    variants: [
      { id: "v14", size: "XS", color: "Black", price: 1800, stock: 2 },
      { id: "v15", size: "S", color: "Black", price: 1800, stock: 3 },
      { id: "v16", size: "M", color: "Black", price: 1800, stock: 3 },
    ],
    featured: true,
  },
  {
    id: "p5",
    name: "3D PRINTED CORSET",
    slug: "3d-printed-corset",
    description: "Architectural corset created with 3D printing technology",
    fullDescription:
      "This architectural corset represents a breakthrough in fashion technology, created entirely through 3D printing. Each piece is custom-designed to fit the wearer's exact measurements, with an intricate lattice structure that would be impossible to achieve through traditional manufacturing methods. The result is both a functional garment and a wearable sculpture.",
    price: 2200,
    images: [
      "/placeholder.svg?height=800&width=600&text=3D+PRINTED+CORSET+1",
      "/placeholder.svg?height=800&width=600&text=3D+PRINTED+CORSET+2",
    ],
    collection: "DIGITAL COUTURE",
    category: "Corsets",
    variants: [
      { id: "v19", size: "XS", color: "White", price: 2200, stock: 1 },
      { id: "v20", size: "S", color: "White", price: 2200, stock: 2 },
      { id: "v21", size: "M", color: "White", price: 2200, stock: 2 },
      { id: "v22", size: "S", color: "Black", price: 2200, stock: 1 },
      { id: "v23", size: "M", color: "Black", price: 2200, stock: 1 },
    ],
    new: true,
  },
  {
    id: "p6",
    name: "TACTICAL CARGO PANTS",
    slug: "tactical-cargo-pants",
    description: "Utilitarian pants with multiple pockets and adjustable features",
    fullDescription:
      "These utilitarian cargo pants blend tactical functionality with high fashion sensibilities. Featuring multiple pockets, adjustable leg openings, and reinforced panels, they're designed for both practical urban wear and bold fashion statements. The water-resistant technical fabric ensures durability while maintaining a sleek silhouette.",
    price: 580,
    images: [
      "/placeholder.svg?height=800&width=600&text=TACTICAL+CARGO+PANTS+1",
      "/placeholder.svg?height=800&width=600&text=TACTICAL+CARGO+PANTS+2",
    ],
    collection: "URBAN WARFARE",
    category: "Bottoms",
    variants: [
      { id: "v24", size: "28", color: "Black", price: 580, stock: 8 },
      { id: "v25", size: "30", color: "Black", price: 580, stock: 12 },
      { id: "v26", size: "32", color: "Black", price: 580, stock: 10 },
      { id: "v27", size: "34", color: "Black", price: 580, stock: 6 },
      { id: "v28", size: "30", color: "Olive", price: 580, stock: 5 },
      { id: "v29", size: "32", color: "Olive", price: 580, stock: 7 },
      { id: "v30", size: "34", color: "Olive", price: 580, stock: 4 },
    ],
  },
  {
    id: "p7",
    name: "GLITCH TEXTURE TEE",
    slug: "glitch-texture-tee",
    description: "T-shirt with distorted digital print patterns",
    fullDescription:
      "This statement t-shirt features deliberately distorted digital print patterns that mimic computer glitches and data corruption. The design embraces imperfection as an aesthetic choice, creating a visual commentary on digital culture and the beauty found in errors. Made from premium organic cotton with a relaxed fit.",
    price: 180,
    images: [
      "/placeholder.svg?height=800&width=600&text=GLITCH+TEXTURE+TEE+1",
      "/placeholder.svg?height=800&width=600&text=GLITCH+TEXTURE+TEE+2",
    ],
    collection: "GLITCH COUTURE",
    category: "Tops",
    variants: [
      { id: "v31", size: "S", color: "White", price: 180, stock: 15 },
      { id: "v32", size: "M", color: "White", price: 180, stock: 20 },
      { id: "v33", size: "L", color: "White", price: 180, stock: 18 },
      { id: "v34", size: "XL", color: "White", price: 180, stock: 12 },
      { id: "v35", size: "S", color: "Black", price: 180, stock: 15 },
      { id: "v36", size: "M", color: "Black", price: 180, stock: 20 },
      { id: "v37", size: "L", color: "Black", price: 180, stock: 18 },
      { id: "v38", size: "XL", color: "Black", price: 180, stock: 12 },
    ],
  },
  {
    id: "p8",
    name: "BIOMIMETIC DRESS",
    slug: "biomimetic-dress",
    description: "Flowing dress inspired by organic structures and natural patterns",
    fullDescription:
      "This flowing dress draws inspiration from organic structures and natural patterns found in biology. The biomimetic design mimics the efficiency and beauty of nature, with fabric that moves like water and structural elements reminiscent of exoskeletons. The innovative textile responds to body temperature, subtly changing its appearance throughout wear.",
    price: 1500,
    images: [
      "/placeholder.svg?height=800&width=600&text=BIOMIMETIC+DRESS+1",
      "/placeholder.svg?height=800&width=600&text=BIOMIMETIC+DRESS+2",
    ],
    collection: "SYNTHETIC EVOLUTION",
    category: "Dresses",
    variants: [
      { id: "v39", size: "XS", color: "Aqua", price: 1500, stock: 3 },
      { id: "v40", size: "S", color: "Aqua", price: 1500, stock: 5 },
      { id: "v41", size: "M", color: "Aqua", price: 1500, stock: 4 },
      { id: "v42", size: "L", color: "Aqua", price: 1500, stock: 2 },
    ],
  },
]

// Get unique colors and sizes for a product
const getUniqueColors = (product: Product) => {
  return Array.from(new Set(product.variants.map((v) => v.color)))
}

const getUniqueSizes = (product: Product, selectedColor: string) => {
  return Array.from(new Set(product.variants.filter((v) => v.color === selectedColor).map((v) => v.size)))
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()

  const slug = typeof params.slug === "string" ? params.slug : ""
  const product = products.find((p) => p.slug === slug)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")

  // If product not found, redirect to shop
  if (!product) {
    if (typeof window !== "undefined") {
      router.push("/shop")
    }
    return null
  }

  // Set initial color and size if not set
  if (selectedColor === "" && getUniqueColors(product).length > 0) {
    setSelectedColor(getUniqueColors(product)[0])
  }

  const availableSizes = getUniqueSizes(product, selectedColor)
  if (selectedSize === "" && availableSizes.length > 0) {
    setSelectedSize(availableSizes[0])
  }

  // Get selected variant
  const selectedVariant = product.variants.find((v) => v.color === selectedColor && v.size === selectedSize)

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setSelectedSize("") // Reset size when color changes
    setError("")
  }

  // Handle size change
  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    setError("")
  }

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    if (selectedVariant && newQuantity > selectedVariant.stock) {
      setQuantity(selectedVariant.stock)
    } else {
      setQuantity(newQuantity)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant) {
      setError("Please select a size and color")
      return
    }

    addItem(product, selectedVariant, quantity)
  }

  // Get related products
  const relatedProducts = products.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 3)

  return (
    <PageLayout>
      <div className="py-12 px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/shop" className="text-white/60 hover:text-white/80 font-mono text-xs flex items-center">
            <ArrowLeft size={12} className="mr-1" /> BACK TO SHOP
          </Link>
        </div>

        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Product images */}
          <ScrollReveal variant="fadeInLeft">
            <div className="space-y-4">
              {/* Product image section replaced with ZoomableImage */}
              <ZoomableImage
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                aspectRatio="aspect-[3/4]"
                zoomFactor={2.5}
              />

              <p className="text-[#00ff41]/60 font-mono text-xs text-center">HOVER TO ZOOM • CLICK TO EXPAND</p>

              {/* Thumbnail gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 border relative ${
                        selectedImage === index
                          ? "border-[#00ff41] ring-1 ring-[#00ff41]/50"
                          : "border-[#00ff41]/20 hover:border-[#00ff41]/50"
                      }`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View ${product.name} image ${index + 1}`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === index && <div className="absolute inset-0 bg-[#00ff41]/10"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product info */}
          <ScrollReveal variant="fadeInRight">
            <div>
              <VHSGlitch>
                <SimpleDistressedText
                  text={product.name}
                  tag="h1"
                  className="text-[#00ff41] text-3xl md:text-4xl font-mono font-bold tracking-tight mb-2"
                />
              </VHSGlitch>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/80 font-mono text-xl">{formatPrice(product.price)}</span>
                <Link
                  href={`/collections/${product.collection.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/60 font-mono text-xs hover:text-[#00ff41]/80 transition-colors"
                >
                  {product.collection}
                </Link>
              </div>

              <p className="text-white/70 font-mono text-sm mb-8">{product.fullDescription}</p>

              {/* Color selection */}
              <div className="mb-6">
                <h3 className="text-[#00ff41] font-mono text-sm mb-3">COLOR</h3>
                <div className="flex gap-3">
                  {getUniqueColors(product).map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 font-mono text-xs ${
                        selectedColor === color
                          ? "bg-[#00ff41] text-black"
                          : "bg-black/50 text-white/70 hover:text-white border border-[#00ff41]/30"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-6">
                <h3 className="text-[#00ff41] font-mono text-sm mb-3">SIZE</h3>
                <div className="flex gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 font-mono text-xs ${
                        selectedSize === size
                          ? "bg-[#00ff41] text-black"
                          : "bg-black/50 text-white/70 hover:text-white border border-[#00ff41]/30"
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-[#00ff41] font-mono text-sm mb-3">QUANTITY</h3>
                <div className="flex items-center">
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-[#00ff41]/30 text-white/70 hover:text-white"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 h-8 flex items-center justify-center border-t border-b border-[#00ff41]/30 text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-[#00ff41]/30 text-white/70 hover:text-white"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={selectedVariant ? quantity >= selectedVariant.stock : true}
                  >
                    +
                  </button>

                  {selectedVariant && (
                    <span className="ml-4 text-white/60 font-mono text-xs">{selectedVariant.stock} in stock</span>
                  )}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-4 text-[#ff3366] font-mono text-xs flex items-center">
                  <Info size={14} className="mr-1" /> {error}
                </div>
              )}

              {/* Add to cart button */}
              <div className="mb-8">
                <CyberButton
                  onClick={handleAddToCart}
                  className="w-full md:w-auto flex items-center justify-center"
                  disabled={!selectedVariant || selectedVariant.stock === 0}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  {selectedVariant && selectedVariant.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                </CyberButton>
              </div>

              {/* Product details */}
              <div className="border-t border-[#00ff41]/20 pt-6">
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-white/50 block mb-1">CATEGORY</span>
                    <span className="text-white">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block mb-1">COLLECTION</span>
                    <span className="text-white">{product.collection}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <ScrollReveal variant="fadeInUp" className="mb-10">
              <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
                RELATED_PRODUCTS
              </h2>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
              {relatedProducts.map((relatedProduct) => (
                <Link href={`/shop/${relatedProduct.slug}`} key={relatedProduct.id}>
                  <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors h-full flex flex-col">
                    <RevealImage
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="aspect-[3/4]"
                      effect="fade"
                    />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[#00ff41] font-mono text-sm">{relatedProduct.name}</h3>
                        <span className="text-white/80 font-mono text-sm">{formatPrice(relatedProduct.price)}</span>
                      </div>
                      <p className="text-white/60 font-mono text-xs mb-2">{relatedProduct.collection}</p>
                      <p className="text-white/70 font-mono text-xs mb-4 flex-1">{relatedProduct.description}</p>
                      <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                        VIEW PRODUCT →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </section>
        )}
      </div>
    </PageLayout>
  )
}
