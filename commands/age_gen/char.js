const { SlashCommandBuilder } = require('discord.js');
const { faker } = require('@faker-js/faker');
const printCharacter = require('../../helpers/printCharacter')
const getBlankChar = require('../../helpers/character/blankChar');
const Roll = require('../../helpers/dice');
const {getSocClass, getBackground} = require('../../helpers/background/background');

const char = getBlankChar();

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('char')
		.setDescription('Generate a new AGE Character'),
	async execute(interaction) {
		//generate bio
		char.name = faker.person.fullName();
		char.age = randInt(18, 60);
		char.weight = randInt(50, 120);
		char.height = randInt(150, 210);
		//background generation
		r = new Roll();
		char.social_class = getSocClass(r.d1())
		char.background = getBackground(char.social_class, r.d2())
		//generate ability values
		for (const ability in char.abilities) {
			if (char.abilities.hasOwnProperty(ability)) {
				r = new Roll();
				char.abilities[ability].value = r.sum();
				char.abilities[ability].mod = Roll.mod(r.sum());
			}
		}

		await interaction.reply(printCharacter(char));
	},
};