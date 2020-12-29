import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// NOTE: .env 読み込み用の設定
dotenv.config({
    path: resolve(__dirname, '../.env'),
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(`Hello from Firebase! TOKEN=${process.env.CHANNEL_ACCESS_TOKEN}`);
});
