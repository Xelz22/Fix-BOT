const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const TOKEN = ''; 

client.on('ready', () => {
    console.log(`${client.user.tag} olarak giriş yaptım!`);
    
    
    client.user.setPresence({
        status: 'dnd',
        activities: [{ name: 'SUNUCU GÜVENDE TOOLUNUZU YEDİMM HAMM', type: 'WATCHING' }] 
    });
});

client.on('messageCreate', async (message) => {

    if (!message.author.bot && !message.webhookId) return; 

   
    const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.gg|discordapp\.com\/invite)\/[a-zA-Z0-9_-]+/gi;
    if (inviteRegex.test(message.content)) {
        try {
            await message.delete();
            console.log(`Davet linki tespit edildi ve silindi: ${message.content}`);
        } catch (err) {
            console.error('Davet linki silinirken hata oluştu:', err);
        }
        return;
    }

   
    if (message.author.tag === 'Shadow Raider#7461') {
        try {
            await message.delete();
            console.log(`Shadow Raider#7461 tarafından gönderilen mesaj silindi: ${message.content}`);
            
            const member = await message.guild.members.fetch(message.author.id).catch(() => null);
            if (member) {
                await member.ban({ reason: 'Otomatik sistem tarafından yasaklandı.' });
                console.log('Shadow Raider#7461 sunucudan banlandı.');
            }
        } catch (err) {
            console.error('Hata oluştu:', err);
        }
        return;
    }
    
    const member = await message.guild.members.fetch(message.author.id).catch(() => null);
  
    if (!member) {
        try {
            await message.delete(); 
            console.log(`Silinen mesaj: ${message.content} - Kanal: ${message.channel.name}`);
        } catch (err) {
            console.error('Hata oluştu:', err);
        }
    }
});

client.login(TOKEN);