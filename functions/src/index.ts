import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import * as express from 'express';

const config = {
    channelSecret: functions.config().line.secret,
    channelAccessToken: functions.config().line.token,
};

const app = express();

app.post('/', line.middleware(config), (req, res) => {
    functions.logger.info(req.body, { structuredData: true });
    res.status(200).send()
});

export const lineBOT = functions.region('asia-northeast1').https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello World");
    response.send("first tranning");
});
