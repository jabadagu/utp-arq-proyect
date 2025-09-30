"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Settings, FileText, BarChart3, Shield, Home, BookOpen } from "lucide-react"

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const adminLinks = [
    { href: "/dashboard", label: "Panel Principal", icon: LayoutDashboard },
    { href: "/dashboard/usuarios", label: "Usuarios", icon: Users },
    { href: "/dashboard/reportes", label: "Reportes", icon: BarChart3 },
    { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
    { href: "/dashboard/seguridad", label: "Seguridad", icon: Shield },
  ]

  const invitadoLinks = [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/dashboard/documentos", label: "Mis Documentos", icon: FileText },
    { href: "/dashboard/recursos", label: "Recursos", icon: BookOpen },
    { href: "/dashboard/perfil", label: "Mi Perfil", icon: Settings },
  ]

  const links = role === "admin" ? adminLinks : invitadoLinks

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-sidebar-primary rounded" />
          <span className="text-lg font-semibold text-sidebar-foreground">MiApp</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
          <p className="font-medium">Rol: {role === "admin" ? "Administrador" : "Invitado"}</p>
        </div>
      </div>
    </aside>
  )
}
