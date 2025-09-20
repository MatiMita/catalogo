import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Star, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5" id="home">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Tu <span className="text-primary">Catálogo</span> de Productos
            <br />
            <span className="text-muted-foreground">Premium</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre una amplia selección de productos de alta calidad. 
            Desde ropa para niños hasta moda masculina, explora nuestro catálogo completo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              Ver Catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Contactar
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-muted-foreground">Productos en Catálogo</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-muted-foreground">Visitantes al Mes</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">4.9</h3>
              <p className="text-muted-foreground">Calidad Promedio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}