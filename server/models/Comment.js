const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text:{type: String},
    user:{ type: String},
    likes:{type:Number , default:0},
    blog:{type:String}
})

commentSchema.methods.like=function(id){
    const comment = mongoose.model('Comment')
    return comment.findById(id)
        .then(comment=>{
            ++comment.likes;
            return comment.save();
        })
}

module.exports=mongoose.model('Comment', commentSchema);