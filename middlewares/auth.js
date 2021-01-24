const jwt= require('jsonwebtoken');
const { promisify }= require('util');
const asyncVer= promisify(jwt.verify);

const User= require('../models/user');



const auth= async (req, res, next)=> {
    const { headers: { authorization } }= req;
    if(!authorization){ next((new Error('UN_AUTHENTICATED'))); }

    try{
    const { id }= await asyncVer(
        authorization,
        'SECRET_MUST_BE_COMPLEX'
        );

        const user= await User.findById(id).exec();
        // console.log(user); 
        req.user= user;
        next();
    }
    catch (e){console.log('ccc');  next((new Error('UN_AUTHENTICATED'))); }
}

module.exports= auth;















// const auth= async (req, res, next)=> {
//     const { headers: { authorization } }= req;
//     if(!authorization){ next(e); }
//     try{
//     const token= await asyncVer(
//         authorization,
//         'SECRET_MUST_BE_COMPLEX'
//         );
//         next();
//     }
//     catch (e){ next(e); }
// }