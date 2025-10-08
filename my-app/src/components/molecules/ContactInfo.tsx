import { ContactItem } from "@/components/atoms/ContactItem";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
        <div className="space-y-4">
          <ContactItem
            icon={Phone}
            label="Teléfono"
            value="+(591) 61675074"
            href="tel:+59161675074"
          />
          <ContactItem
            icon={Mail}
            label="Email"
            value="contacto@oyc.com"
            href="mailto:contacto@oyc.com"
          />
          <ContactItem
            icon={MapPin}
            label="Dirección"
            value="Cochabamba, Bolivia"
            href="https://maps.app.goo.gl/ALiUpkdY1G4gzhxe7"
          />
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-3">Síguenos</h4>
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
    </div>
  );
}