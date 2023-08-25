"use client"; // This is a client component 👈🏽
import { signIn, useSession } from "next-auth/react";
// // 'use client'

// // import React, { useEffect } from "react";
// // import { signOut, useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import Loading from "./loading";

// // const { google } = require('googleapis')
// // const credentials = require('../../credentials.json')

// // const client_id = credentials.web.client_id
// // const client_secret = credentials.web.client_secret
// // const redirect_uris = credentials.web.redirect_uris
// // const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

// // const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

// // const AuthPage = () => {
// //   const { data: session } = useSession();
// //   const router = useRouter();
// //   console.log(session);

// //   useEffect(() => {
// //     if (!session) {
// //       const timeoutId = setTimeout(() => {
// //         router.push("/");
// //       }, 5000);

// //       return () => {
// //         clearTimeout(timeoutId);
// //       };
// //     }
// //   }, [session, router]);

// //   return (
// //     <div className="m-5 mt-20 text-[40px] items-center text-center">
// //       {session && session.user ? (
// //         <h1>Welcome {session.user.name}</h1>
// //       ) : (
// //         <Loading />
// //       )}
// //       {session && <Button onClick={() => signOut()}>Sign Out</Button>}
// //     </div>
// //   );
// // };

// // export default AuthPage;


import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

const AuthPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [driveFiles, setDriveFiles] = useState([]);
const getFile = async () => {
  const token = session.accessToken
  const data = await axios.get(`api/drive?accessToken=${token}`)
  setDriveFiles(data.data.files)
}

async function saveUserData(user) {
  console.log(user)
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("There was an error saving the user data:", error);
  }
}
  useEffect( () => {
    if (!session) {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      saveUserData(session.user)
      getFile()

    }
  }, [session, router]);

  return (
    <div className="m-5 mt-20 text-[40px] items-center text-center">
      {session && session.user ? (
        <div>
          <h1>Welcome {session.user.name}</h1>
          {driveFiles && driveFiles.length > 0 && (
            <div>
              <h2 className="mt-5">Your Drive Files:</h2>
              <ul className="mt-5">
                {driveFiles.map((file) => (
                  <li className="mt-2" key={file.id}>File ID: {file.id} <br />File Name: {file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      {/* {session && <Button onClick={() => signOut()}>Sign Out</Button>} */}
    </div>
  );
};

export default AuthPage;
