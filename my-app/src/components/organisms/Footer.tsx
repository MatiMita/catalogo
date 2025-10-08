import { Logo } from "@/components/atoms/Logo";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo y descripción */}
          <div>
            <Logo size="lg" className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              Tu destino confiable para productos de calidad. Ofrecemos una amplia gama de productos 
              con el mejor servicio al cliente y garantía de satisfacción.
            </p>
            <div className="flex gap-3">
              <SocialIcon
                icon={Facebook}
                href="https://www.facebook.com/profile.php?id=61582022907209"
                label="Facebook"
              />
              <SocialIcon
                icon={Instagram}
                href="https://instagram.com"
                label="Instagram"
              />
            </div>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+(591) 61675074</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>contacto@oyc.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <a href="https://maps.app.goo.gl/ALiUpkdY1G4gzhxe7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Cochabamba, Bolivia
                </a>
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