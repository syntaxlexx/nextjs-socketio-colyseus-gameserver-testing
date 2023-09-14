import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    const resp = await fetch("/api/logout");
    if (resp.ok) {
      router.replace("/");
      router.refresh();
    }
  };

  return {
    logout,
  };
};
