const { Schema, model } = require('mongoose');
const {Thought} = require('./Thought');
const { User } = require('./User');
const formatDate = require('../utils/format.js');


// Schema to create Post model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: { 
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: (date) => formatDate(date) //back to it
    },
  },
  {
    toJSON: {
      //virtuals: true,
      getters : true,
    },
    id: false,
  }
);


module.exports = reactionSchema;
