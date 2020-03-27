module.exports = username => {
  let bgs = ["222C43", "FF484A", "6E3288", "001447"];
  let bg = bgs[Math.floor(Math.random() * bgs.length)];

  return `https://ui-avatars.com/api/?name=${username}&length=1&size=128&background=${bg}&color=FFF`;
};
