import { ContactItem } from "@/components/atoms/ContactItem";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
        <div className="space-y-4">
          <ContactItem
            icon={Phone}
            label="Teléfono"
            value="+1 (555) 123-4567"
            href="tel:+15551234567"
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
            value="123 Calle Principal, Ciudad, País"
          />
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-3">Síguenos</h4>
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
    </div>
  );
}