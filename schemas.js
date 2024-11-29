const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;
module.exports.paintingSchema = Joi.object({
    painting: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

 module.exports.commentSchema = Joi.object({
     comment: Joi.object({
         body: Joi.string().required()
     }).required()
 })

