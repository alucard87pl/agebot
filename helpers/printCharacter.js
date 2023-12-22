const Roll = require("./dice");

function plus(v) {
    if (v >= 0) {
        return `+${v}`
    } else {
        return `${v}`
    }
}

function printCharacter(character) {

    const abilitiesOutput = Object.entries(character.abilities)
        .map(([abilityName, ability]) => {
            return `**${abilityName}**: (${ability.value}) **${plus(ability.mod)}**
Focuses: ${ability.focusList}`;
        })
        .join('\n');
    return `
**ModernAGE Character Generator \`v. 0.0.1\`**
**Name:** ${character.name} 
**Age:** ${character.age}
**Social Class:** ${character.social_class}
**Background:** ${character.background}

**ABILITIES**
${abilitiesOutput}
`;
}

module.exports = printCharacter;