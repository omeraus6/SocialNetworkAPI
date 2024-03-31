const { Schema, model } = require('mongoose');
//const { User } = require('./User');
const Reaction = require('./Reaction');
const formatDate = require('../utils/format.js');




const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date)

    },
    username: {   
      type: String,
      required: true,
    },
    reactions: [Reaction], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


thoughtSchema
 .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
 });

const Thought = model('thought', thoughtSchema);
console.log(formatDate("2022-05-24T01:31:56.774Z"))

module.exports = Thought;

//module.exports = thoughtSchema;
