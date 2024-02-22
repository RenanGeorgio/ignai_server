import mongoose from "../../database";

const { Schema } = mongoose;

const chatSchema = new Schema({
    members: {
        type: Array,
        required: true,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    }
});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;