'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5" id="home">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-primary">O&C</span>
            <br />
            <span className="text-muted-foreground">Tu tienda de moda premium</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre una amplia selección de productos de alta calidad. 
            Desde ropa para niños hasta moda masculina y femenina explora nuestro catálogo completo.
          </p>
          
          <div className="flex justify-center">
            <Link href="/productos">
              <Button size="lg" className="text-lg px-8 py-6">
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}