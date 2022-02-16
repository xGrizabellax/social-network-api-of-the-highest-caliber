// const connection = require('../config/connection');
// const { User, Thought, reactionSchema } = require('../models');
// // Import functions for seed data
// const { getRandomUsername, getRandomEmail, getRandomThoughts, getRandomFriends, getRandomReactions, genRandomIndex } = require('./data');
// // console.log(reactionSchema)
// // Start the seeding runtime timer
// console.time('seeding');

// // Creates a connection to mongodb
// connection.once('open', async () => {
//   // Delete the entries in the collection
//   await User.deleteMany({});
//   await Thought.deleteMany({});

//   // Empty arrays for randomly generated posts and tags
//   const users = [];
//   const thoughts = [];
//   const friends = [];
//   const reactions = [];

//   // Function to make a post object and push it into the posts array
//   const makeUser = (thought) => {
//     users.push({
//       username: getRandomUsername(),
//       email: getRandomEmail(),
//       thoughts: thought._id,
//       friends: friends[getRandomFriends()],
//     });
//   };

  
//   // for (let i = 0; i < 10; i++) {
//   //   const thoughtText = getRandomThoughts();

//   //   thoughts.push({
//   //     thoughtText: thoughtText[0],
//   //     username: getRandomUsername(),
//   //     reactions: [reactions[genRandomIndex(reactions)]],
//   //   });
//   // }


//   for (let i = 0; i < 10; i++) {
//     thoughts.push({
//       // WE HAVE TO GET THE THOUGHT TEXT THRU
//       thoughtText: getRandomThoughts(),
//       username: getRandomUsername(),
//       reactions: [reactions[genRandomIndex(reactions)]],
//     });
//     console.log(thoughts, "These are the thoughts Sam")
//   }


//   for (let i = 0; i < 10; i++) {
//     friends.push(
//       getRandomFriends(),
//       console.log(getRandomFriends())
//     );
//   }
  
//   for (let i = 0; i < 10; i++) {
//     reactions.push({
//       reactionBody: getRandomReactions(1),
//       username: getRandomUsername()
//     });
//   }


//   // Wait for the tags to be inserted into the database
//   await Thought.collection.insertMany(thoughts);

//   // For each of the tags that exist, make a random post of length 50
//   thoughts.forEach((thought) => makeUser(thought));
  
//   // Wait for the posts array to be inserted into the database
//   await User.collection.insertMany(users);

//   // Log out a pretty table for tags and posts, excluding the excessively long text property
//   console.table(thoughts);
//   console.table(users);
//   console.timeEnd('seeding');
//   process.exit(0);
// });







const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomArrItem,
  getUsername,
  getEmail,
  getThought,
  getReaction } = require('./data')

// Establishing connection to database
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  const users = [];
  const thoughts = [];


  while (users.length < 25) {
    const username = getUsername();
    const email = getEmail();
    users.push({
      username,
      email
    })
  }

  await User.collection.insertMany(users)

  while (thoughts.length < 100) {
    const username = getRandomArrItem(users).username;
    const thoughtText = getThought();
    thoughts.push({
      thoughtText,
      username
    })
  }

  await Thought.collection.insertMany(thoughts)

  for (let i = 0; i < 100; i++) {
    const thought = thoughts[i];
    await User.collection.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought._id, 
        friends: getRandomArrItem(users)._id } },
    )
  }

  for(let i = 0 ; i < 300 ; i++) {
    const reactionBody = getReaction();
    const username = getRandomArrItem(users).username;
    const reaction = { reactionBody, username }
    const thoughtId = getRandomArrItem(thoughts)._id;
    await Thought.collection.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: reaction } },
    )
  }


  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
})
