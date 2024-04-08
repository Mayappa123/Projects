// ////controllers/blogs.js

// const Blog = require("../models/blog");

// module.exports.index = async (req, res) => {
//   const blogs = await Blog.find({});
//   res.render("blogs/blogs", { blogData: blogs });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("blogs/new.ejs");
// };

// module.exports.showBlog = async (req, res) => {
//   let { id } = req.params;
//   const blog = await Blog.findById(id).populate("owner");
//   if (!blog) {
//     req.flash("error", "blog does'nt exist...");
//     res.redirect("/blogs");
//   }
//   res.render("blogs/show.ejs", { blog });
// };

// module.exports.createBlog = async (req, res) => {
//   const newBlog = new Blog(req.body.blog);
//   newBlog.owner = req.user._id;
//   await newBlog.save();
//   console.log(newBlog);
//   req.flash("success", "New blog created...");
//   res.redirect("/blogs");
// };

// module.exports.renderEditForm = async (req, res) => {
//   const { id } = req.params;
//   const blog = await Blog.findById(id);
//   res.render("blogs/edit.ejs", { blog });
// };

// module.exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { ...req.body.blog },
//       {
//         new: true,
//         useFindAndModify: false,
//       }
//     );
//     if (!updatedBlog) {
//       req.flash("error", "Blog not found.");
//       return res.redirect("/blogs");
//     }
//     console.log(updatedBlog);
//     req.flash("success", "Blog updated successfully.");
//     res.redirect(`/blogs/${id}`);
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     req.flash("error", "Failed to update blog.");
//     res.redirect(`/blogs/${id}/edit`);
//   }
// };

// module.exports.destroyBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Blog.findByIdAndDelete(id);
//     req.flash("success", "blog deleted successfully...");
//     res.redirect("/blogs");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports.searchBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { search } = req.query;

//     const blogs = await Blog.find({
//       owner: mongoose.Types.ObjectId(id),
//       subject: { $regex: new RegExp(search, "i") },
//     });

//     res.render("blogs/blogs.ejs", { blogs });
//   } catch (error) {
//     console.error("Error searching blogs:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
