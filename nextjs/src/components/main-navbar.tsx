"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {}

const MainNavbar: FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img alt="Logo" className="mr-3 h-6 sm:h-9" src="/favicon.ico" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NextJs + Colyseus
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active onClick={() => router.push("/")}>
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/chat")}>Chat</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
