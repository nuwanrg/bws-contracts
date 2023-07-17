require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com", // Polygon Mumbai RPC endpoint
      accounts: [process.env.CONTRACT_OWNER_PRIVATE_KEY], // Replace with the private key of your Ethereum account
    },
  },
};
