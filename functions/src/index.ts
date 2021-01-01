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

    (async () => {
        const genre = response.events[0].message.text;
        let foodQuerySnapshot: FirebaseFirestore.DocumentData;
        if (genre === "和食" || genre === "中華" || genre === "洋食") {
            foodQuerySnapshot = await admin.firestore().collection('food').where('genre', '==', genre).get();
        } else {
            foodQuerySnapshot = await admin.firestore().collection('food').get();
        }

        const foodDocument = foodQuerySnapshot.docs[Math.floor(Math.random() * foodQuerySnapshot.docs.length)];
        const foodName = foodDocument.data().name;
        const imageURL = foodDocument.data().url;

        const storesQuerySnapshot = await admin.firestore().collection('stores').get();
        const storesDocument = storesQuerySnapshot.docs[Math.floor(Math.random() * storesQuerySnapshot.docs.length)];
        const storesName = storesDocument.data().name;

        await client.replyMessage(response.events[0].replyToken, ReplyFlexMessage.create(storesName, foodName, imageURL));
    })().catch(next);

    res.status(200).send()
});

export const lineBOT = functions.region('asia-northeast1').https.onRequest(app);
