import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
  className?: string;
}

export function SocialIcon({ icon: Icon, href, label, className }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={20} />
    </a>
  );
}