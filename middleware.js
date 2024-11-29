 const { paintingSchema, commentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Painting = require('./models/painting.js');
const Comment = require('./models/comment');
  module.exports.isLoggedIn = (req, res, next) => {  //middleware function
          if(!req.isAuthenticated()) {
              req.flash('error', ' signed in first !');
             return res.redirect('/login')
          }
          next();
      }


module.exports.validatePainting = (req, res, next) => {
    
    const { error } = paintingSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const painting = await Painting.findById(id);
    if(!painting.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that !');
        return res.redirect(`/paintings/${id}`);
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/paintings/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}