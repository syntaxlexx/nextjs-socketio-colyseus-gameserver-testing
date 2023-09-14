"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-login";
import { FC, FormEvent, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {}

const LoginForm: FC<Props> = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error, loading, login } = useLogin();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await login(username, password);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your Account</CardTitle>
        {error && <CardDescription>{error}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target?.value)}
            value={username}
            name="username"
            required
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target?.value)}
            value={password}
            name="password"
            type="password"
            required
          />

          <div className="flex gap-4 items-center">
            <Button>Login</Button>
            {loading && <Loader className="animate-spin" />}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
