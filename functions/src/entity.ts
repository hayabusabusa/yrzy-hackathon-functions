export interface LineResponce {
    events: [LineEvent]
}

export interface LineEvent {
    replyToken: string
    type: string
    timestamp: number
    message: LineMessage
    action: LineAction
} 

export interface LineMessage {
    id: string
    type: string
    text: string
}

export interface LineAction {
    label: string
}

export interface Food {
    name: string
    genre: string
}