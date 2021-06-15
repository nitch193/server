const basicController = {};

basicController.get = (req, res) => {
  res.json({
    message: "Welocpmce",
  });
};

export default basicController;
