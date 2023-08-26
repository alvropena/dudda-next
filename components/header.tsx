"use client";
import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
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
    <div>
      <header className="flex flex-row justify-between m-5">
        <div className="flex gap-x-6 items-center">
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>

        {session?.user ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2">
            <ModeToggle />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Iniciar sesión</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Iniciar sesión</DialogTitle>
                  <DialogDescription>Ingresa a tu cuenta</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="">
                    <Label htmlFor="name" className="">
                      Correo electrónico
                    </Label>
                    <Input
                      id="name"
                      value=""
                      className=""
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
                      className=""
                      placeholder="******"
                    />
                  </div>
                </div>
                <Button onClick={handleSubmit}>Continuar con Google</Button>
                <DialogFooter>
                  <Button type="submit">Iniciar sesión</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
