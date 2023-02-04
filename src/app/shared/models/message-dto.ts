import { ChatDTO } from "./chat-dto";

export interface MessageDTO {
    id: number;
    chatDTO: ChatDTO;
    sender: string;
    timestamp: Date;
    message: string;
}