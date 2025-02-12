"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

// Tipos de dados
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
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// Função para buscar os dados do usuário
const fetchUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/api/auth/getUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Atualiza os dados do usuário
  const refreshUser = async () => {
    const token = getCookie("token");
    if (typeof token !== "string") return;

    try {
      setLoading(true);
      const userData = await fetchUser(token);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Busca os dados do usuário ao carregar o app
  useEffect(() => {
    const token = getCookie("token");

    if (typeof token === "string") {
      fetchUser(token)
        .then(setUser)
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
