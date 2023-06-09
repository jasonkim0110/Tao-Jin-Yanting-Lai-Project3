const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    replyTo: { type: Schema.Types.ObjectId, ref: 'Post' },
    pinned: Boolean,
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
