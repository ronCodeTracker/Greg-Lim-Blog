



const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: String,
    body: String
});

BlogPostSchema.index({title: 'text'})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);



module.exports = BlogPost



