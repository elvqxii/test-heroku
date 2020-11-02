const Discord = require("discord.js");
const client = new Discord.Client();

const newUsers = [];

client.on("ready", () => {
  console.log("Kisses is online!");
});

client.on("message", (message) => {
  if (message.content.startsWith("k! ping")) {
    message.channel.send("🏓 Pong!");
  }
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    guild.channels.find(channel => channel.name === "୨・╰lounge").send("Welcome our new users!\n" + userlist);
    newUsers[guild.id].clear();
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
});

client.login("NzYxMjU4NjQwMTk5NjQ3Mjgy.X3X_Ww.v5k1moD0HXAhwyKGEpFX33UYZ5M");

