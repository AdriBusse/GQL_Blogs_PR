const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
}= require('graphql');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        allBlogs:{            
            type: new GraphQLList(require('./BlogType')),
            resolve(parentValue){
                //return //get all blogs with same parentvalue is
                return Blog.find({user: parentValue.id})
            }
        }
        
    })
})

module.exports = UserType;