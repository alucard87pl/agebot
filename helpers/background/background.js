SC = [
    'Outsider',
    'Lower Class',
    'Lower Class',
    'Middle Class',
    'Middle Class',
    'Upper Class',
]

BG = {
    'Outsider': ['Bohemian', 'Exile', 'Outcast'],
    'Lower Class': ['Military', 'Laborer', 'Urban'],
    'Middle Class': ['Academic', 'Suburban', 'Trade'],
    'Upper Class': ['Aristocratic', 'Corporate', 'Cosmopolitan']
};

function getSocClass(rollResult) {
    return SC[rollResult - 1];

}

function getBackground(socClass, rollResult) {
    return BG[socClass][Math.floor((rollResult/2) -1)];
}

module.exports = { getSocClass, getBackground };