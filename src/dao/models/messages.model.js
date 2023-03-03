import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: String,
    message: String

})



export const MessagesModel = mongoose.model("Messages",messageSchema);
const doc = new MessagesModel()
console.log(doc._id instanceof mongoose.Types.ObjectId)