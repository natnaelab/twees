const request = require("request");
const fs = require("fs");
const path = require("path");

module.exports = username => {
  let bgs = ["222C43", "FF484A", "6E3288", "001447"];
  let bg = bgs[Math.floor(Math.random() * bgs.length)];

  request(
    `https://ui-avatars.com/api/?name=${username}&length=1&size=128&background=${bg}&color=FFF`
  ).pipe(
    fs.createWriteStream(
      path.join(__dirname, `../../public/avatar/${username}.png`)
    )
  );
};
