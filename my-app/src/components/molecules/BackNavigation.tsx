import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface BackNavigationProps {
  backUrl: string;
  backLabel: string;
  showHome?: boolean;
  additionalLinks?: Array<{
    href: string;
    label: string;
  }>;
}

export function BackNavigation({ 
  backUrl, 
  backLabel, 
  showHome = true, 
  additionalLinks = [] 
}: BackNavigationProps) {
  return (
    <nav className="mb-6">
      <div className="flex flex-wrap gap-2">
        {/* Botón principal de regreso */}
        <Button variant="ghost" size="sm" asChild>
          <Link href={backUrl} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sm:hidden">Atrás</span>
          </Link>
        </Button>

        {/* Botón de inicio (opcional) */}
        {showHome && backUrl !== '/' && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </Button>
        )}

        {/* Enlaces adicionales */}
        {additionalLinks.map((link, index) => (
          <Button key={index} variant="ghost" size="sm" asChild>
            <Link href={link.href} className="flex items-center gap-2">
              <span className="text-muted-foreground">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}