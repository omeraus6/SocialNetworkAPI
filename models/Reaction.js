const { Schema, model } = require('mongoose');
const {Thought} = require('./Thought');
const { User } = require('./User');

// Schema to create Post model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      //type: Date,
      type: String,
      required: true,
      //minLength: 15,
      maxLength: 280,
      //default: Date.now,
    },
    username: { 
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      //get: (date) => formatDate(date) //back to it
    },
    //responses: [Response], //back to it
  },
  {
    toJSON: {
      //virtuals: true,
      getters : true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
videoSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Video model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;

//module.exports = reactionSchema;
