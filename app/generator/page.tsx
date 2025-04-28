import GeneratorSelector from "@/components/generator-selector"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function GeneratorPage() {
  const authenticated = (await cookies()).get("authenticated")
  if (authenticated?.value !== "true") {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">Justa IA</h1>
      <div className="w-full">
        <GeneratorSelector />
      </div>
    </div>
  )
}
