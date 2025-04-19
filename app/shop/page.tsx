"use client"

import { useState } from "react"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import { formatPrice } from "@/utils/format-price"
import type { Product } from "@/contexts/cart-context"
import { Filter, ChevronDown } from "lucide-react"

// Mock product data
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

// Categories for filtering
const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses", "Bodysuits", "Corsets", "Accessories"]

// Collections for filtering
const collections = [
  "All",
  "DECONSTRUCTED",
  "NEON DYSTOPIA",
  "DIGITAL COUTURE",
  "URBAN WARFARE",
  "SYNTHETIC EVOLUTION",
  "GLITCH COUTURE",
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCollection, setSelectedCollection] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  // Filter products based on selected category and collection
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
    const collectionMatch = selectedCollection === "All" || product.collection === selectedCollection
    return categoryMatch && collectionMatch
  })

  return (
    <PageLayout>
      <div className="py-20 px-4 md:px-10">
        <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
          <VHSGlitch>
            <SimpleDistressedText
              text="SHOP"
              tag="h1"
              className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
            />
          </VHSGlitch>
          <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
            EXPLORE AND PURCHASE OUR REVOLUTIONARY DESIGNS THAT CHALLENGE FASHION NORMS.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="mb-12">
          <button
            className="md:hidden flex items-center gap-2 text-[#00ff41] font-mono text-sm mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            FILTERS
            <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          <div className={`md:block ${showFilters ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/30 border border-[#00ff41]/20 p-6">
              {/* Category filter */}
              <div>
                <h3 className="text-[#00ff41] font-mono text-sm mb-3">CATEGORY</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 font-mono text-xs ${
                        selectedCategory === category
                          ? "bg-[#00ff41] text-black"
                          : "bg-black/50 text-white/70 hover:text-white border border-[#00ff41]/30"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collection filter */}
              <div>
                <h3 className="text-[#00ff41] font-mono text-sm mb-3">COLLECTION</h3>
                <div className="flex flex-wrap gap-2">
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      className={`px-3 py-1 font-mono text-xs ${
                        selectedCollection === collection
                          ? "bg-[#00ff41] text-black"
                          : "bg-black/50 text-white/70 hover:text-white border border-[#00ff41]/30"
                      }`}
                      onClick={() => setSelectedCollection(collection)}
                    >
                      {collection}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 font-mono text-sm mb-4">NO PRODUCTS MATCH YOUR FILTERS</p>
            <button
              onClick={() => {
                setSelectedCategory("All")
                setSelectedCollection("All")
              }}
              className="text-[#00ff41] font-mono text-sm underline"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {filteredProducts.map((product) => (
              <Link href={`/shop/${product.slug}`} key={product.id}>
                <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors h-full flex flex-col">
                  <div className="relative">
                    <RevealImage src={product.images[0]} alt={product.name} className="aspect-[3/4]" effect="fade" />
                    {product.new && (
                      <div className="absolute top-3 right-3 bg-[#00ff41] text-black px-2 py-1 font-mono text-xs">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#00ff41] font-mono text-sm">{product.name}</h3>
                      <span className="text-white/80 font-mono text-sm">{formatPrice(product.price)}</span>
                    </div>
                    <p className="text-white/60 font-mono text-xs mb-2">{product.collection}</p>
                    <p className="text-white/70 font-mono text-xs mb-4 flex-1">{product.description}</p>
                    <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                      VIEW PRODUCT →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        )}
      </div>
    </PageLayout>
  )
}
