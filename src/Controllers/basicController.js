const basicController = {};

basicController.get = (req, res) => {
  res.json({
    success: true,
    message: "Welcome",
  });
};

export default basicController;
