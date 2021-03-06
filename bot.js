const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config()

const logger = require('node-color-log');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const m of commandFiles){const n=require("./commands/"+m);client.commands.set(n.name,n)}

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`)
    client.user.setActivity({ name:'se faire dev', type:'PLAYING' })
    // client.user.setUsername('WikiBot')
    // client.user.setAvatar('./assets/ServerIcon.png')
});

client.on('message', message => {
    if (message.author.bot || message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!')
    }
})

client.login(process.env.TOKEN)
