import mongoose, { Schema, Document, Types, models, model } from "mongoose";

interface TransformedImageDocument extends Document {
  title: string;
  url: string; 
  uploadedAt: Date; 
  userId: Types.ObjectId;
}

const TransformedImageSchema = new Schema<TransformedImageDocument>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
});

const TransformedImageModel = mongoose?.models?.TransformedImageModel || mongoose.model<TransformedImageDocument>("TransformedImageModel", TransformedImageSchema);

export default TransformedImageModel;