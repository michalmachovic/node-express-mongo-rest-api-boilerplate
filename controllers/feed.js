const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
  .then(result => {
      res.status(200).json({
        posts: result.map(item => {
            return {
              title: item.title,
              content: item.content
            }
        })
      });
  })

  
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db

  const post = new Post(
    {
        title: title,
        content: content
    }
  );
  post.save();


  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content }
  });
};
