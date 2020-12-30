import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as line from '@line/bot-sdk';
import * as express from 'express';
import { LineResponce } from './entity';

admin.initializeApp();

const config = {
    channelSecret: functions.config().line.secret,
    channelAccessToken: functions.config().line.token,
};

const app = express();

app.post('/', line.middleware(config), (req, res, next) => {
    const json = JSON.stringify(req.body);
    const response: LineResponce = JSON.parse(json);
    const client = new line.Client(config);

    functions.logger.info(response.events[0].message.text);
    
    (async () => {
        const querySnapshot = await admin.firestore().collection('food').get();
        const document = querySnapshot.docs[0];
        const name = document.data().name;

        await client.replyMessage(response.events[0].replyToken, { type: "text", text: `${name} を食べろ` })
    })().catch(next);
    
    res.status(200).send()
});

export const lineBOT = functions.region('asia-northeast1').https.onRequest(app);
