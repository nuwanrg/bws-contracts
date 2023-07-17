require("dotenv").config();
const hre = require("hardhat");

async function main() {
  // Compiling the contract
  await hre.run("compile");

  // Getting a contract factory
  const BWSFactory = await hre.ethers.getContractFactory("BWSErc721");

  // Parameters for the contract constructor
  const name = "BWSERC721";
  const symbol = "BWSNFT";
  const baseURI = "https://api.example.com/token/";
  const admin = process.env.CONTRACT_ADMIN;
  const minter = process.env.CONTRACT_MINTER;

  // Deploying the contract and waiting for the transaction to be mined
  const BWSERC721 = await BWSFactory.deploy(
    name,
    symbol,
    baseURI,
    admin,
    minter
  );
  await BWSERC721.deployed();

  console.log("BWSERC721 deployed to:", BWSERC721.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
