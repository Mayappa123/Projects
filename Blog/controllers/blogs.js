const Blog = require("../models/blog");

module.exports.index = async(req, res) => {
    const allBlogs = await Blog.find({});
    res.render("./blogs/index.ejs");
}

module.exports.renderNewForm = (req, res) => {
  res.render("./blogs/new.ejs");
};

module.exports.showBlog = async (req, res) => {
  let { id } = req.params;
  const blog = await Blog.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!blog) {
    req.flash("error", "Listing you requested for does not exists..");
    res.redirect("/blogs");
  }
  console.log(blog);
  res.render("./blogs/show.ejs", {blog});
};

