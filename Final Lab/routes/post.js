const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const middle_post = require("../middleware/middle_post");



router.get('/display', async (req, res) => {
    try {
        
        const posts = await Post.find();

        res.render('display', { title: 'Display', posts });
    } catch (error) {
        
        console.error(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});

router.post("/create",middle_post, async(req,res)=>{
    try{
        const newPost=new Post(req.body)
        const savedPost = await newPost.save()
        
        res.redirect("/");
        
    }
    catch(err){
        res.status(200).json(err)
    }
} )

// router.put('/:id', async (req, res) => {
//     try{
        
//         const updatePost = await Post.findByIdAndUpdate(req.params.id,{
//             $set:req.body
//         },{new:true})
//         res.status(200).json(updatePost);
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
//     }
// }
// );

// router.post('/update/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         const result = await Post.findByIdAndUpdate(id, {
//             title: req.body.title,
//             categories: req.body.categories,
//             desc: req.body.desc,
            
//         });

//         if (!result) {
//             return res.status(404).send('User not found');
//         }

//         req.session.message = {
//             type: 'success',
//             message: 'Updated Successfully'
//         };
//         res.redirect('/');
//     } catch (err) {
//         res.json({ message: err.message, type: 'danger' });
//     }
// });

// router.get("/edit/:id", (req, res) => {
//     // Extract the id parameter from the URL
//     const postId = req.params.id;

//     // Find the post with the specified id in the data array
//     const post = Post.find(post => post.id === parseInt(postId));

//     if (!post) {
//         // Handle the case where the post is not found
//         res.status(404).send('Post not found');
//         return;
//     }

//     // Render the "edit" view with the post data
//     res.render('edit', { title: "Edit Post", post });
// });

router.get("/edit/:id", async (req, res) => {
    try {
        // Extract the id parameter from the URL
        const postId = req.params.id;

        // Find the post with the specified id in the database
        const post = await Post.findById(postId);

        if (!post) {
            // Handle the case where the post is not found
            res.status(404).send('Post not found');
            return;
        }

        // Render the "edit" view with the post data
        res.render('edit', { title: "Edit Post", post });
    } catch (error) {
        // Handle errors, e.g., log them and render an error page
        console.error(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        // Extract the id parameter from the URL
        const postId = req.params.id;

        // Update the post in the database with the new data
        const result = await Post.findByIdAndUpdate(postId, {
            title: req.body.title,
            categories: req.body.categories,
            desc: req.body.desc,
        }, { new: true });

        if (!result) {
            // Handle the case where the post is not found
            return res.status(404).send('Post not found');
        }

        req.session.message = {
            type: 'success',
            message: 'Updated Successfully'
        };
        res.redirect('/');
    } catch (err) {
        // Handle errors, e.g., log them and render an error page
        console.error(err);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Post.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Post not found');
        }

        

        req.session.message = {
            type: 'info',
            message: 'Post Deleted Successfully'
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message });
    }
})







module.exports = router;