const jwt= require('jsonwebtoken');
const { promisify }= require('util');
const asyncSign= promisify(jwt.sign);

const User= require('../models/user');



const createUser= (user)=> {
    return User.create(user);
}//end create new user

const userLogin= async ({ username, password })=> {
    const user= await User.findOne({username}).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED');
    }

    const isValidPass= user.validatePassword(password);
    if(!isValidPass){
        throw Error('UN_AUTHENTICATED');
    }

    const token= await asyncSign(
        { 
            username: user.username,
            id: user.id,
        },
        'SECRET_MUST_BE_COMPLEX',
        { expiresIn: '1d' }
    );

    return { ...user.toJSON(), token};
    // return user;

}//end login with a user


const getAllUsers= ()=> {
    return User.find({}).exec();
}//end get all users


const getUserById= (id)=> {
    return User.findById(id).exec();
}//end get specific user

const editUser= (id, body)=> {
    return User.findByIdAndUpdate(id, body, {new: true} ).exec();
}//end edit blog by id

const deleteUser= (id)=> {
    return User.findByIdAndDelete(id).exec();
}//end delete blog

const followSomeOne =async (userid, followedid) => {
// console.log('aaaaa');

    User.findByIdAndUpdate(
        userid,
        {$push: { followings: followedid }},
        {new: true}
    ).exec();

console.log('bbbbb');

    User.findByIdAndUpdate(
        followedid,
        { $push: { followers: userid } }, 
        { new: true }
    ).exec();

console.log( await getUserById(userid).id);

        return "Followed";
}

// const followSomeOne= (currentUser, userToBeFollowed)=>{

//  console.log('current', currentUser);
//  console.log('follow', userToBeFollowed);
// }//end follow a user


module.exports= {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    userLogin,
    followSomeOne
}