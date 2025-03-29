import mongoose, { Schema, Document, Types, models, model } from "mongoose";

interface ConversationModel extends Document {
  userChat: string; 
  AiChat: string; 
  uploadedAt: Date; 
  userId: Types.ObjectId;
}

const ConversationSchema = new Schema<ConversationModel>({
  userChat: { type: String, required: true },
  AiChat: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
});
const ConversationModel = mongoose?.models?.ConversationModel || mongoose.model<ConversationModel>("ConversationModel", ConversationSchema);

export default ConversationModel;