import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  className?: string;
}

export function ProductCard({
  id,
  title,
  description,
  image,
  category,
  className
}: ProductCardProps) {
  return (
    <Link href={`/producto/${id}`}>
      <Card className={cn("group cursor-pointer transition-all hover:shadow-lg", className)}>
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
            {image && image.trim() !== '' ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground text-sm">Sin imagen</span>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                {category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {description}
            </p>
            <div className="mt-3 flex items-center justify-end">
              <span className="text-xs text-muted-foreground">Ver detalles</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}