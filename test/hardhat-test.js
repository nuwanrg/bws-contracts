const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BWSNFT Smart Contract Tests", function () {
  let contract;

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const name = "BWSERC721";
    const symbol = "BWSNFT";
    const baseURI = "https://api.example.com/token/";
    const admin = process.env.CONTRACT_ADMIN;
    const minter = process.env.CONTRACT_MINTER;

    const Contract = await ethers.getContractFactory("BWSErc721");
    contract = await Contract.deploy(name, symbol, baseURI, admin, minter);
    console.log("contract: ", contract.address);
  });

  it("NFT is minted successfully", async function () {
    [account1] = await ethers.getSigners();

    expect(await contract.balanceOf(account1.address)).to.equal(0);

    const tokenURI =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tx = await contract.connect(account1).mint(tokenURI);

    expect(await contract.balanceOf(account1.address)).to.equal(1);
  });

  it("tokenURI is set sucessfully", async function () {
    [account1, account2] = await ethers.getSigners();

    const tokenURI_1 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tokenURI_2 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/2";

    const tx1 = await contract.connect(account1).mint(tokenURI_1);
    const tx2 = await contract.connect(account2).mint(tokenURI_2);

    expect(await contract.tokenURI(0)).to.equal(tokenURI_1);
    expect(await contract.tokenURI(1)).to.equal(tokenURI_2);
  });
});
