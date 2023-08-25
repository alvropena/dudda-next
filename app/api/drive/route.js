import { log } from "console";
import { NextResponse } from "next/server";

// eslint-disable-next-line import/no-anonymous-default-export
const { google } = require('googleapis');

const client_id = process.env.GOOGLE_CLIENT_ID
const client_secret = process.env.GOOGLE_CLIENT_SECRET
const redirect_uri = "http://localhost:3000"
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri)

// eslint-disable-next-line import/no-anonymous-default-export
async function handler(req, res) {
  let files

  if (req.method !== "GET") {
    // return res.status(405).end();
    return NextResponse.json("Access token is required.");
  }
  const {searchParams} = new URL(req.url)
  const accessToken = searchParams.get("accessToken")

  if (!accessToken) {
    // return res.status(400).send({ error: "Access token is required." });
    return NextResponse.json("Access token is required.");
  }
  oAuth2Client.setCredentials({ access_token: accessToken });
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  try {
    const response = await drive.files.list({ pageSize: 10 });
    const files = response.data.files;
    return NextResponse.json({ files });
  } catch (error) {
    console.error("The API returned an error:", error);
    return NextResponse.json("An error occurred.");
  }

}

export const config = {
  api: {
    bodyParser: false,
  },
};

export { handler as GET, handler as POST };