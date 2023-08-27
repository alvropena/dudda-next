"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const page = () => {
  return (
    <div className="bg-gradient-to-b from-pink-600 via-slate-100 to-pink-300 p-5">
      
      <main className="flex h-screen items-center justify-center">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <p className="text-9xl mb-4 font-bold">
              Interactúa con tu información
            </p>
            <p className="text-2xl mb-4">
              Miles de negocios y emprendedores utilizan nuestra plataforma para
              organizar, actualizar y visualizar sus datos.
            </p>
            <div className="flex space-x-4">
              <Link href="/register">
                <Button>
                  Empieza ahora
                  <ChevronRight size={"20px"} />
                </Button>
              </Link>
              <a
                href="/sales"
                className="px-4 py-2 rounded border bg-white"
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
