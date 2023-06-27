import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("缺失信息", { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error, "注册失败")
    return new NextResponse("服务器出错", { status: 500 })
  }
}
