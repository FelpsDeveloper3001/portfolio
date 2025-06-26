import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 })
    }

    return NextResponse.json({ message: "EM DESENVOLVIMENTO" }, { status: 200 })
  }
