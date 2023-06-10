const mongoose = require("mongoose");


const book = new mongoose.Schema({
    name: { type: String, required: true },
    autherName: {
        type: String, required: true
    },
    publisherName: {
        type: String, required: true
    },
    catagory: {
        type: String,
        required: true,
        enum: {
            values:['Arts & Music', 'engineering', 'law', 'neet', 'engineering_asprient', 'Biographies',
                'Business', 'Comics', 'Computer & Tech', 'Cooking', 'Education & Reference', 'Entertainment',
                'Health & Fitness', 'History', 'Hobbies & Crafts', 'Home & Garden', 'Horror', 'Kids',
                'Literature & Fiction', 'Medical', 'Mystery', 'Parenting', 'Religion', 'Romance', 'Sci-Fi & Fantasy',
                'Science & Maths', 'Self-Help', 'Social Sciences', 'Sports', 'Travel', 'True Crime']
            },
            message: 'invalid catagory'
    },
    bookDescription: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('books', book);