"use server"

import { cookies } from "next/headers"

export async function verifyAccessCode(code: string) {
  const correctCode = process.env.ACCESS_CODE

  if (!correctCode) {
    throw new Error("Variável de ambiente ACCESS_CODE não está configurada")
  }

  if (code === correctCode) {
    // Define um cookie para lembrar que o usuário está autenticado
    cookies().set("authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    })

    return { success: true }
  }

  return { success: false }
}

export async function generateSpeech(formData: FormData) {
  const text = formData.get("text") as string
  const voice = formData.get("voice") as string
  const instructions = formData.get("instructions") as string

  if (!text || !voice) {
    return { success: false, error: "Texto e voz são obrigatórios" }
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return { success: false, error: "Chave de API não está configurada" }
  }

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        input: text,
        voice: voice,
        instructions: instructions || undefined,
        response_format: "mp3",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error?.message || "Falha ao gerar áudio",
      }
    }

    // Converte a resposta para uma string base64
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")

    return {
      success: true,
      audioData: base64,
      contentType: "audio/mpeg",
    }
  } catch (error) {
    console.error("Erro ao gerar áudio:", error)
    return {
      success: false,
      error: "Ocorreu um erro ao gerar o áudio",
    }
  }
}
