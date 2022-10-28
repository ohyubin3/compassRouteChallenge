const connection = require("../config/connection");
const { Thought, User } = require("../models");
const {
  seedUsername,
  seedThoughtText,
  seedEmail,
  seedReactions,
  seedFriend,
  seedCreatedDate,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  const thoughts = [];

  // attach random reaction to existing thought

  // Loop 2 times -- add users to the users array
  for (let i = 0; i < 2; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data

    const username = seedUsername();
    const email = seedEmail();
    const thoughtText = seedThoughtText();
    const friends = seedFriend();
    const reactions = seedReactions();
    const createdAt = seedCreatedDate();

    users.push({
      username,
      email,
      thoughts,
      friends,
    });

    thoughts.push({
      thoughtText,
      createdAt,
      username,
      reactions,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
