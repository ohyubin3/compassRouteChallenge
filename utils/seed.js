const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomName, getRandomReactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Drop existing reaction
  await Reaction.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // attach random reaction to existing thought
  const reactions = getRandomReactions(2);

  // Loop 3 times -- add users to the users array
  for (let i = 0; i < 3; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data

    const username = getRandomName();

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: "This is a test thought",
    createdAt: 10 - 25 - 2022,
    username: users.map((user) => user._id),
    reactions,
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
