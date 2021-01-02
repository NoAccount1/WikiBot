module.exports = {
    name: 'ping',
    description: 'Ask the bot ping',
    execute(message, args) {
        message.channel.send('Pong.')
    }
}