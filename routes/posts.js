import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  const offset = (page - 1) * limit;

  const post = await Post.find().limit(limit).skip(offset).populate("authorId");

  res.status(200).send(post);
});

router.post("/", async (req, res) => {
  try {
    const { authorId, image, content } = req.body || {};

    const newPost = new Post({ authorId, image, content });

    await newPost.save();

    res.status(200).json({ result: "Post has been posted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/like/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const thisPost = await Post.findOne({ _id: postId });

  if (thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "This post is already liked by this user" });
    return;
  }

  thisPost.likeByUsers.push(userId);

  await thisPost.save();

  res.status(200).json({ result: "post has been liked" });
});

router.put("/unlike/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const thisPost = await Post.findOne({ _id: postId });

  if (!thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "There is no like" });
    return;
  }

  thisPost.likeByUsers.filter((id) => id !== userId);

  await thisPost.save();

  res.status(200).json({ result: "post has been unliked" });
});
export default router;
