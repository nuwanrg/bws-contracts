require("@nomicfoundation/hardhat-toolbox");

// // The next line is part of the sample project, you don't need it in your
// // project. It imports a Hardhat task definition, that can be used for
// // testing the frontend.
// require("./tasks/faucet");

// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan")
// require("dotenv").config();

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

//   const Artwork = await hre.ethers.getContractFactory("Artwork");
//   const artwork = await Artwork.deploy("Artwork Contract", "ART");

//   await artwork.deployed();

//   // await hre.run("verify:verify", {
//   //   address: artwork.address,
//   //   constructorArguments: [
//   //     "Artwork Contract",
//   //     "ART"
//   //   ]
//   // })

// })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com", // Polygon Mumbai RPC endpoint
      accounts: [
        "f072a46c2b6a21ac8167e76f2198fc7a01814b4d93a03c960562d20dda0635b2",
      ], // Replace with the private key of your Ethereum account
    },
  },
};
