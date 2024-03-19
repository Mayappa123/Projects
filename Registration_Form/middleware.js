module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //req.flash("error", "you must be logged in to add new product")
    return res.redirect("/login");
  }
  next();
};
