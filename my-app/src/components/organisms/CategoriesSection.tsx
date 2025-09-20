import Link from "next/link";

export function CategoriesSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explora Nuestras Categorías
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías principales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Ropa para Niño */}
          <Link 
            href="/categoria/niño"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👶</div>
                <h3 className="text-xl font-bold text-gray-800">Ropa para Niño</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Ropa cómoda y divertida para los más pequeños. Camisetas, pantalones, shorts y más.
              </p>
              <span className="text-primary font-medium group-hover:underline">
                Ver productos →
              </span>
            </div>
          </Link>

          {/* Ropa para Hombre */}
          <Link 
            href="/categoria/hombre"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-blue-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨</div>
                <h3 className="text-xl font-bold text-gray-800">Ropa para Hombre</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Moda masculina elegante y versátil. Camisas, jeans, chaquetas y mucho más.
              </p>
              <span className="text-primary font-medium group-hover:underline">
                Ver productos →
              </span>
            </div>
          </Link>

          {/* Todos los Productos */}
          <Link 
            href="/productos"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-teal-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-bold text-gray-800">Ver Todo</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Explora nuestro catálogo completo con filtros avanzados para encontrar exactamente lo que buscas.
              </p>
              <span className="text-primary font-medium group-hover:underline">
                Ver catálogo completo →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}