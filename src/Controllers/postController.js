import db from "../models";

const postController = {};

postController.post = (req, res) => {
  const { title, text, topic, link, userId } = req.body;

  // validation =>  either text or link not both

  const post = new db.Post({
    title: title,
    text: text,
    link: link,
    topic: topic,
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

postController.getByTopic = (req, res) => {
  const topic = req.query.topic;
  db.Post.find({ topic: topic })
    .then((postsByTopic) => {
      return res.status(200).json({
        success: true,
        data: postsByTopic,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};
postController.getByUser = (req, res) => {
  const creator = req.query.creator;
  db.Post.find({ _creator: creator })
    .then((postsByUser) => {
      return res.status(200).json({
        success: true,
        data: postsByUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

postController.upvote = (req, res) => {
  const postid = req.query.postid;
  db.Post.findById(postid)
    .then((post) => {
      post.vote(req.query.userid, 1).then((upvoted) => {
        return res.status(200).json({
          status: true,
          data: upvoted,
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};
postController.downvote = (req, res) => {
  const postid = req.query.postid;
  db.Post.findById(postid)
    .then((post) => {
      post.vote(req.query.userid, -1).then((downvoted) => {
        return res.status(200).json({
          status: true,
          data: downvoted,
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

postController.unvote = (req, res) => {
  const postid = req.query.postid;
  db.Post.findById(postid)
    .then((post) => {
      post.vote(req.query.userid, 0).then((upvoted) => {
        return res.status(200).json({
          status: true,
          data: upvoted,
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

export default postController;
