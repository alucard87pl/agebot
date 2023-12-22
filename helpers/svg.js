const fs = require('fs');
const svg2png = require('svg2png');
const { DOMParser, XMLSerializer } = require('xmldom');
const Color = require('color');

function setColor(elements, color) {
  Array.from(elements).forEach(element => {
    if (!element.hasAttribute('fill')) {
      element.setAttribute('fill', color);
    }
  });
}

module.exports = async function diceRecolor(result, color) {
  const svgFilePath = `./assets/dice/d6_${result}.svg`;
  const svgContent = fs.readFileSync(svgFilePath, 'utf-8');
  const xmlDoc = new DOMParser().parseFromString(svgContent, 'text/xml');

  const mainColor = color;
  const shadeColor = Color(color).darken(0.4).desaturate(0.2).string();
  const dotColor = '#1f1f1f';

  setColor(xmlDoc.getElementsByClassName('primary'), mainColor);
  setColor(xmlDoc.getElementsByClassName('shadow'), shadeColor);
  setColor(xmlDoc.getElementsByClassName('dot'), dotColor);
  const changedSVG = new XMLSerializer().serializeToString(xmlDoc).trim();
  const pngBuffer = await svg2png(new Buffer.from(changedSVG),
    {
      width: 100,
      height: 100,
      encoding: 'dataURL',
      format: 'png',
      multiplier: 0.25
    }
  )
  return pngBuffer

};
