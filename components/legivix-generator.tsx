"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export default function LegivixGenerator() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const response = await fetch("https://gestaoia.ead.support/v1/workflows/run", {
        method: "POST",
        headers: {
          "Authorization": "Bearer app-hj73azBhAdQCk1wzG8V3o3ZW",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            tema: prompt
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
          description: "Texto Legivix gerado com sucesso!",
        })
      } else {
        throw new Error("Nenhum texto foi gerado")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao gerar o texto Legivix",
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
            <Label htmlFor="prompt">Prompt Legivix</Label>
            <Textarea
              id="prompt"
              placeholder="Digite seu prompt para o Legivix aqui..."
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
                Gerando Texto Legivix...
              </>
            ) : (
              "Gerar Texto Legivix"
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
