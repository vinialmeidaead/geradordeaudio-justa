import AccessVerification from "@/components/access-verification"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">Justa Gerador de Áudio</h1>
      <div className="w-full max-w-md mx-auto">
        <AccessVerification />
      </div>
    </div>
  )
}
