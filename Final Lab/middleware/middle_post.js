module.exports = function (req, res, next) {
  const { title, category, description } = req.body;

  // Check if any of the required fields is missing
  if (!title || !category || !description) {
      req.session.flash = {
          type: "danger",
          message: "Title, category, and description are required fields.",
      };
      return res.redirect("/");
  }

  next();
};
