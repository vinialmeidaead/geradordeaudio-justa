import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch("https://geral-dify.rf7qpg.easypanel.host/v1/workflows/run", {
      method: "POST",
      headers: {
        "Authorization": "Bearer app-Xqkpw49IDlQuAyoQXBjKb0At",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          conteudo: body.prompt
        },
        response_mode: "blocking",
        user: "justa-ia",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API Error:', errorData)
      return NextResponse.json(
        { error: errorData.message || "Falha na requisição à API" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: "Falha ao processar a requisição" },
      { status: 500 }
    )
  }
}
