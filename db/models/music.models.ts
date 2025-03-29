import mongoose, { Schema, Document, Types, models, model } from "mongoose";

interface MusicDocument extends Document {
  title: string; // Title of the music
  url: string; // URL of the music file
  uploadedAt: Date; // Timestamp of when the music was uploaded
  userId: Types.ObjectId; // ObjectId of the user who uploaded the music
}

const MusicSchema = new Schema<MusicDocument>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});

const MusicModel = mongoose?.models?.MusicModel || mongoose.model<MusicDocument>("MusicModel", MusicSchema);

export default MusicModel;