const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID
}= require('graphql');
const UserType = require('./UserType');
const BlogType= require('./BlogType');
const mongoose= require('mongoose');
const User = mongoose.model('User');
const Blog= mongoose.model('Blog');

const CommentType= new GraphQLObjectType({
    name: 'Comment',
    fields:()=>({
        id:{type:GraphQLID},
        text:{type:GraphQLString},
        cauthor: {type: UserType,
            resolve(parentValue, args){
                //get UserType with parentvalue Userid
                return User.findById(parentValue.user);
            }},
        blog:{type: BlogType,
            resolve(parentValue, args){
                //search blog with parent valueID
                return Blog.findById(parentValue.blog)
            }},
        likes: {type: GraphQLInt}
    })
})

module.exports = CommentType;