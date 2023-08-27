"use client";
import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import UpgradeButton from "./upgrade-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const handleSubmit = () => {
    signIn("google");
  };

  const links = session?.user
    ? [
        { href: "/dashboard", label: "Home" },
        { href: "/profile", label: "Profile" },
      ]
    : [{ href: "/", label: "Dudda" }];

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="">
      <header className="flex flex-row justify-between">
        <div className="flex gap-x-6 items-center">
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>

        {session?.user ? (
          <Button onClick={handleSignOut}>Cerrar sesión</Button>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Iniciar sesión</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="">
                  <p className="text-xl font-semibold">Iniciar sesión</p>
                  <p className="text-gray-400">Ingresa a tu cuenta</p>
                </div>
                <div className="grid gap-4 ">
                  <div className="">
                    <Label htmlFor="name" className="">
                      Correo electrónico
                    </Label>
                    <Input
                      id="name"
                      value=""
                      className="mt-3"
                      placeholder="hola@dudda.app"
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="username" className="text-right">
                      Contraseña
                    </Label>
                    <Input
                      id="username"
                      value=""
                      className="mt-3"
                      placeholder="*********"
                    />
                  </div>
                </div>
                <button className="bg-black px-4 py-2 rounded border text-white">
                  Iniciar sesión
                </button>
                <div className="flex items-center justify-center">
                  <div className="flex-grow border-b border-gray-300 mx-2"></div>
                  <p className="px-2 text-gray-300">o</p>
                  <div className="flex-grow border-b border-gray-300 mx-2"></div>
                </div>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 rounded border bg-white"
                >
                  Continuar con Google
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 rounded border bg-white"
                >
                  Continuar con Microsoft
                </button>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
