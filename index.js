const {Intents, Client} = require("discord.js");
const {token} = require("./config.json");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS);
const MyClient = new Client({ intents: myIntents });


MyClient.once("ready", ()=>{
    console.log("Bot ready !");

    const Guilds = MyClient.guilds.cache.map(guild => guild);
    Guilds.forEach(guild => {
        check_activities(guild);
    });

});

function check_activities(guild){
    setInterval(() => {
        guild.members.fetch().then(members => {
            const online_members = members.filter((member) => !member.user?.bot && member.presence?.status != 'offline').map((member) => member);
            online_members.forEach(member => {
                let member_activities = member.presence?.activities;
                var member_roles = member.roles.member._roles;
                if(member_activities == undefined || member_activities.length == 0) return;
                if(member_activities[0].name.toUpperCase() == "CUSTOM STATUS") return;
                let member_roles_lisible = [];
                var server_roles = guild.roles.cache;
                var role_to_add;

                let role_in_server = false;
                member_roles.forEach(memberRole => {
                    
                    server_roles.forEach(role => {
                        let role_name = role.name;
                        let role_id = role.id;
                        if(memberRole == role_id) member_roles_lisible.push({id: role_id, name: role_name});
                        if(role_in_server == false) {
                            if(role_name.toUpperCase() == member_activities[0].name.toUpperCase()){
                                role_in_server = true;
                                role_to_add = role;
                            }
                        }
                    });
                }
                );
                let userHasRole = false;
                if(role_in_server){
                    member_roles_lisible.forEach(role => {
                        if(userHasRole == false){
                            if(role.name.toUpperCase() == member_activities[0].name.toUpperCase()){
                                userHasRole = true;
                            }
                        }
                    });
                    if(!userHasRole) {
                        member.roles.add(role_to_add);
                    }
                } else {
                    guild.roles.create()
                        .then(role => {
                            role.edit({
                                name: member_activities[0].name,
                                color: "RANDOM",
                            })
                            .then(newRole => member.roles.add(newRole));
                        })
                        .catch(console.error);
                }
            });
        });
    }, 30000); // check every X ms
}

MyClient.login(token);