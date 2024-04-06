"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function App() {
  const router = usePathname();

  console.log(router);

  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">IdeaMagix</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router === "/"}>
          <Link
            className={`${router === "/" ? " text-blue-600" : "text-white"}`}
            href="/"
          >
            Admin
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router === "/instructor"}>
          <Link
            className={`${
              router === "/instructor" ? " text-blue-600" : "text-white"
            }`}
            href="/instructor"
          >
            Instructor
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
