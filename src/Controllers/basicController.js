const basicController = {};

basicController.get = (req, res) => {
  res.json({
    message: "Welocom",
  });
};

export default basicController;
