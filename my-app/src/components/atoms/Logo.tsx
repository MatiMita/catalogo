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
    <div className={cn("font-bold", sizeClasses[size], className)}>
      <span className="text-orange-600">🎃O</span>
      <span className="text-purple-600">&amp;C👻</span>
    </div>
  );
}