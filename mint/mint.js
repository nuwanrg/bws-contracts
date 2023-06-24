const { ethers, Signer } = require("ethers");
const fs = require("fs");

// const privateKey = fs.readFileSync(".secret").toString().trim()
const privateKey =
  "f072a46c2b6a21ac8167e76f2198fc7a01814b4d93a03c960562d20dda0635b2";

const QUICKNODE_HTTP_ENDPOINT =
  "https://young-bold-dust.matic-testnet.discover.quiknode.pro/a0b7aac49cb2c5b052bbed5a16c448c11d18a47a/";
const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_ENDPOINT);

const contractAddress = "0x0756a62034fDbFbD30394DAB44d9309EC0c62D8C";
const contractAbi = fs.readFileSync("mint/abi.json").toString();
console.log("contractAbi: ", contractAbi);
const contractInstance = new ethers.Contract(
  contractAddress,
  contractAbi,
  provider
);

const wallet = new ethers.Wallet(privateKey, provider);

async function getGasPrice() {
  let feeData = (await provider.getGasPrice()).toNumber();
  return feeData;
}

async function getNonce(signer) {
  let nonce = await provider.getTransactionCount(wallet.address);
  return nonce;
}

async function mintNFT(address, URI) {
  try {
    const nonce = await getNonce(wallet);
    const gasFee = await getGasPrice();
    console.log("nonce ", nonce);
    console.log("gasFee ", gasFee);

    // let rawTxn = await contractInstance.populateTransaction.safeMint(
    //   address,
    //   URI,
    //   {
    //     gasPrice: gasFee,
    //     nonce: nonce,
    //   }
    // );
    let rawTxn = await contractInstance.populateTransaction.mint(URI, {
      gasPrice: gasFee,
      nonce: nonce,
    });
    console.log(
      "...Submitting transaction with gas price of:",
      ethers.utils.formatUnits(gasFee, "gwei"),
      " - & nonce:",
      nonce
    );
    let signedTxn = (await wallet).sendTransaction(rawTxn);
    let reciept = (await signedTxn).wait();
    if (reciept) {
      console.log(
        "Transaction is successful!!!" + "\n" + "Transaction Hash:",
        (await signedTxn).hash +
          "\n" +
          "Block Number: " +
          (await reciept).blockNumber +
          "\n" +
          "Navigate to https://polygonscan.com/tx/" +
          (await signedTxn).hash,
        "to see your transaction"
      );
    } else {
      console.log("Error submitting transaction");
    }
  } catch (e) {
    console.log("Error Caught in Catch Statement: ", e);
  }
}

mintNFT("0x16a1842b8ca64EaD5ff24F21aFd54EAe04974eF5", "METADATA_URL");
