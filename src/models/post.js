import mongoose from "mongoose";

const { Schema } = mongoose;
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  score: { type: Number, default: 0 },
  topic: { type: String, required: true },
  link: {
    type: String,
  },
  text: { type: String },
  votes: [{ user: Schema.ObjectId, vote: Number, _id: false }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _creator: {
    type: Schema.ObjectId,
    ref: "User",
  },
  _comments: [{ type: Schema.ObjectId, ref: "Comment" }],
});

postSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find((item) => item.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

const autoPopulate = function (next) {
  this.populate({ path: "_creator", select: "username createdAt _id" }) //select: "username createdAt -_id"
    .populate({
      path: "_comments",
      select: "text createdAt _creator _id",
      match: { isDeleted: false },
    });
  next();
};

postSchema.pre("find", autoPopulate);

const Post = mongoose.model("Post", postSchema);

export default Post;
