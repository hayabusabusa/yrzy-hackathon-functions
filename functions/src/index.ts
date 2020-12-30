import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as line from '@line/bot-sdk';
import * as express from 'express';

import { LineResponce } from './entity';
import { ReplyFlexMessage } from './flex-messages';

admin.initializeApp();

const config = {
    channelSecret: functions.config().line.secret,
    channelAccessToken: functions.config().line.token,
};

const client = new line.Client(config);
const app = express();

app.post('/', line.middleware(config), (req, res, next) => {
    const json = JSON.stringify(req.body);
    const response: LineResponce = JSON.parse(json);
    

    functions.logger.info(response.events[0].message.text);
    
    (async () => {
        const querySnapshot = await admin.firestore().collection('food').get();
        const min = 0;
        const max = querySnapshot.docs.length;
        const document = querySnapshot.docs[Math.floor(Math.random() * (max - min) + min)];
        const name = document.data().name;

        await client.replyMessage(response.events[0].replyToken, ReplyFlexMessage.create('ファミマ', name));
    })().catch(next);
    
    res.status(200).send()
});

export const lineBOT = functions.region('asia-northeast1').https.onRequest(app);
