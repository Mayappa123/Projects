const Blog = require("./models/blog");

module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("./login");
    }
    next();
};


module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let blog = await Blog.findById(id);
    if(!blog.owner.equals(res.locals.currUser._id)) {
        return res.redirect(`/blogs/${id}`);
    }
    next();
}