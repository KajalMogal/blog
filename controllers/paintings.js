const { cloudinary } = require("../cloudinary");
const Painting = require('../models/painting');

module.exports.index = async (req, res) => {
    const paintings = await Painting.find({}); // Fetch 
    res.render('paintings/index', { paintings }); 
}

module.exports.new = (req, res) => {
    res.render('paintings/new');
}

module.exports.newForm = async(req, res, next) => {
     const painting =  new Painting(req.body.painting);
     painting.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
     painting.author = req.user._id;
     await painting.save();
     console.log(painting);
     req.flash('success', 'Added a new painting');
     res.redirect(`/paintings/${ painting._id }`);
 }

module.exports.show =  async (req, res) => {
    const painting = await Painting.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
        

    if (!painting) {
        req.flash('error', 'Painting not found');
        return res.redirect('/paintings');
    }
    res.render('paintings/show', { painting });
}

module.exports.editForm = async(req, res) => {  
    const { id } = req.params;
    const painting = await Painting.findById(id);
    if(!painting) {
        req.flash('error', 'Painting not found');
        return res.redirect('/paintings');
    }
    if(!post.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/paintings/${ id }`);
    }
    res.render('paintings/edit' , { painting });
}

module.exports.update = async(req, res) => {
    const { id } = req.params;
    const paintings = await Painting.findById(id);
    if(!paintings.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/paintings/${ id }`);
    }
    const painting = await Painting.findByIdAndUpdate(id, {...req.body.post});
    const imgs = req.files.map( f => ({ url: f.path, filename: f.filename }));
    painting.images.push(...imgs);
    await painting.save();
    if(req.body.deleteImages)  {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await painting.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages}}}})
    }
    req.flash('success', 'updated');
    res.redirect(`/paintings/${painting._id}`);
}

module.exports.deletePainting = async(req, res) => {
    const { id } = req.params;
    await Painting.findByIdAndDelete(id);
    req.flash('success', 'Deleted');
    res.redirect('/paintings');
}