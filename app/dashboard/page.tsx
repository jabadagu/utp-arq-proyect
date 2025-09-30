import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, BarChart3, Activity } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const isAdmin = (session?.user as any)?.role === "admin"

  const adminStats = [
    { title: "Total Usuarios", value: "1,234", icon: Users, change: "+12%" },
    { title: "Documentos", value: "856", icon: FileText, change: "+8%" },
    { title: "Reportes", value: "42", icon: BarChart3, change: "+23%" },
    { title: "Actividad", value: "98%", icon: Activity, change: "+2%" },
  ]

  const invitadoStats = [
    { title: "Mis Documentos", value: "12", icon: FileText, change: "+2" },
    { title: "Recursos Disponibles", value: "45", icon: BarChart3, change: "5 nuevos" },
  ]

  const stats = isAdmin ? adminStats : invitadoStats

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bienvenido, {session?.user?.name}</h2>
        <p className="text-muted-foreground mt-1">
          {isAdmin ? "Panel de administración - Gestiona tu plataforma" : "Tu espacio personal - Accede a tus recursos"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>{isAdmin ? "Últimas acciones en el sistema" : "Tus últimas actividades"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isAdmin ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo usuario registrado</p>
                      <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Reporte generado</p>
                      <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Configuración actualizada</p>
                      <p className="text-xs text-muted-foreground">Hace 3 horas</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documento descargado</p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Perfil actualizado</p>
                      <p className="text-xs text-muted-foreground">Hace 1 día</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>{isAdmin ? "Funciones principales" : "Tus recursos favoritos"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isAdmin ? (
                <>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Gestionar Usuarios</p>
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Ver Reportes</p>
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Configuración del Sistema</p>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Ver Mis Documentos</p>
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Explorar Recursos</p>
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    <p className="text-sm font-medium">Editar Perfil</p>
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
