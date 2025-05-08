"use client"

import { useState } from "react"
import TextToSpeechGenerator from "./text-to-speech-generator"
import LegivixGenerator from "./legivix-generator"
import NewsLegivixGenerator from "./news-legivix-generator"
import RewriterLegivixGenerator from "./rewriter-legivix-generator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import TextGenerator from "./text-generator"

export default function GeneratorSelector() {
  const [mode, setMode] = useState<"audio" | "text" | "legivix" | "news-legivix" | "rewriter-legivix">("text")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mode">Selecione o modo</Label>
        <Select value={mode} onValueChange={(value: "audio" | "text" | "legivix" | "news-legivix" | "rewriter-legivix") => setMode(value)}>
          <SelectTrigger id="mode" className="w-full">
            <SelectValue placeholder="Selecione o modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Gerador de Texto</SelectItem>
            <SelectItem value="audio">Gerador de Áudio</SelectItem>
            <SelectItem value="legivix">Gerador Legivix</SelectItem>
            <SelectItem value="news-legivix">Gerador com Notícias - Legivix</SelectItem>
            <SelectItem value="rewriter-legivix">Reescritor de Conteúdo - Legivix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === "audio" ? (
        <TextToSpeechGenerator />
      ) : mode === "legivix" ? (
        <LegivixGenerator />
      ) : mode === "news-legivix" ? (
        <NewsLegivixGenerator />
      ) : mode === "rewriter-legivix" ? (
        <RewriterLegivixGenerator />
      ) : (
        <TextGenerator />
      )}
    </div>
  )
}
