const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema= new Schema({
    title: {type: String},
    text:{type: String},
    user:{type: String},
    likes: { type: Number, default: 0 }
})


BlogSchema.methods.like=(id)=>{
    const Blog = mongoose.model('Blog')
    return Blog.findById(id)
        .then(blog=>{
            ++blog.likes;
            return blog.save();
        })
}
module.exports=mongoose.model('Blog',BlogSchema);