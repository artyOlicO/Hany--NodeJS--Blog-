const Blog= require('../models/blog');

const createBlog= (blog)=> {
    return Blog.create(blog);
}//end create new blog

const getAllBlogs= (query)=> {
        return Blog.find(query).exec();
}//end get all blogs

const getOneBlog= (id)=> {
    return Blog.findById(id).exec();
}//end get specific blog

const editBlog= (id, body)=> {
    return Blog.findByIdAndUpdate(id, body, {new: true} ).exec();
}//end edit blog by id

const deleteBlog= (id)=> {
    return Blog.findByIdAndDelete(id).exec();
}//end delete blog

// const getByAnything= (data)=>{
//     return Blog.findOne({data}).exec();
// }

module.exports= {
    getAllBlogs,
    getOneBlog,
    createBlog,
    editBlog,
    deleteBlog
    // getByAnything
}