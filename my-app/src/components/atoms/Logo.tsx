import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("font-bold text-primary", sizeClasses[size], className)}>
      <span className="text-primary">O</span>
      <span className="text-accent-foreground">&amp;C</span>
    </div>
  );
}