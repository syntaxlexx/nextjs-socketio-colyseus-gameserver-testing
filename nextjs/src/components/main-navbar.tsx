"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";

interface Props {}

const MainNavbar: FC<Props> = ({}) => {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img alt="Logo" className="mr-3 h-6 sm:h-9" src="/favicon.ico" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NextJs + Colyseus
        </span>
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        {user.username ? (
          <div className="flex gap-2 items-center">
            <div>{user.username}</div>
            <Button>Logout</Button>
          </div>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active onClick={() => router.push("/")}>
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/chat")}>
          Chat (Socket.io)
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/colyseus")}>
          Colyseus
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/private/colyseus")}>
          Colyseus (Auth)
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
