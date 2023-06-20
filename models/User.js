import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
