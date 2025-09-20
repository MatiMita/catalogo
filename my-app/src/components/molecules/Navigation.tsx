import { Logo } from "@/components/atoms/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Ropa para Niño",
    href: "/categoria/niño",
  },
  {
    title: "Ropa para Hombre", 
    href: "/categoria/hombre",
  },
  {
    title: "Todos los Productos",
    href: "/productos",
  },
  {
    title: "Sobre Nosotros",
    href: "/about",
  },
];

export function Navigation() {
  return (
    <div className="flex items-center justify-between w-full">
      <Logo />
      
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink asChild>
                <a
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  )}
                  href={item.href}
                >
                  {item.title}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}