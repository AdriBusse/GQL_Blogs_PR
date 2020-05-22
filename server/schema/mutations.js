const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID} = require('graphql');
const UserType = require('./UserType');
const BlogType = require('./BlogType');
const CommentType = require('./CommentType');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Blog = mongoose.model('Blog');
const Comment = mongoose.model('Comment');

const mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return( new User({name: args.name})).save()
            }
        },
            
        addBlog:{
            type: BlogType,
            args:{
                title:{type: new GraphQLNonNull(GraphQLString)},
                text:{type: new GraphQLNonNull(GraphQLString)},
                user: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args){
                return (new Blog({title:args.title,
                                  text: args.text,
                                  user:args.user})).save()
            }
        },
        addComment:{
            type:CommentType,
            args:{
                text:{type: new GraphQLNonNull(GraphQLString)},
                user:{type:new GraphQLNonNull(GraphQLID)},
                blog:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args){
                return (new Comment({text: args.text,
                                     user: args.user,
                                     blog: args.blog})).save()
            }
        },
        likeBlog:{
            type: BlogType,
            args:{ id:{type: GraphQLID}},
            resolve(parentValue, args){
                return Blog.like(args.id)
            }
        },
        likeComment:{
            type: CommentType,
            args:{id:{type: GraphQLID}},
            resolve(parentValue, args){
                return Comment.like(args.id)
            }
        },
        deleteBlog:{
            type: BlogType,
            args:{id:{type:GraphQLID}},
            resolve(parentValue, args){
                return Blog.findByIdAndRemove({_id: args.id })
            }
        },
        deleteUser:{
            type: UserType,
            args:{id:{type:GraphQLID}},
            resolve(parentValue, args){
                return User.deleteOne({_id: args.id })
            }            
        },
        deleteComment:{
            type: CommentType,
            args:{id:{type:GraphQLID}},
            resolve(parentValue, args){
                return Comment.deleteOne({_id: args.id })
            }
        }
    }
})

module.exports= mutation;