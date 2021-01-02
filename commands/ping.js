module.exports = {
    name: 'ping',
    description: 'Ask the bot ping',
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.')
    }
}