"use client"

import { useState } from "react"
import TextToSpeechGenerator from "./text-to-speech-generator"
import LegivixGenerator from "./legivix-generator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import TextGenerator from "./text-generator"

export default function GeneratorSelector() {
  const [mode, setMode] = useState<"audio" | "text" | "legivix">("text")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mode">Selecione o modo</Label>
        <Select value={mode} onValueChange={(value: "audio" | "text" | "legivix") => setMode(value)}>
          <SelectTrigger id="mode" className="w-full">
            <SelectValue placeholder="Selecione o modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Gerador de Texto</SelectItem>
            <SelectItem value="audio">Gerador de Áudio</SelectItem>
            <SelectItem value="legivix">Gerador Legivix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === "audio" ? (
        <TextToSpeechGenerator />
      ) : mode === "legivix" ? (
        <LegivixGenerator />
      ) : (
        <TextGenerator />
      )}
    </div>
  )
}
