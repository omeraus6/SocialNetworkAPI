const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  //getThoughts(req, res) {
    //Thought.find()
      //.then((thoughts) => res.json(thoughts))
      //.catch((err) => res.status(500).json(err));
  //},

  //getSingleThought(req, res) {
    //Thought.findOne({ _id: req.params.thoughtId })
      //.select('-__v')
      //.populate('reactions')
      //.then((thought) =>
        //!thought
          //? res.status(404).json({ message: 'No thought with that ID' })
          //: res.json(thought)
     // )
      //.catch((err) => res.status(500).json(err));
  //},

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create new thoughts
  //createThought(req, res) {
    //Thought.create({
      //  thoughtText: req.body.thoughtText,
        //username: req.body.username
    //}).then((thought) => {
      //  return User.findOneAndUpdate( 
        //    { username: req.body.username }, {
          //      $addToSet: { thoughts: thought._id }
            //}, { new: true}
        //);
    //}).then((user) =>
      //  !user
        //    ? res.status(404).json({
          //  message: 'Error creating thought - no user with that ID' })
            //: res.json(user)
    //).catch((err) => {
      //  console.log(err);
        //res.status(500).json(err);
  //})
//},

async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'thought created, but found no user with that ID',
      });
    }

    res.json('Created the thought');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

//updateThought(req, res) {
  //    Thought.findOneAndUpdate(
    //      { _id: req.params.thoughtId }, 
      //    {
        //    thoughtText: req.body.thoughtText,
          //  username: req.body.username
          //}, 
          //{ new: true }, 
          //(err, result) => {
           // if (result) {
             // res.status(200).json(result);
              //console.log(`Updated: ${result}`);
            //} else {
             // console.log(err);
             // res.status(500).json({ message: 'error', err });
           // }
         // }
     // )
//},

async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(video);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
  //deleteThought(req, res) {
    //Thought.findOneAndRemove({ _id: req.params.thoughtId })
      //.then((thought) =>
        //!thought
          //? res.status(404).json({ message: 'No thought with this id!' })
          //: User.findOneAndUpdate(
            //  { thoughts: req.params.thoughtId },
              //{ $pull: { thoughts: req.params.thoughtId } },
              //{ new: true }
            //)
     // )
      //.then((user) =>
        //!user
          //? res.status(404).json({
            //  message: 'Error deleting thought',
            //})
          //: res.json({ message: 'Thought successfully deleted!' })
     // )
      //.catch((err) => res.status(500).json(err));
  //},

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created but no user with this id!' });
      }

      res.json({ message: 'thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(`Reaction added`)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(`Reaction deleted`)
      )
      .catch((err) => res.status(500).json(err));
  },


};
