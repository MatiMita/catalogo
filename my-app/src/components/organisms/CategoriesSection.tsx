import Link from "next/link";
import Image from "next/image";

export function CategoriesSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-purple-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎃 Explora Nuestras Categorías Espeluznantes 🎃
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            👻 Encuentra exactamente lo que buscas navegando por nuestras categorías de miedo 🦇
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Ropa para Niño */}
          <Link 
            href="/categoria/niño"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="https://pyunicentroprod.vtexassets.com/arquivos/ids/1734785/IMG-EC046933-7800218-01.jpg?v=638836015733030000"
                alt="Ropa para Niño"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-purple-900/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold">👻 Ropa para Niño 🎃</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Ropa terroríficamente cómoda para los pequeños monstruitos 🧛‍♂️ Camisetas, pantalones, shorts y más.
              </p>
              <span className="text-orange-600 font-medium group-hover:underline">
                Ver productos espeluznantes 🕸️
              </span>
            </div>
          </Link>

          {/* Ropa para Hombre */}
          <Link 
            href="/categoria/hombre"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="https://i.pinimg.com/564x/7c/7e/0d/7c7e0d66e2cec6e211eb3dcf714d09e0.jpg"
                alt="Ropa para Hombre"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-purple-900/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold">🦇 Ropa para Hombre 🕷️</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Moda masculina diabólicamente elegante 😈 Camisas, jeans, chaquetas y mucho más de miedo.
              </p>
              <span className="text-orange-600 font-medium group-hover:underline">
                Ver productos siniestros 🌙
              </span>
            </div>
          </Link>

          {/* Ropa para Mujer */}
          <Link 
            href="/categoria/mujer"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="https://m.media-amazon.com/images/I/61fhwi87lyL._UY1000_.jpg"
                alt="Ropa para Mujer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-purple-900/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold">🧙‍♀️ Ropa para Mujer 🖤</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Moda femenina encantadoramente elegante ✨ Jeans de alta calidad para todas las ocasiones brujas.
              </p>
              <span className="text-orange-600 font-medium group-hover:underline">
                Ver productos hechizantes 🔮
              </span>
            </div>
          </Link>

          {/* Todos los Productos */}
          <Link 
            href="/productos"
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 to-purple-200 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎃🛍️👻</div>
                <h3 className="text-xl font-bold text-gray-800">Ver Todo el Terror</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                Explora nuestro catálogo completo de productos escalofriantes 🕸️ Filtros avanzados para encontrar lo que buscas.
              </p>
              <span className="text-orange-600 font-medium group-hover:underline">
                Ver catálogo completo de miedo 🌙
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}