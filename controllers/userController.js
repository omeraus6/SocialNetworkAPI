const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {

  //getSingleUser(req, res) {
    //User.findOne({ _id: req.params.userId })
      //.select('-__v')
      //.populate('friends')
      //.populate('thoughts')
      //.then((user) =>
      //  !user
        //  ? res.status(404).json({ message: 'No user with that ID' })
          //: res.json(user)
     // )
     // .catch((err) => res.status(500).json(err));
  //},

  async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
  },

  async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
  },
  //create a new user
  //createUser(req, res) {
    //User.create({
      //  username: req.body.username,
        //email: req.body.email
    //})
      //.then((dbUserData) => res.json(dbUserData))
      //.catch((err) => res.status(500).json(err));
  //},

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 // updateUser(req, res) {
      //User.findOneAndUpdate(
        //  { _id: req.params.userId }, 
          //{
            //username: req.body.username,
            //email: req.body.email
          //}, 
          //{ new: true }, 
          //(err, result) => {
            //if (result) {
              //res.status(200).json(result);
              //console.log(`Updated: ${result}`);
            //} else {
              //console.log(err);
              //res.status(500).json({ message: 'error', err });
            //}
          //}
      //)
  //},

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user){
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Thought.deleteMany( { username: user.username})
                  .then((thoughts) => 
                    !thoughts
                    ? res.status(404).json({ message: 'No thoughts for that user' })
                    : res.json(user)
                  )
                )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        // if we already have the friend ID in params, is this necessary??
        User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
              return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                {$addToSet: {
                    friends: user._id
                }},
                { new: true} 
              );
          }).then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        // same comment as above
        User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
              return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                // missing a nested object for the user to remove??
                {$pull: {
                    friends: user._id
                }},
                { new: true} 
              );
          }).then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    }
};
