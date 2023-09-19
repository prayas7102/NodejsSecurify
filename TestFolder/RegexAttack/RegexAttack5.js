const tweet = "Hey @user1 and @user2, how are you?";
const regex = /(a|aa)+/;
const mentions = tweet.match(regex);
console.log(mentions); // Output: ["@user1", "@user2"]
