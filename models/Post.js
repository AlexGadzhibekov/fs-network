import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
    content: String,
    likeByUsers: { default: [], type: [Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    virtuals: {
      likes: {
        get() {
          return this.likeByUsers.length;
        },
      },
    },
    methods: {
      checkIsUserLiked(userId) {
        return this.likeByUsers.includes(userId);
      },
    },
  }
);

export default model("Post", postSchema);
