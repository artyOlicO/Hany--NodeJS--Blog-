const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const {Schema}= mongoose;

const userSchema= new Schema(
{
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        unique: true,
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true,
    },
    firstName: {
        type: String,
        maxlength: 10,
    },
    lastName: {
        type: String,
        maxlength: 10,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'blog'
    }],
    followers: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    followings: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
},

{
    toJSON: {
        transform: (doc, ret, options)=> {
            delete ret.password;
            return ret;
        },
    },
},

);



userSchema.pre('save', function preSave(next) {
  this.password= bcrypt.hashSync(this.password, 8);
  next();
});


userSchema.pre('findOneAndUpdate', function preSave(next) {
    if(!this._update.password){ return; }

    this._update.password= bcrypt.hashSync(this._update.password, 8);
    
    next();
  });


userSchema.methods.validatePassword= function validatePassword(password){
    return bcrypt.compareSync(password, this.password);
}

const User= mongoose.model('User', userSchema);
 
module.exports= User;