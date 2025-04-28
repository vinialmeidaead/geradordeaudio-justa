"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("")
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
          "Authorization": "Bearer app-Xqkpw49IDlQuAyoQXBjKb0At",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            conteudo: prompt
          },
          response_mode: "blocking",
          user: "justa-ia",
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Falha na requisição à API")
      }

      // Ajuste para acessar o texto no caminho correto da resposta
      if (data.data?.outputs?.final) {
        setResult(data.data.outputs.final)
        toast({
          title: "Sucesso",
          description: "Texto gerado com sucesso!",
        })
      } else {
        throw new Error("Nenhum texto foi gerado")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao gerar o texto",
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
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Digite seu prompt aqui..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-32"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating || !prompt}>
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando Texto...
              </>
            ) : (
              "Gerar Texto"
            )}
          </Button>

          {result && (
            <div className="space-y-2">
              <Label>Resultado</Label>
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
