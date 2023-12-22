function Roll() {
    // Roll three six-sided dice
    this.dice = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
  }
  
  Roll.prototype.d1 = function () {
    return this.dice[0];
  };
  
  Roll.prototype.d2 = function () {
    return this.dice[1];
  };
  
  Roll.prototype.ds = function () {
    return this.dice[2];
  };
  
  Roll.prototype.pool = function () {
    return this.dice.slice();
  };
  
  Roll.prototype.sum = function () {
    return this.dice.reduce((sum, value) => sum + value, 0);
  };
  
  Roll.prototype.hasDoubles = function () {
    return new Set(this.dice).size !== this.dice.length;
  };
module.exports = Roll;

const mod = function (val) {
    const mod = {
        3: -2,
        4: -1,
        5: -1,
        6: -1,
        7: 0,
        8: 0,
        9: 1,
        10: 1,
        11: 1,
        12: 2,
        13: 2,
        14: 2,
        15: 3,
        16: 3,
        17: 3,
        18: 4,
    };
    return mod[val];
};

module.exports.mod = mod;
