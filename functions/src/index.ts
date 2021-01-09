import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as line from '@line/bot-sdk';
import * as crypto from 'crypto';

import { LineResponce } from './entity';
import { ReplyFlexMessage } from './flex-messages';

admin.initializeApp();

const config = {
    channelSecret: functions.config().line.secret,
    channelAccessToken: functions.config().line.token,
};

const client = new line.Client(config);

export const lineBOT = functions.region('asia-northeast1').runWith({memory: '128MB', timeoutSeconds: 30}).https.onRequest(async (request, response) => {
    const body = JSON.stringify(request.body);
    const headers = request.headers;

    // NOTE: LINE のレスポンスにパース
    const lineResponse: LineResponce = JSON.parse(body);
    const events = lineResponse.events[0];

    // NOTE: 署名の検証
    const signature = crypto.createHmac("SHA256", config.channelSecret).update(body).digest("base64");

    if (signature !== headers["x-line-signature"] || events === undefined) {
        functions.logger.error("Request denied");
        response.status(200).send;
        return;
    }

    // NOTE: Firestore からデータを読み込み
    const receivedText = events.message.text;
    const foodQuerySnapshot = receivedText === "和食" || receivedText === "中華" || receivedText === "洋食" 
        ? await admin.firestore().collection('food').where('genre', '==', receivedText).get() 
        : await admin.firestore().collection('food').get();

    const foodDocument = foodQuerySnapshot.docs[Math.floor(Math.random() * foodQuerySnapshot.docs.length)];
    const foodName = foodDocument.data().name;
    const imageURL = foodDocument.data().url;

    const storesQuerySnapshot = await admin.firestore().collection('stores').get();
    const storesDocument = storesQuerySnapshot.docs[Math.floor(Math.random() * storesQuerySnapshot.docs.length)];
    const storeName = storesDocument.data().name;

    // NOTE: LINE BOT に情報を送信
    try {
        await client.replyMessage(events.replyToken, ReplyFlexMessage.create(storeName, foodName, imageURL));
    } catch (error) {
        functions.logger.error(error);
    }
    
    response.status(200).send();
});
