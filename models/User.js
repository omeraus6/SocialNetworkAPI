const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [    //back to it
      // array '_id'  reference to thought model
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends:[
       // array '_id' references to user model (self-refer)
       {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });
  
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
