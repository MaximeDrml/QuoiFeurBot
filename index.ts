import { Client, Collection, GuildEmoji, GuildMember, Intents, MessageEmbed } from 'discord.js'
import 'dotenv/config'
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const resetDate = new Date()

const guildLeaderboards: Collection<string, Collection<string, number>> = new Collection()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('guildCreate', (guild) => {
    console.log(`Joined a new Guild : ${guild.name} !`)
})

client.on('messageCreate', async message => {
    if (message.author.bot || message.system) return

    if (message.content.trim() === `<@${client.user.id}>`) {
        const embed = new MessageEmbed()
            .setTitle(`Je t'ai dit "feur" ${getScore(message.member)} fois !`)
            .setDescription(`Date du dernier reset : ${resetDate.toLocaleString("fr-FR")}`)
        message.channel.send({embeds: [embed]})
        return
    }

    if (/(quoi|koi|quoa|koa|cauha|kwa|qwa|coi)\W*$/gmi.test(message.content)) {
        const emojisCollection = await message.guild.emojis.fetch()
        let randomEmoji: GuildEmoji;
        let c = 0;
        do {
            randomEmoji = emojisCollection.random()
            c++
        } while (randomEmoji.animated && c < 10);
        const emoji = randomEmoji ? ` <:${randomEmoji.name}:${randomEmoji.id}>` : ''
        const response = Math.random() >= 0.2 ? 'feur' : 'quoicoubeh quoicoubeh quoicoubeh'
        message.channel.send(`${response}${emoji}`)
        incrementScore(message.member)
    }
})

function incrementScore(member: GuildMember) {
    const leaderboard = getGuildLeaderBoard(member.guild.id)
    leaderboard.set(member.id,  leaderboard.has(member.id) ? leaderboard.get(member.id) + 1 : 1)
}

function getScore(member: GuildMember) {
    return getGuildLeaderBoard(member.guild.id).get(member.id) || 0
}

function getGuildLeaderBoard(guildId: string) {
    if (guildLeaderboards.has(guildId)) return guildLeaderboards.get(guildId)
    else return guildLeaderboards.set(guildId, new Collection()).get(guildId)
}

try {
    client.login(process.env.BOT_TOKEN)   
} catch (error) {
    console.error(error)
}