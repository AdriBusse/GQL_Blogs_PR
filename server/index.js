const express = require('express');
const mongoose= require('mongoose');
const models = require('./models/index');
const colors = require('colors');
const cors = require('cors');
const app= express();
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const schema= require('./schema/schema');
const mongouri='mongodb+srv://admin:admin@blogsstoreage-ddx4e.mongodb.net/test?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
try{
    mongoose.connect(mongouri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    console.log("connect to db instance".green)
}catch(err){
    console.log(`_Error_: ${err.message}`.red)
    process.exit(1)
}
app.use(cors())
app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql: true
}))
app.listen(3001,()=>console.log("Server listen on Port 3001".green))