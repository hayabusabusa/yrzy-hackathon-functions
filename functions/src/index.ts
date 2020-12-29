import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    const channelSecret = functions.config().line.secret;
    if (channelSecret === undefined) {
        functions.logger.info("key `CHANNEL_SECRET` is undefined.");
    }
  
    response.send(`Hello from Firebase! SECRET=${channelSecret}`);
});
