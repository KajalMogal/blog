const express = require('express');
const router = express.Router();
const paintings = require('../controllers/paintings');
const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validatePainting } = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });
//const ExpressError = require('../utils/ExpressError');
const Painting = require('../models/painting');


router.get('/', catchAsync (paintings.index));

router.get('/new', isLoggedIn,(paintings.new));

router.post('/', isLoggedIn, upload.array('image'), validatePainting, catchAsync(paintings.newForm))


router.get('/:id', catchAsync(paintings.show));

router.get('/:id/:edit', isLoggedIn, catchAsync(paintings.editForm));

router.put('/:id', isLoggedIn, upload.array('image'), validatePainting, catchAsync(paintings.update));

router.delete('/:id', isLoggedIn,(paintings.deletePainting));

module.exports = router;




