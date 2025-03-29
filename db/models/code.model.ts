import mongoose, { Schema, Document, Types, model, models } from "mongoose";

interface CodeDocument extends Document {
  prompt: string; // Title of the code snippet
  code: string; // The actual code snippet
  createdAt: Date; // Timestamp of when the code snippet was created
  userId: Types.ObjectId; // ObjectId of the user who created the code snippet
}

const CodeSchema = new Schema<CodeDocument>({
  prompt: { type: String, required: true }, // Title of the code snippet
  code: { type: String, required: true }, // The actual code
  createdAt: { type: Date, default: Date.now }, // Timestamp
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});


const CodeModel = mongoose?.models?.CodeModel || mongoose.model<CodeDocument>("CodeModel", CodeSchema);

export default CodeModel;