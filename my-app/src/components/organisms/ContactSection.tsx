import { ContactInfo } from "@/components/molecules/ContactInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 bg-background" id="contacto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <ContactInfo />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Asunto del mensaje"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}