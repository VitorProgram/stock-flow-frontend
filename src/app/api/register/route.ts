import { NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    // Pega o email e a senha da requisição em formato JSON
    const { email, password } = await req.json();

    // Se não estiverem preenchidos, erro
    if (!email || !password) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    // Se o usuário já existir, erro
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    const hashedPassword = hashSync(password, 8); // Senha criptografada

    // Criando um usuário
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
