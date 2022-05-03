import { Client, Intents } from 'discord.js'
import 'dotenv/config'
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || message.system) return

    if (/(quoi|koi|quoa|koa|cauha|kwa|qwa|coi)\W*$/gmi.test(message.content)) {
        const emojisCollection = await message.guild.emojis.fetch()
        const randomEmoji = emojisCollection.random()
        const emoji = randomEmoji ? ` <:${randomEmoji.name}:${randomEmoji.id}>` : ''
        message.channel.send(`feur${emoji}`)
    }
});

client.login(process.env.BOT_TOKEN);