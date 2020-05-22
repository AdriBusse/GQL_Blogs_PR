const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const User = mongoose.model('User')
const BlogType= require('./BlogType');
const UserType= require('./UserType');
const CommentType = require("./CommentType")

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:()=>({
        
        blogs:{
            type: new GraphQLList(BlogType),
                resolve(){
                    return Blog.find({});
                }
        },
        blog:{
            type: BlogType,
            args:{ id:{type: new GraphQLNonNull(GraphQLID)}},
                resolve(parentValue, args){
                    return Blog.findById(args.id);
                }
        },
        user:{
            type: UserType,
            args:{id:{type: new GraphQLNonNull(GraphQLID)}},
                resolve(parentValue, args){
                    return User.findById(args.id);
                }

        },
        users:{
            type:new GraphQLList(UserType),
                resolve(parentValue, args){
                    return User.find({});
                }
        }
        
    })
    
})

module.exports = RootQuery;