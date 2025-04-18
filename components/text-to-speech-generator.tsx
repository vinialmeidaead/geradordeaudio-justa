"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { generateSpeech } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Download, Play, Pause } from "lucide-react"

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer", "coral", "sage", "ash", "ballad"]

const DEFAULT_INSTRUCTIONS = `Affect/personality: A cheerful guide 

Tone: Friendly, clear, and reassuring, creating a calm atmosphere and making the listener feel confident and comfortable.

Pronunciation: Clear, articulate, and steady, ensuring each instruction is easily understood while maintaining a natural, conversational flow.

Pause: Brief, purposeful pauses after key instructions (e.g., "cross the street" and "turn right") to allow time for the listener to process the information and follow along.

Emotion: Warm and supportive, conveying empathy and care, ensuring the listener feels guided and safe throughout the journey.`

export default function TextToSpeechGenerator() {
  const [text, setText] = useState("")
  const [voice, setVoice] = useState("nova")
  const [instructions, setInstructions] = useState(DEFAULT_INSTRUCTIONS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setAudioSrc(null)

    try {
      const formData = new FormData()
      formData.append("text", text)
      formData.append("voice", voice)
      formData.append("instructions", instructions)

      const result = await generateSpeech(formData)

      if (result.success && result.audioData) {
        const audioDataUrl = `data:${result.contentType};base64,${result.audioData}`
        setAudioSrc(audioDataUrl)
        toast({
          title: "Sucesso",
          description: "Áudio gerado com sucesso!",
        })
      } else {
        toast({
          title: "Erro",
          description: result.error || "Falha ao gerar áudio",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleDownload = () => {
    if (audioSrc) {
      const a = document.createElement("a")
      a.href = audioSrc
      a.download = `justa-audio-${voice}-${new Date().getTime()}.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Texto para converter em áudio</Label>
            <Textarea
              id="text"
              placeholder="Digite o texto que você deseja converter em áudio..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-32 w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="voice">Voz</Label>
              <Select value={voice} onValueChange={setVoice} required>
                <SelectTrigger id="voice" className="w-full">
                  <SelectValue placeholder="Selecione uma voz" />
                </SelectTrigger>
                <SelectContent>
                  {VOICES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instruções (opcional)</Label>
              <Textarea
                id="instructions"
                placeholder="Ex.: Fale em um tom alegre"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-32 w-full"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating || !text}>
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando Áudio...
              </>
            ) : (
              "Gerar Áudio"
            )}
          </Button>
        </form>

        {audioSrc && (
          <div className="mt-6">
            <div className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
              <Button type="button" variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnded} className="hidden" />

              <Button type="button" variant="outline" size="icon" onClick={handleDownload}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
