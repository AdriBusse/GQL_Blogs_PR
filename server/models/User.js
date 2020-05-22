const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    /*allBlogs:[{
        type: Schema.Types.ObjectId,
        ref:'Blogs'
    }]*/
})

module.exports=mongoose.model('User', UserSchema);