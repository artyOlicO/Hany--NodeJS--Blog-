const mongoose= require('mongoose');
const {Schema}= mongoose;

const blogSchema= new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 8
    },
    tags: [{
        type: String,
        required: true,
        maxlength: 10
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // status: {
    //     type: String,
    //     enum: ['blog', 'inProgress', 'done']
    // }
});


const Blog= mongoose.model('Blog', blogSchema);

module.exports= Blog;