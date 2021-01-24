const express= require('express');
const router= express.Router();
const authMiddleware= require('../middlewares/auth');

const { getAllUsers, getUserById, createUser, editUser, deleteUser, userLogin, followSomeOne }= require('../controllers/user');

//make a new user
router.post('/', async (req, res, next)=>{
    const { body }= req;
    try{
        const newUser= await createUser(body);
        res.json(newUser);
    }
    catch(e){ next(e); }
});

//login
router.post('/login', async (req, res, next)=>{
    const { body }= req;
    try{
        const newUser= await userLogin(body);
        res.json(newUser);
    }
    catch(e){next(e); }
});

//follow someone #"need Enhancements!"
router.post('/follow/:fid', authMiddleware, async (req, res, next)=> {

    const { params: {fid}, user: {id} } = req;
    console.log(id, ':', fid);

    if (id == fid){ res.send('Invalid Operation!'); }

    try {
        const user = await followSomeOne(id, fid);
        res.json(user);
    }
    catch (e) { next(e); }
});

//get all users
router.get('/', async (req, res, next)=>{
    try{
        const allUsers= await getAllUsers();
        res.json(allUsers);
    }
    catch(e){ next(e); }
});

//get a specific user
router.get('/:id', async (req, res, next)=>{
    const { params: {id} }= req;
    try{
        const findUser= await getUserById(id);
        res.json(findUser);
    }
    catch(e){ next(e); }
});

//Edit a specific user
router.patch('/:id', async (req, res, next)=>{
    const { params: {id}, body }= req;
    try{
        const editedUser= await editUser(id, body); 
        res.json(editedUser);
    }
    catch (e){ next(e); }
});

//delete a specific user
router.delete('/:id', async (req, res, next)=>{
    const { params: {id} }= req;
    try{
        const deletedUser= await deleteUser(id); 
        res.json(deletedUser);
    }
    catch (e){ next(e); }
});




module.exports= router;





    // const ID= req.params.id;





// const currentUserId= req.params.id;
//     if(currentUserId== req.user.id){
//         res.send("Invalid Operation!");
//         return;
//     }
//     const userToBeFollowed= await User.findUserById(currentUserId)
