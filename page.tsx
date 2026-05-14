"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, X, Plus, Minus, Menu, Phone, Mail, MapPin, Star, ChevronDown, Sparkles } from "lucide-react"

// Types
interface Product {
  id: number
  name: string
  material: string
  price: number
  image: string
  category: string
  subcategory?: string
}

interface CartItem extends Product {
  quantity: number
}

// Logo URL
const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-14%20at%2012.03.33%20AM-AOMBgvH4JvkapCESEkr8YdPgkpFpCC.jpeg"

// Product data
const products: Product[] = [
  // Manillas Tejidas
  { id: 1, name: "Manilla Tejida Negra Dorada", material: "Oro 18k", price: 450000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QtTOr5rB4FMjOJ4HxZv3a982fyEl0p.png", category: "manillas", subcategory: "tejidas" },
  { id: 2, name: "Manilla Tejida Roja y Negra", material: "Oro 18k", price: 380000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IHHPkfZkAzfpVzR9pEfjqwnOiHd0Ow.png", category: "manillas", subcategory: "tejidas" },
  { id: 3, name: "Manilla Tejida Elegante", material: "Oro 18k", price: 420000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKOxtaviGxinFNgpJj9Uz4LRrswT4D.png", category: "manillas", subcategory: "tejidas" },
  { id: 4, name: "Manilla Tejida Bicolor", material: "Oro 18k", price: 390000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5V3uVJAP661935AcJY4U3ZfOKyQpsv.png", category: "manillas", subcategory: "tejidas" },
  { id: 5, name: "Manilla Tejida Duo", material: "Oro 18k", price: 350000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CiGH0ZYH5R5w5OPDXfALG8hqJRcV6j.png", category: "manillas", subcategory: "tejidas" },
  { id: 6, name: "Manilla Tejida Cruz Roja", material: "Oro 18k", price: 280000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ApXUofETTGaRhtAFizZ9oIeEiet8zF.png", category: "manillas", subcategory: "tejidas" },
  { id: 7, name: "Manilla Tejida Rosada", material: "Oro 18k", price: 250000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9UOyrXOzR9lUOXyOiYWfqZPSwRxNy6.png", category: "manillas", subcategory: "tejidas" },
  { id: 8, name: "Manilla Tejida Roja Perlas", material: "Oro 18k", price: 320000, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W3EvIHfVnpFkIHyQQkJitlxJuCubfl.png", category: "manillas", subcategory: "tejidas" },
  // Manillas No Tejidas
  { id: 9, name: "Manilla Cadena Deluxe", material: "Oro 18k", price: 520000, image: "/products/bracelet-2.jpg", category: "manillas", subcategory: "no-tejidas" },
  { id: 10, name: "Manilla Eslabones Premium", material: "Oro Laminado", price: 210000, image: "/products/bracelet-1.jpg", category: "manillas", subcategory: "no-tejidas" },
  // Aretes
  { id: 11, name: "Aretes Gota Diamante", material: "Oro 18k", price: 380000, image: "/products/earrings-1.jpg", category: "aretes" },
  { id: 12, name: "Aretes Argolla Clásica", material: "Oro Laminado", price: 145000, image: "/products/earrings-1.jpg", category: "aretes" },
  { id: 13, name: "Aretes Perla Dorada", material: "Oro Fantasía", price: 75000, image: "/products/earrings-1.jpg", category: "aretes" },
  // Anillos
  { id: 14, name: "Anillo Solitario Brillante", material: "Oro 18k", price: 680000, image: "/products/ring-1.jpg", category: "anillos" },
  { id: 15, name: "Anillo Compromiso Eterno", material: "Oro Laminado", price: 280000, image: "/products/ring-1.jpg", category: "anillos" },
  { id: 16, name: "Anillo Banda Elegante", material: "Oro Fantasía", price: 89000, image: "/products/ring-1.jpg", category: "anillos" },
  // Cadenas y Pulseras
  { id: 17, name: "Cadena Eslabón Cubano", material: "Oro 18k", price: 890000, image: "/products/chain-1.jpg", category: "cadenas" },
  { id: 18, name: "Cadena Serpiente Luxury", material: "Oro Laminado", price: 320000, image: "/products/chain-1.jpg", category: "cadenas" },
  { id: 19, name: "Pulsera Charm Collection", material: "Oro Fantasía", price: 125000, image: "/products/chain-1.jpg", category: "cadenas" },
]

const testimonials = [
  { name: "María González", rating: 5, text: "Excelente calidad y atención. Mi manilla de oro 18k es simplemente hermosa. ¡Muy recomendados!" },
  { name: "Carlos Rodríguez", rating: 5, text: "Compré unos aretes para mi esposa y quedó encantada. El acabado es perfecto y el precio muy justo." },
  { name: "Ana Martínez", rating: 5, text: "Michael y Madeleyne son muy profesionales. La cadena que compré supera mis expectativas." },
]

export default function GoldDiamond() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price)
  }

  const handleCheckout = () => {
    const message = cart.map(item => 
      `• ${item.name} (${item.material}) x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n')
    
    const fullMessage = `¡Hola Gold Diamond! 💎\n\nMe gustaría realizar el siguiente pedido:\n\n${message}\n\n*Total: ${formatPrice(totalPrice)}*\n\n¡Gracias!`
    
    const encodedMessage = encodeURIComponent(fullMessage)
    window.open(`https://wa.me/qr/U5CRMW7ITX6CP1?text=${encodedMessage}`, '_blank')
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const filterProducts = (category: string, subcategory?: string) => {
    return products.filter(p => 
      p.category === category && (subcategory ? p.subcategory === subcategory : true)
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image 
                src={LOGO_URL} 
                alt="Gold Diamond Logo" 
                width={50} 
                height={50} 
                className="rounded-full border-2 border-[#D4AF37]"
              />
              <span className="text-2xl font-bold text-[#D4AF37] tracking-wider">GOLD DIAMOND</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Novedades", id: "novedades" },
                { label: "Manillas", id: "manillas" },
                { label: "Joyería", id: "joyeria" },
                { label: "Soporte", id: "soporte" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Cart Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground hover:text-[#D4AF37] transition-colors"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-background text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground"
                aria-label="Menú"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-[#D4AF37]/20">
              {[
                { label: "Novedades", id: "novedades" },
                { label: "Manillas", id: "manillas" },
                { label: "Joyería", id: "joyeria" },
                { label: "Soporte", id: "soporte" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-foreground/80 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="novedades" className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Elegancia que<br />
            <span className="text-[#D4AF37]">Brilla por Siempre</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra colección exclusiva de joyería fina. Piezas únicas en Oro 18k, Oro Laminado y Oro Fantasía, 
            diseñadas para quienes aprecian la verdadera belleza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('manillas')}
              className="px-8 py-4 bg-[#D4AF37] text-background font-semibold rounded-sm hover:bg-[#E8C547] transition-all duration-300 uppercase tracking-wider text-sm"
            >
              Explorar Colección
            </button>
            <button
              onClick={() => scrollToSection('soporte')}
              className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-background transition-all duration-300 uppercase tracking-wider text-sm"
            >
              Contactar
            </button>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('manillas')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#D4AF37]"
          aria-label="Desplazarse hacia abajo"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Manillas Section */}
      <section id="manillas" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Manillas</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Encuentra la manilla perfecta para cada ocasión. Desde diseños tejidos artesanales hasta elegantes cadenas.
            </p>
          </div>

          {/* Subcategory Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory(activeCategory === 'tejidas' ? null : 'tejidas')}
              className={`px-6 py-3 border-2 rounded-sm uppercase tracking-wider text-sm transition-all ${
                activeCategory === 'tejidas' 
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-background' 
                  : 'border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37]'
              }`}
            >
              Tejidas
            </button>
            <button
              onClick={() => setActiveCategory(activeCategory === 'no-tejidas' ? null : 'no-tejidas')}
              className={`px-6 py-3 border-2 rounded-sm uppercase tracking-wider text-sm transition-all ${
                activeCategory === 'no-tejidas' 
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-background' 
                  : 'border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37]'
              }`}
            >
              No Tejidas
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterProducts('manillas', activeCategory || undefined).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} formatPrice={formatPrice} />
            ))}
          </div>
        </div>
      </section>

      {/* Joyería Section */}
      <section id="joyeria" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Joyería Fina</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Aretes, anillos, cadenas y pulseras que complementan tu estilo con elegancia y distinción.
            </p>
          </div>

          {/* Aretes */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-[#D4AF37] mb-8 text-center">Aretes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterProducts('aretes').map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} formatPrice={formatPrice} />
              ))}
            </div>
          </div>

          {/* Anillos */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-[#D4AF37] mb-8 text-center">Anillos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterProducts('anillos').map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} formatPrice={formatPrice} />
              ))}
            </div>
          </div>

          {/* Cadenas y Pulseras */}
          <div>
            <h3 className="text-2xl font-semibold text-[#D4AF37] mb-8 text-center">Cadenas y Pulseras</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterProducts('cadenas').map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} formatPrice={formatPrice} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-8 rounded-sm border border-[#D4AF37]/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <p className="text-[#D4AF37] font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="soporte" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Soporte</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a 
              href="https://wa.me/qr/U5CRMW7ITX6CP1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-8 bg-card rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors group"
            >
              <Phone className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
              <p className="text-foreground/60 text-center text-sm">Escríbenos directamente para consultas y pedidos</p>
            </a>

            <div className="flex flex-col items-center p-8 bg-card rounded-sm border border-[#D4AF37]/20">
              <Mail className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <p className="text-foreground/60 text-center text-sm">contacto@golddiamond.com</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-card rounded-sm border border-[#D4AF37]/20">
              <MapPin className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ubicación</h3>
              <p className="text-foreground/60 text-center text-sm">Atención personalizada con Michael y Madeleyne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src={LOGO_URL} 
              alt="Gold Diamond Logo" 
              width={40} 
              height={40} 
              className="rounded-full border border-[#D4AF37]"
            />
            <span className="text-[#D4AF37] font-semibold">GOLD DIAMOND</span>
          </div>
          <p className="text-foreground/40 text-sm">
            © 2026 Gold Diamond. Todos los derechos reservados.
          </p>
          <p className="text-foreground/40 text-sm">
            Hecho por{' '}
            <a 
              href="https://sada.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#E8C547] transition-colors"
            >
              SADA
            </a>
          </p>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60" 
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-[#D4AF37]/20 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
              <h2 className="text-xl font-bold text-foreground">Tu Carrito</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-foreground/60 py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#D4AF37]/10">
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-medium truncate">{item.name}</h3>
                        <p className="text-[#D4AF37] text-sm">{item.material}</p>
                        <p className="text-foreground/60 text-sm">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-foreground/60 hover:text-[#D4AF37] transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-foreground w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-foreground/60 hover:text-[#D4AF37] transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 text-destructive hover:text-destructive/80 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-foreground/60">Total:</span>
                  <span className="text-2xl font-bold text-[#D4AF37]">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#D4AF37] text-background font-semibold rounded-sm hover:bg-[#E8C547] transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Finalizar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Product Card Component
function ProductCard({ 
  product, 
  onAddToCart, 
  formatPrice 
}: { 
  product: Product
  onAddToCart: (product: Product) => void
  formatPrice: (price: number) => string
}) {
  const materialColors: Record<string, string> = {
    "Oro 18k": "bg-[#D4AF37] text-background",
    "Oro Laminado": "bg-[#B8960F] text-background",
    "Oro Fantasía": "bg-[#E8C547] text-background",
  }

  return (
    <div className="group bg-card rounded-sm overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-sm ${materialColors[product.material] || 'bg-[#D4AF37] text-background'}`}>
          {product.material}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-[#D4AF37] mb-4">{formatPrice(product.price)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-background transition-all duration-300 uppercase tracking-wider text-sm"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}
