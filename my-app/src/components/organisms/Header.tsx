import { Navigation } from "@/components/molecules/Navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200 bg-gradient-to-r from-orange-50/95 via-purple-50/95 to-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Navigation />
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden hover:bg-orange-100">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>
    </header>
  );
}