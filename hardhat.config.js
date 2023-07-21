require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

require('dotenv').config();
// require('./tasks')
// require("@nomiclabs/hardhat-ganache");


// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "ganache",

  networks: {
    ganache: {
      gasLimit: 6000000000,
      defaultBalanceEther: 10,
      url: "HTTP://127.0.0.1:7545",
      accounts: [PRIVATE_KEY]
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_API_KEY,
      accounts: [PRIVATE_KEY]
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/" + ALCHEMY_API_KEY,
      accounts: [PRIVATE_KEY]
    }
  }
};

