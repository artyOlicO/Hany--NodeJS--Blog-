const express= require('express');
const router= express.Router();
const { getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog, getByAnything }= require('../controllers/blog');


router.post('/', async (req, res, next)=>{
    const { body, user: {id} }= req;

    try{
        const newBlog= await createBlog({...body, userId: id}); 
        res.json(newBlog);
    }
    catch (e){ next(e); }

});

router.get('/', async (req, res, next)=>{
    // console.log('heeee');
    const { user: { id } }= req;
    try{
        const currentBlogs= await getAllBlogs({userId: id}); 
        res.json(currentBlogs);
    }
    catch (e){ next(e); }
});

router.get('/:id', async (req, res, next)=>{
    // console.log('hoooo');
    const { params: {id} }= req;
    try{
        const currentBlog= await getOneBlog(id); 
        res.json(currentBlog);
    }
    catch (e){ next(e); }
});

router.patch('/:id', async (req, res, next)=>{
    const { params: {id}, body }= req;
    try{

        const editedBlog= await editBlog(id, body); 
        res.json(editedBlog);
    }
    catch (e){ next(e); }
});

router.delete('/:id', async (req, res, next)=>{
    // console.log('hoooo');
    const { params: {id} }= req;
    try{

        const deletedBlog= await deleteBlog(id); 
        res.json(deletedBlog);
    }
    catch (e){ next(e); }
});



module.exports= router;








// router.get('/find/:data', async (req, res, next)=>{
//     // console.log('heeee');
//     const {params: {data}}= req;
//     try{
//         const foundBlog= await getByAnything(data); 
//         res.json(foundBlog);
//     }
//     catch (e){ next(e); }
// });


// catch(e=> { 
//     consol.log('Error: ', e);

//     res.status(422).json(e.errors)
// });
