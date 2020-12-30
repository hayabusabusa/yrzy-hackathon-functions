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
                            url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip3.jpg",
                            size: "full",
                            aspectMode: "cover",
                            aspectRatio: "1:1",
                            gravity: "center"
                        },
                        {
                            type: "box",
                            layout: "vertical",
                            contents: [],
                            position: "absolute",
                            background: {
                                type: "linearGradient",
                                angle: "180deg",
                                endColor: "#FFFFFF",
                                startColor: "#FFFFFF"
                            },
                            width: "100%",
                            height: "30%"
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
                                                    type: "icon",
                                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                                },
                                                {
                                                    type: "text",
                                                    text: "セブンイレブン",
                                                    size: "xl",
                                                    color: "#000000",
                                                    offsetStart: "md"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            position: "absolute",
                            offsetTop: "5%",
                            offsetStart: "0px",
                            offsetEnd: "0px",
                            paddingAll: "5%"
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
                                                    text: "パン",
                                                    size: "xl",
                                                    color: "#ffffff",
                                                    align: "center"
                                                }
                                            ]
                                        }
                                    ],
                                    spacing: "xs"
                                }
                            ],
                            position: "absolute",
                            offsetTop: "60%",
                            offsetStart: "0%",
                            offsetEnd: "0%",
                            offsetBottom: "0%"
                        }
                    ],
                    paddingAll: "0px"
                }
            }
        };

        return flexMessage;
    };
}