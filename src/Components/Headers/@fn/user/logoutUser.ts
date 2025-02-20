import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export const logoutUser = async () => {
  try {
    // Remove o token e os dados do usuário dos cookies
    deleteCookie("token");
    deleteCookie("user");

    return { message: "Logout realizado com sucesso!" };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw new Error("Erro ao sair da conta");
  }
};

export const useLogout = () => {
  const router = useRouter(); // Hook para redirecionamento

  return useMutation({
    mutationFn: logoutUser, // Função que executa o logout
    onSuccess: () => {
      router.push("/login"); // Redireciona para a página de login
    },
    onError: (error) => {
      console.error("Erro ao fazer logout:", error);
    },
  });
};
