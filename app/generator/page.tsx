import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import TextToSpeechGenerator from "@/components/text-to-speech-generator"

export default function GeneratorPage() {
  // Verificação do lado do servidor para autenticação
  const authenticated = cookies().get("authenticated")
  if (authenticated?.value !== "true") {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">Justa Gerador de Áudio</h1>
      <div className="w-full">
        <TextToSpeechGenerator />
      </div>
    </div>
  )
}
