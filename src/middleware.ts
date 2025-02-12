import { NextRequest, NextResponse } from "next/server";

// Define as rotas protegidas
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Pega o token do cookie

  // Se o usuário tentar acessar uma rota protegida sem token, redireciona para login
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Define em quais caminhos o middleware será executado
export const config = {
  matcher: "/dashboard/:path*",
};
