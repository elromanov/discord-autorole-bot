# Discord autorole bot

## How to make it work ?

* Install last version of [Node js](https://nodejs.org/en/)
* Install [Discord.js V13](https://discord.js.org/#/)
* Replace ```"DISCORD BOT TOKEN"``` by your discord bot's token in ```config.json```

* And finally run:

```
node index.js
```

## Objective

The objective was to create a discord bot that would have the capabilities of automatically create new roles for each game the users of your discord server are playing. After having created a role for a game, the role is added to players that are playing the game that the role was created for. 

## Description

The bot checks every 30 seconds for all connected users, if they are playing any game. If this is the case, and if there is no role for the game, the bot will create that role and add it to the corresponding user. If the role already exists, it will only be added to the corresponding user.

## Date & author(s)

### Date
14/01/2022

### Author(s)
<a href="https://github.com/OWNER/REPO/graphs/contributors">
  <img src="https://avatars.githubusercontent.com/u/52935215?v=4" style="display:inline-block;position:relative;width:200px;height:200px;overflow:hidden;border-radius:50%"/>
</a>

## Last update
14/01/2022

## Version
1.0
