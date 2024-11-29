const Comment = require('../models/comment.js');
const Painting = require('../models/painting.js');

module.exports.NewComment = async (req, res) => {
    //console.log(res.body());
     const painting = await Painting.findById(req.params.id).populate('author')  
     .populate({ path: 'comments', populate: { path: 'author' } });  
     const comment = new Comment(req.body.comment);
     comment.author = req.user._id;
     painting.comments.push(comment);
     await comment.save();
     await painting.save();
     req.flash('success', 'New comment added!');
     res.redirect(`/paintings/${painting._id}`);
}

module.exports.deleteComment = async(req, res) => {
    const { id, commentId } = req.params;
    await Painting.findByIdAndUpdate(id, { $pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success','Deleted comment!')
    res.redirect(`/paintings/${id}`);
}