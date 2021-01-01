import { FlexMessage } from '@line/bot-sdk';

export class ReplyFlexMessage {

    static create(store: string, food: string, url: string): FlexMessage {
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
                            url: url,
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
                                                    text: `${store}`,
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
                                                    text: `${food}`,
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