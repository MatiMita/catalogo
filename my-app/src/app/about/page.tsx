import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackNavigation } from "@/components/molecules/BackNavigation";
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Truck, 
  Shield, 
  Clock,
  Star
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-orange-50/30 via-purple-50/20 to-background">
      {/* Navegación */}
      <BackNavigation
        backUrl="/"
        backLabel="Volver al inicio"
      />

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900">
          🎃 Sobre <span className="text-orange-600">O&C</span> 👻
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Somos una empresa familiar dedicada a mostrar ropa de calidad para toda la familia. 
          Con más de 15 años de experiencia, nos especializamos en presentar moda para niños y hombres.
        </p>
      </section>

      {/* Nuestra Historia */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                O&C nació en 2009 con la visión de hacer la moda accesible y visible para todas las familias. 
                Lo que comenzó como una pequeña muestra local, se ha convertido en un catálogo reconocido 
                por la calidad y el diseño de los productos que presenta.
              </p>
              <p>
                Nos enorgullece trabajar directamente con fabricantes locales y mantener los más altos 
                estándares de calidad en cada prenda que mostramos. Nuestra pasión es presentar a las familias 
                opciones de estilo, comodidad y calidad.
              </p>
              <p>
                Hoy, nuestro catálogo es visitado por miles de personas y continuamos creciendo, siempre manteniendo 
                nuestros valores familiares y compromiso con la excelencia en presentación.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Visitantes al mes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Productos disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Calificación promedio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Nuestros Valores */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Calidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cada prenda pasa por rigurosos controles de calidad para garantizar durabilidad y comodidad.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Familia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Entendemos las necesidades de las familias y diseñamos productos pensando en cada miembro.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Excelencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nos esforzamos por superar las expectativas en cada interacción con nuestros clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Innovación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Constantemente buscamos nuevas tendencias y tecnologías para mejorar nuestros productos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Por qué elegirnos */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir O&C?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Actualizaciones Constantes</h3>
              <p className="text-sm text-muted-foreground">
                Renovamos nuestro catálogo mensualmente con las últimas tendencias y productos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Información Completa</h3>
              <p className="text-sm text-muted-foreground">
                Cada producto incluye detalles completos, tallas disponibles y múltiples imágenes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Navegación Fácil</h3>
              <p className="text-sm text-muted-foreground">
                Nuestro catálogo está diseñado para que encuentres fácilmente lo que buscas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Productos Exclusivos</h3>
              <p className="text-sm text-muted-foreground">
                Diseños únicos y tendencias actuales que no encontrarás en otros lugares.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Comunidad</h3>
              <p className="text-sm text-muted-foreground">
                Formamos parte de una comunidad que valora la moda familiar y sostenible.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Compromiso Social</h3>
              <p className="text-sm text-muted-foreground">
                Apoyamos iniciativas locales y trabajamos con proveedores responsables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">¿Listo para descubrir nuestra colección?</h2>
        <p className="text-muted-foreground mb-6">
          Explora nuestro catálogo completo y encuentra las prendas perfectas para tu familia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Badge variant="secondary" className="px-4 py-2">
            Catálogo actualizado mensualmente con nuevas colecciones
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            Cambios y devoluciones hasta 30 días
          </Badge>
        </div>
      </section>
    </div>
  );
}