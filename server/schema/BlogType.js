const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID
}= require('graphql');
const UserType = require('./UserType');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');


const BlogType= new GraphQLObjectType({
    name:'Blog',
    fields:()=>({
        id:{type: GraphQLID},
        title:{type:GraphQLString},
        text:{type: GraphQLString},
        User:{type: require('./UserType'),
            resolve(parentValue, args){
                // get User with parentvalue Userid
                return User.findById(parentValue.user)
            }},
        likes:{type:GraphQLInt},
        comments:{type: new GraphQLList(require('./CommentType')),
            resolve(parentValue, args){
                //get all Comments with parentvalue id
                return Comment.find({blog: parentValue.id})
            }}
    })
})

module.exports= BlogType;