import db from "../models";

const postController = {};

postController.post = (req, res) => {
  const { title, text, link, userId } = req.body;

  // validation =>  either text or link not both

  const post = new db.Post({
    title: title,
    text: text,
    link: link,
    _creator: userId,
  });
  post
    .save()
    .then((newPost) => {
      res.status(200).json({
        success: true,
        data: newPost,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

postController.getAll = (req, res) => {
  db.Post.find({})
    .populate({ path: "_creator", select: "username createdAt -_id" }) //select: "username createdAt -_id"
    .populate({
      path: "_comments",
      select: "text createdAt _creator",
      match: { isDeleted: false },
    }) // select: "text createdAt"
    .then((posts) => {
      return res.status(200).json({
        success: true,
        data: posts,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};
export default postController;
