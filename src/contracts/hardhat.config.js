require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
const fs = require('fs')

const privateKey = fs.readFileSync(".secret").toString().trim()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/aSfcG6PPf_B5d08_OUsz1KOOEYTdnOI9",
      accounts: [privateKey]
    },
  }
};
