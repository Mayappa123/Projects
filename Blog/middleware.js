// middleware.js

const Blog = require("./models/blog");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog.owner.equals(res.locals.currUser._id)) {
    return res.redirect(`/blogs/${id}`);
  }
  next();
};

module.exports.ValidateBlog = (req, res, next) => {
  let { error } = blogSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};