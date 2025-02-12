"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios"; // Certifique-se de ter o axios instalado

// Definição do tipo de usuário completo
interface Item {
  id: string;
  name: string;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface User {
  id: string;
  name: string;
  email: string;
  categories: Category[];
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

// Criando o contexto da autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto mais facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// Função para pegar os dados do usuário utilizando o JWT
const getUser = async (token: string): Promise<User> => {
  try {
    // Realiza uma requisição GET para o endpoint /api/user passando o token no cabeçalho
    const response = await axios.get("http://localhost:3333/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retorna os dados completos do usuário, incluindo categorias e itens
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);
    throw new Error("Não foi possível obter os dados do usuário.");
  }
};

// Provedor do contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token"); // Recupera o token armazenado nos cookies

    if (typeof token === "string") {
      // Se o token estiver presente, tenta buscar os dados do usuário
      getUser(token) // Função que chama a API do backend para pegar os dados do usuário
        .then((userData) => {
          setUser(userData); // Armazena os dados do usuário no estado
        })
        .catch((error) => {
          console.error(error);
          deleteCookie("token");
          deleteCookie("user"); // Remove cookies corrompidos ou inválidos
          router.push("/login"); // Redireciona para a página de login em caso de erro
        });
    }
  }, [router]);

  // Função de logout
  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
