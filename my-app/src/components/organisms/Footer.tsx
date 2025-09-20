import { Logo } from "@/components/atoms/Logo";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              Tu destino confiable para productos de calidad. Ofrecemos una amplia gama de productos 
              con el mejor servicio al cliente y garantía de satisfacción.
            </p>
            <div className="flex gap-3">
              <SocialIcon
                icon={Facebook}
                href="https://facebook.com"
                label="Facebook"
              />
              <SocialIcon
                icon={Instagram}
                href="https://instagram.com"
                label="Instagram"
              />
              <SocialIcon
                icon={Twitter}
                href="https://twitter.com"
                label="Twitter"
              />
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-primary transition-colors">Productos</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contacto@oyc.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Calle Principal, Ciudad</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; 2025 O&C. Todos los derechos reservados.</p>
            <a 
              href="/admin/login" 
              className="text-xs hover:text-primary transition-colors opacity-50 hover:opacity-100"
            >
              Acceso administrativo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}