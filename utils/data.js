// const usernames = [
//   'Aaran',
//   'Aaren',
//   'Aarez',
//   'Aarman',
//   'Aaron',
//   'Aaron-James',
//   'Aarron',
//   'Aaryan',
//   'Aaryn',
//   'Aayan',
//   'Aazaan',
//   'Abaan',
//   'Abbas',
//   'Abdallah',
//   'Abdalroof',
//   'Abdihakim',
//   'Abdirahman',
//   'Abdisalam',
//   'Abdul',
//   'Abdul-Aziz',
//   'Abdulbasir',
//   'Abdulkadir',
//   'Abdulkarem',
//   'Smith',
//   'Jones',
//   'Coollastname',
//   'Smush',
//   'Ze',
// ]



// const emails = [
//   'aaran@gmail.com',
//   'aaren@hotmail.com',
//   'aarez@blush.fluff',
//   'aarman@gmail.com',
//   'aaron@hotmail.com',
//   'aaron-James@blush.fluff',
//   'aarron@gmail.com',
//   'aaryan@hotmail.com',
//   'aaryn@blush.fluff',
//   'aayan@gmail.com',
//   'aazaan@hotmail.com',
//   'abaan@blush.fluff',
//   'abbas@gmail.com',
//   'abdallah@hotmail.com',
//   'abdalroof@blush.fluff',
//   'abdihakim@gmail.com',
//   'abdirahman@hotmail.com',
//   'abdisalam@blush.fluff',
//   'abdul@gmail.com',
//   'abdul-Aziz@hotmail.com',
//   'abdulbasir@blush.fluff',
//   'abdulkadir@gmail.com',
//   'abdulkarem@hotmail.com',
//   'smith@blush.fluff',
//   'jones@gmail.com',
//   'coollastname@hotmail.com',
//   'smush@blush.fluff',
//   'ze@gmail.com',
// ]

// const userThoughts = [
//   'Oim nota gud spehlmer',
//   'I have fun spelling random words',
//   'Anyone know how to spell "Oink oink piggy"?',
//   'I have some thoughts about this... any reactions?',
//   'This suxxx',
//   'Blah Blah Blah',
//   'Glah Glah Glah',
//   'Bob Loblaws Law Blog',
//   'Leave my island CHOPS',
//   'Okay I need help!',
// ]

// const userReactions = [
//   'Yeah this aint great...',
//   'Oh do ya?',
//   '"Oink Oink Piggy"',
//   'Here is my reaction',
//   'This is not a good thought',
//   'Stop and think about what you are saying',
//   'This is one of the best thoughts Ive heard in a while',
//   'I love the show that this is from',
//   'Yeah I feel the same a lot of the time',
//   'Dont worry Ill help you',
// ]


// // Get a random item given an array
// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random username
// const getRandomUsername = () =>
//   `${getRandomArrItem(usernames)}`;

// const getRandomEmail = () =>
//   `${getRandomArrItem(emails)}`;

  
//   const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  

// const getRandomFriends = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push(
//       getRandomUsername()
//     )
//   }
//   return results;
// }

// // const getRandomReactions = (int) => {
// //   const results = [];
// //   for (let i = 0; i < int; i++) {
// //     results.push({
// //       getRandomArrItem(userReactions)
// //     });
// //   }
// //   return results;
// // };

// const getRandomReactions = (int) => {
//   const results = []
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: `${getRandomArrItem(userReactions)}`,
//     })
//   }
//   return results;
//   }
  

// // const getRandomThoughts = (int) => {
// //   const results = [];
// //   for (let i = 0; i < int; i++) {
// //     results.push({
// //       thoughtText: getRandomArrItem(userThoughts),
// //       username: getRandomArrItem(usernames),
// //       reactions: getRandomArrItem(userReactions),
// //     });
// //   }
// //   return results;
// // };

// // const getRandomThoughts = () => {
// // for (let i = 0; i < int; i++) {
// //   `${getRandomArrItem(userThoughts)}`
// // }
// // }
// const getRandomThoughts = () => 
//   `${getRandomArrItem(userThoughts)}`



// const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);



// // Export the functions for use in seed.js
// module.exports = { getRandomUsername, getRandomEmail, getRandomThoughts, getRandomReactions, genRandomIndex, getRandomFriends };



const casual = require('casual');

const usernames = [];
const emails = [];
const thoughts = [];
const reactions = [];

for (let i = 0; i < 150; i++) {
  if (i < 12) {
        emails.push(casual.email)

    usernames.push(casual.username)
  }
  if (i < 75) thoughts.push(casual.sentences(n = 2))
  reactions.push(casual.short_description)
}

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Retrieves a  item from a given array
const getArrItem = (arr) => arr.pop();

// Values needed to build a user
const getUsername = () => `${getArrItem(usernames)}`
const getEmail = () => `${getArrItem(emails)}`

const getThought = () => `${getArrItem(thoughts)}`
const getReaction = () => `${getArrItem(reactions)}`

module.exports = { getRandomArrItem, getUsername, getEmail, getThought, getReaction };