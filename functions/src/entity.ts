export interface LineResponce {
    events: [LineEvent]
}

export interface LineEvent {
    replayToken: string
    type: string
    timestamp: number
    message: LineMessage
} 

export interface LineMessage {
    id: string
    type: string
    text: string
}