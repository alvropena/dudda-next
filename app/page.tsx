"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const page = () => {
  return (
    <div className="m-5">
      <main className="flex h-screen w-screen items-center justify-center">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <p className="text-6xl mb-4">
              Interactúa con tu información de la manera más inteligente
            </p>
            <p className="text-xl mb-4">
              Da el siguiente paso junto a miles de negocios y emprendedores
              más. Conecta tus plataformas de almacenamiento y empieza a
              organizarte, dirigir y crear en un mismo lugar.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => signIn("google")}>Empieza ahora</Button>
              <a
                href="/contact-sales"
                className="px-4 py-2 rounded border"
                target="_blank"
              >
                Contacta a nuestro equipo de ventas
              </a>
            </div>
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <Image src="" alt="demo" height={120} width={120} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
