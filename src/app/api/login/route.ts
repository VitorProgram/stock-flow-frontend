import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { compare } from "bcrypt-ts";

export async function POST(req: Request) {
  try {
    // Pegando as informações de email e senha da requisição
    const { email, password } = await req.json();

    // Verificando existência do usuário
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) throw new Error("Usuário não existente.");

    // Verificando a senha
    const verifyPassword = await compare(
      password,
      userExists.password as string
    );
    if (!verifyPassword) throw new Error("Password inválido");

    // Com tudo certo, login efetuado
    return NextResponse.json({ message: "Login efetuado." }, { status: 201 });
  } catch (error) {
    console.error("Erro ao tentar fazer login: ", error);
    return NextResponse.json(
      { message: "Erro ao tentar fazer login" },
      { status: 500 }
    );
  }
}
