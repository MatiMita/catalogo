import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export function ContactItem({ icon: Icon, label, value, href, className }: ContactItemProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-base font-medium">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="transition-colors hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}