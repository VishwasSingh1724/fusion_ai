import mongoose, { Schema, Document, Types, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string; 
  email: string;
  username?: string;
  profileImageUrl?: string;
  credits:number;
  images: Types.ObjectId[];
  musics: Types.ObjectId[];
  transformedImages: Types.ObjectId[];
  conversation: Types.ObjectId[];
  code:Types.ObjectId[]
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    credits:{
        type:Number,
        default:100
    },
    conversation: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'ConversationModel',
      default: [], 
    },
     code: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'CodeModel',
      default: [], 
    },
    images: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'ImageModel',
      default: [], 
    },
    musics: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'MusicModel',
      default: [], 
    },
    transformedImages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'TransformedImageModel',
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);
export const User = models?.User || model("User", UserSchema);

