import * as line from '@line/bot-sdk';

export interface LineResponce {
    events: [LineEvent]
}

export interface LineEvent {
    replyToken: string
    type: string
    timestamp: number
    message: LineMessage
} 

export interface LineMessage {
    id: string
    type: string
    text: line.TextMessage
}

export interface Food {
    name: string
    genre: string
}