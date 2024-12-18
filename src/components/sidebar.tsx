"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter для редиректа
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Car, Users, FileText, MapPin, CreditCard, MessageSquare, Settings, Menu, UserPlus } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const menuItems = [
  { href: "/dashboard/clients", icon: Users, label: "Clients" },
  { href: "/dashboard/contracts", icon: FileText, label: "Contracts" },
  { href: "/dashboard/locations", icon: MapPin, label: "Locations" },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments" },
  { href: "/dashboard/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Используем useRouter для редиректа

  // Получаем роль из локального хранилища
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Декодируем токен
        setRole(decoded.role); // Сохраняем роль в состояние
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  useEffect(() => {
    if (role === null) {
      router.push("/admin"); // Редиректим на /admin, если роли нет
    }
  }, [role, router]);

  // Условный элемент для `owner`
  const isOwner = role === "owner"; // Вместо проверки pathname, можно использовать роль напрямую
  const ownerMenuItem = {
    href: "/dashboard/register-user",
    icon: UserPlus,
    label: "Register User",
  };
  const secondOwnerItem = { href: "/dashboard/cars", icon: Car, label: "Cars" };

  return (
    <div
      className={cn(
        "border-r bg-card text-card-foreground",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-300",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <h1 className="text-lg font-semibold">Car Rental Admin</h1>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {!collapsed && <p className="text-lg font-semibold">{role}</p>}

      <nav className="space-y-2 p-2">
        {isOwner && (
          <Link
            href={`/admin/owner${secondOwnerItem.href}`}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === secondOwnerItem.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center",
            )}
          >
            <secondOwnerItem.icon className="h-5 w-5" />
            {!collapsed && <span>{secondOwnerItem.label}</span>}
          </Link>
        )}
        {role !== null && menuItems.map((item) => (
          <Link
            key={item.href}
            href={`/admin/${role}${item.href}`}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center",
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}

        {/* Условное добавление меню для owner */}
        {isOwner && (
          <Link
            href={`/admin/owner${ownerMenuItem.href}`}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === ownerMenuItem.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center",
            )}
          >
            <ownerMenuItem.icon className="h-5 w-5" />
            {!collapsed && <span>{ownerMenuItem.label}</span>}
          </Link>
        )}
      </nav>
    </div>
  );
}
