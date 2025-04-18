"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyAccessCode } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export default function AccessVerification() {
  const [accessCode, setAccessCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)

    try {
      const result = await verifyAccessCode(accessCode)
      if (result.success) {
        toast({
          title: "Acesso Concedido",
          description: "Bem-vindo ao Justa Gerador de Áudio!",
        })
        router.push("/generator")
      } else {
        toast({
          title: "Acesso Negado",
          description: "Código de acesso inválido. Por favor, tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verificação de Acesso</CardTitle>
        <CardDescription>Por favor, digite seu código de acesso para continuar</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <Input
              id="accessCode"
              type="password"
              placeholder="Digite o código de acesso"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isVerifying || !accessCode}>
            {isVerifying ? "Verificando..." : "Continuar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
