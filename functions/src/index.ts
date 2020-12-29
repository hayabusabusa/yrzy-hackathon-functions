import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import * as express from 'express';
import { LineResponce } from './entity';

const config = {
    channelSecret: functions.config().line.secret,
    channelAccessToken: functions.config().line.token,
};

const app = express();

app.post('/', line.middleware(config), (req, res) => {
    const json = JSON.stringify(req.body);
    const response: LineResponce = JSON.parse(json);
    const client = new line.Client(config);

    functions.logger.info(response.events[0].message.text);
    client.replyMessage(response.events[0].replyToken, {type: "text", text: response.events[0].message.text})
    res.status(200).send()
});

export const lineBOT = functions.region('asia-northeast1').https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello World");
    response.send("first tranning");
});
