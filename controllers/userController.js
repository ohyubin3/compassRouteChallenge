const { ObjectId } = require("mongoose").Types;
const { User } = require("../models/");
const { Thought } = require("../models/");

// Get or find all users
function getUsers(req, res) {
  User.find()
    .populate("thoughts")
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
}
// Get a single user
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}
// create a new user
function createUser(req, res) {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
}
// Delete a user and remove them from the thought
function deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No such user exists" })
        : Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          )
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({
            message: "User deleted, but no thoughts found",
          })
        : res.json({ message: "User successfully deleted" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function createUser(req, res) {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
}
function updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}
// Delete a user and remove them from the thought
function deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No such user exists" })
        : Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          )
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({
            message: "User deleted, but no thoughts found",
          })
        : res.json({ message: "User successfully deleted" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

// POST FRIEND
async function addFriend(req, res) {
  let validFriend = await User.findById({ _id: ObjectId(req.params.friendId) });
  if (validFriend._id) {
    let user = await User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }

    let friend = await User.findOneAndUpdate(
      { _id: ObjectId(req.params.friendId) },
      { $addToSet: { friends: ObjectId(req.params.userId) } },
      { runValidators: true, new: true }
    );
    if (user && friend) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No friend with this id!" });
    }
  } else {
    res.status(404).json({ message: "No friend with this id!" });
  }
}

// DELETE FRIEND
async function deleteFriend(req, res) {
  let validFriend = await User.findById({ _id: ObjectId(req.params.friendId) });
  if (validFriend._id) {
    let user = await User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { $pull: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }

    let friend = await User.findOneAndUpdate(
      { _id: ObjectId(req.params.friendId) },
      { $pull: { friends: ObjectId(req.params.userId) } },
      { runValidators: true, new: true }
    );
    if (user && friend) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No friend with this id!" });
    }
  } else {
    res.status(404).json({ message: "No friend with this id!" });
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
