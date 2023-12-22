const { SlashCommandBuilder, Application } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Roll = require('../../helpers/dice.js');
const diceRecolor = require('../../helpers/svg.js');
const mergeImages = require('merge-base64');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls 3d6, returns results'),
	async execute(interaction) {
		r = new Roll()
		console.log(r.pool())
		pool = r.pool().toString()
		total = r.sum().toString()
		dbl = r.hasDoubles()
		stn = r.ds().toString()
		const [d1, d2, ds] = await Promise.all(
			[
				diceRecolor(r.d1(), '#e86845'),
				diceRecolor(r.d2(), '#e86845'),
				diceRecolor(r.ds(), '#45c5e8')
			]
		)

		const mergedImage = await mergeImages([d1, d2, ds], {options:{offset: 10, color: 0x000000FF}});
		//console.log(mergedImage)
		const dice = new AttachmentBuilder(Buffer.from(mergedImage.match(/^data:.+\/(.+);base64,(.*)$/)[2], "base64"), { name: "dice.png" })
		const rollEmbed = new EmbedBuilder()
			.setColor(dbl ? 0x00FF00 : 0xFF0000)
			.setTitle('Your 3d6 roll result')
			.setImage('attachment://dice.png')
			.setAuthor({ name: 'AGEbot', iconURL: interaction.client.user.avatarURL() })
			.addFields(
				{ name: 'Result', value: pool, inline: true },
				{ name: 'Total', value: total, inline: true },
				{ name: 'Doubles?', value: dbl ? "✨ YAY! ✨" : "😥 Nay...", inline: true },
				dbl ?
					{ name: 'Stunt Points', value: dbl ? stn : "0", inline: true }
					: { name: '\u200B', value: '\u200B', inline: true },
			)
			.setTimestamp();
		await interaction.reply(
			{ embeds: [rollEmbed], files: [dice] }
		);
	},
};