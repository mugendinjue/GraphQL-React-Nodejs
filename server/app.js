/**
 * Server logic
 */
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODBURL}`);

mongoose.connection.once('open', () => {
    console.log('Database connected');
})

const schema = require('./schema/schema')

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({schema,graphiql:true}))

app.listen( 4000, () => {
    console.log('Application started in port 4000');
})