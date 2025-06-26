"use client"

import { useState } from "react"
import TextToSpeechGenerator from "./text-to-speech-generator"
import LegivixGenerator from "./legivix-generator"
import NewsLegivixGenerator from "./news-legivix-generator"
import RewriterLegivixGenerator from "./rewriter-legivix-generator"
import RewriterJustaGenerator from "./rewriter-justa-generator"
import BuscamedGenerator from "./buscamed-generator"
import RewriterBuscamedGenerator from "./rewriter-buscamed-generator"
import RewriterAvisaGenerator from "./rewriter-avisa-generator"
import AatamedWriterGenerator from "./aatamed-writer-generator"
import AatamedNewsRewriterGenerator from "./aatamed-news-rewriter-generator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import TextGenerator from "./text-generator"

export default function GeneratorSelector() {
  const [mode, setMode] = useState<"audio" | "text" | "legivix" | "news-legivix" | "rewriter-legivix" | "rewriter-justa" | "buscamed" | "rewriter-buscamed" | "rewriter-avisa" | "aatamed" | "aatamed-news-rewriter">("text")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mode">Selecione o modo</Label>
        <Select value={mode} onValueChange={(value: "audio" | "text" | "legivix" | "news-legivix" | "rewriter-legivix" | "rewriter-justa" | "buscamed" | "rewriter-buscamed" | "rewriter-avisa" | "aatamed" | "aatamed-news-rewriter") => setMode(value)}>
          <SelectTrigger id="mode" className="w-full">
            <SelectValue placeholder="Selecione o modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Gerador de Conteúdo (com base em Notícias) - justa.legal</SelectItem>
            <SelectItem value="audio">Gerador de Áudio</SelectItem>
            <SelectItem value="legivix">Gerador de Conteúdo (Base de Conhecimento) - Legivix</SelectItem>
            <SelectItem value="news-legivix">Gerador de Conteúdo (com base em Notícias) - Legivix</SelectItem>
            <SelectItem value="rewriter-legivix">Reescritor de Conteúdo - Legivix</SelectItem>
            <SelectItem value="rewriter-justa">Reescritor de Conteúdo - justa.legal</SelectItem>
            <SelectItem value="buscamed">Gerador de Conteúdo (com notícias) - Buscamed</SelectItem>
            <SelectItem value="rewriter-buscamed">Reescritor de Conteúdo - Buscamed</SelectItem>
            <SelectItem value="rewriter-avisa">Reescritor de Conteúdo - Avisa.ai</SelectItem>
            <SelectItem value="aatamed">Gerador de Conteúdo - AATAMED</SelectItem>
            <SelectItem value="aatamed-news-rewriter">Reescritor de notícias - AATAMED</SelectItem>
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
      ) : mode === "rewriter-justa" ? (
        <RewriterJustaGenerator />
      ) : mode === "buscamed" ? (
        <BuscamedGenerator />
      ) : mode === "rewriter-buscamed" ? (
        <RewriterBuscamedGenerator />
      ) : mode === "rewriter-avisa" ? (
        <RewriterAvisaGenerator />
      ) : mode === "aatamed" ? (
        <AatamedWriterGenerator />
      ) : mode === "aatamed-news-rewriter" ? (
        <AatamedNewsRewriterGenerator />
      ) : (
        <TextGenerator />
      )}
    </div>
  )
}
