const discord = require("discord.js")
const db = require("quick.db")

module.exports = async role => {    
try {
if(!role.guild.me.hasPermission('VIEW_AUDIT_LOG')) return
var log = await db.fetch(`settings${role.guild.id}.logch`)
if(!log) log = "None"
if(log == "None") return
const entry = await role.guild.fetchAuditLogs({type: 'MESSAGE_UPDATE'}).then(audit => audit.entries.first())
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setTimestamp()
.setDescription(`:tools: Role Created :tools:`)
.addField('➤ User',`➥ ${entry.executor}`,true)
.addField('➤ Role',`➥ <@&${role.id}>`);
role.guild.channels.get(log).send(embed)
} catch (e) {
        console.log(`[Error] [roleCreate] >> ${e}`);
    }
}