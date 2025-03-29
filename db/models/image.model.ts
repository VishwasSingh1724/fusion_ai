import mongoose, { Schema, Document, Types, models, model } from "mongoose";

interface ImageDocument extends Document {
  name: string; // Name of the image
  url: string; // URL of the image
  uploadedAt: Date; // Timestamp of when the image was uploaded
  userId: Types.ObjectId; // ObjectId of the user who uploaded the image
}

const ImageSchema = new Schema<ImageDocument>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
});

const ImageModel = mongoose?.models?.ImageModel || mongoose.model<ImageDocument>("ImageModel", ImageSchema);

export default ImageModel;