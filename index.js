const express = require('express');
const { google } = require('googleapis');
const axios = require('axios');
const app = express();

const credentials = require('../../credentials.json')

const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

// Define the OAuth2 scope
const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.profile'
];

// Generate the authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES
});

// Redirect the user to the authentication URL
app.get('/auth', (req, res) => {
  return res.redirect(authUrl);
});

// Handle the OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.redirect('/readDrive');
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).send('Error fetching token');
  }
});

app.get('/readDrive', (req, res) => {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  drive.files.list(
    {
      pageSize: 10
    },
    (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return res.status(400).send(err);
      }
      const files = response.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
      res.send(files);
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
