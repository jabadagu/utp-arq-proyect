"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Credenciales inválidas. Intenta de nuevo.")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-8 w-8 bg-foreground rounded" />
          <span className="text-xl font-semibold tracking-tight">MiApp</span>
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">Bienvenido</CardTitle>
        <CardDescription className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input id="email" type="email" placeholder="nombre@ejemplo.com" {...register("email")} className="h-11" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")}
              className="h-11"
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <p className="text-xs font-medium text-muted-foreground mb-2">Usuarios de prueba:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Admin: admin@example.com / admin123</p>
            <p>Invitado: invitado@example.com / invitado123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
