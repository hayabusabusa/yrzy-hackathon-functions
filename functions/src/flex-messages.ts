import { FlexMessage } from '@line/bot-sdk';

export class ReplyFlexMessage {

    static create(store: string, food: string): FlexMessage {
        const flexMessage: FlexMessage = {
            type: "flex",
            altText: `${store} の ${food} になりました`,
            contents: {
                type: "bubble",
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "image",
                            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
                            size: "full",
                            aspectMode: "cover",
                            aspectRatio: "1:1",
                            gravity: "center",
                        },
                        {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                                {
                                    type: "box",
                                    layout: "vertical",
                                    contents: [
                                        {
                                            type: "box",
                                            layout: "baseline",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "コンビニ名",
                                                    size: "xl",
                                                    color: "#ffffff",
                                                    align: "center",
                                                    offsetStart: "md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                            position: "absolute",
                            offsetTop: "20%",
                            offsetStart: "0px",
                            offsetEnd: "0px",
                            paddingAll: "5%",
                        },
                        {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                                {
                                    type: "box",
                                    layout: "vertical",
                                    contents: [
                                        {
                                            type: "box",
                                            layout: "horizontal",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "商品名",
                                                    size: "xl",
                                                    color: "#ffffff",
                                                    align: "center",
                                                    wrap: true,
                                                },
                                            ],
                                        },
                                    ],
                                    spacing: "xs",
                                },
                            ],
                            position: "absolute",
                            offsetTop: "50%",
                            offsetStart: "0%",
                            offsetEnd: "0%",
                            offsetBottom: "0%",
                        },
                    ],
                    paddingAll: "0px",
                },
            },
        };

        return flexMessage;
    };
}