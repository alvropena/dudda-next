import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const prisma = new PrismaClient()


async function handler(req, res) {
  const { id, email, name } = await req.json();
  console.log(email)
    try {
      const newUser = await prisma.user.create({
        data: {
          email : "test",
          name: "ok",
        }
      })

      return NextResponse.json({ newUser });

    } catch (error) {
      console.log(error)
return NextResponse.json("An error occurred.");
    }

}


export { handler as GET, handler as POST };
