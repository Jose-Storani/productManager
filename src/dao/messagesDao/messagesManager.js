import { MessagesModel } from "../mongoDB/models/messages.model.js";

export class MessagesManager {
    async getMessages() {
        const messages = await MessagesModel.find();
        return messages
    }

    async createMessages(message) {
        const newMessage = await MessagesModel.create(message)
        return newMessage
    }
}

