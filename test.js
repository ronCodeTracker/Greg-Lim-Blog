

const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://127.0.0.1:27017/my_database2')

//BlogPost.create({
//    title: 'Fairy Tale',
//    body: 'A book by Steven King.'

//}).then(result => {
//    console.log(result)
//})


//BlogPost.find({
//    title:/Tale/
//}).then(result => {
//    console.log(result)
//})

//https://www.mongodb.com/docs/manual/tutorial/query-documents/

var id = "654d63b7afa0588ab1ba3778"

//BlogPost.findById(id).then(result => {
//    console.log(result)
//})
//    .catch(err => {
//        console.log("There is an error: " + err)
//    })



//BlogPost.findByIdAndUpdate(id, {
//    title: "Lord of the Plains"
//}).then(result => {
//    console.log(result)
//})
//    .catch(err => {
//        console.log("There is an error: " + err)
//    })



var id_2 = "654d836b171283e6a5c99b93"


BlogPost.findByIdAndDelete(id_2).then(result => {
    console.log(result)
})
    .catch(err => {
        console.log("There is an error: " + err)
    })




