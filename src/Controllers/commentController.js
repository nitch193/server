import db from "../models";

const commentController = {};

commentController.post = (req, res) => {
  const { text } = req.body;

  const comment = new db.Comment({
    text: text,
    _creator: req.user._id,
    _post: req.query.postid,
  });

  comment
    .save()
    .then((newComment) => {
      db.Post.findByIdAndUpdate(req.query.postid, {
        $push: { _comments: newComment._id },
      })
        .then((existingPost) => {
          res.status(200).json({
            success: true,
            data: newComment,
            existingPost,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err, // .toString() for debugging
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

commentController.destroy = async (req, res) => {
  const user = req.user._id;
  const creator = req.query.creator;
  if (user === creator) {
    db.Comment.findByIdAndDelete(req.query.commentid)
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
        });
      });
  } else {
    return res.status(401).json({
      message: "Not auothorized",
    });
  }
};

export default commentController;
