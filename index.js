

const express = require('express')


const app = new express()

app.use(express.static('public'))





app.listen(4000, () => {
    console.log('Listening on port 4000')
})

