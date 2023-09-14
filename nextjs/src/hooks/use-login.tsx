import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    const resp = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    setLoading(false);

    if (!resp.ok) {
      console.log("error", await resp.text());
      setError("Could not sign in!");
      throw new Error("Could not sign in!");
    }

    await resp.json();
  };

  return {
    login,
    loading,
    error,
  };
};
