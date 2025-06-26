"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export default function AatamedNewsRewriterGenerator() {
  const [tema, setTema] = useState("")
  const [publico, setPublico] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const response = await fetch("https://geral-dify.rf7qpg.easypanel.host/v1/workflows/run", {
        method: "POST",
        headers: {
          "Authorization": "Bearer app-OvDDdHAYqZcTf51yjWEd0MpN", 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            tema,
            publico
          },
          response_mode: "blocking",
          user: "justa-ia",
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Falha na requisição à API")
      }

      if (data.data?.outputs?.fim) {
        setResult(data.data.outputs.fim)
        toast({
          title: "Sucesso",
          description: "Notícia reescrita com sucesso!",
        })
      } else {
        throw new Error("Nenhuma notícia foi reescrita")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao reescrever a notícia",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tema">Notícia para Reescrever</Label>
            <Textarea
              id="tema"
              placeholder="Cole aqui a notícia que você deseja reescrever..."
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="min-h-16"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publico">Público Alvo</Label>
            <Input
              id="publico"
              placeholder="Ex: Profissionais de saúde, pacientes, etc."
              value={publico}
              onChange={(e) => setPublico(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isGenerating || !tema || !publico}>
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reescrevendo Notícia...
              </>
            ) : (
              "Reescrever Notícia"
            )}
          </Button>
          {result && (
            <div className="space-y-2">
              <Label>Notícia Reescrita</Label>
              <div className="p-4 rounded-md bg-muted prose prose-sm max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
