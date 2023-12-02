



const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provice title."]
    },
    body: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true 
    },
    datePosted: {/* can declare property type with an object like this becasue we need 'default'*/
        type: Date,
        default: new Date()

    },
    image: {
        type: String,
        required: [true, "Please provide image"]
    }

});

BlogPostSchema.index({title: 'text'})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);



module.exports = BlogPost



