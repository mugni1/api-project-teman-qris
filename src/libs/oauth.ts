import { google } from 'googleapis'
import 'dotenv/config'

export const authClient = new google.auth.OAuth2({
  clientId: process.env.CLIENT_GOOGLE_ID || '',
  clientSecret: process.env.CLIENT_GOOGLE_SECRET || '',
  redirectUri: process.env.BE_ORIGIN_URL + '/auth/google/callback',
})

export const authGoogleUrl = authClient.generateAuthUrl({
  access_type: 'offline',
  scope: ['email', 'profile'],
  include_granted_scopes: true,
})
