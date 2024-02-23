import { ethers } from "./ethers.min.js";

const checkBalanceButton = document.querySelector("#checkBalance");
const accountInput = document.querySelector("#account");
const displayBalance = document.querySelector("#balance");
const toAccountInput = document.querySelector("#toAccount");
const sendTrxButton = document.querySelector("#sendTrx");
const amountInput = document.querySelector("#amount");

//const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/114f4311bda64ce68544e7ab8efbc81e"
);

let account;
let signer;

function initApp() {
  console.log(ethers);
}

async function checkBalance() {
  account = accountInput.value;
  console.log(await provider.getTransactionCount(account));
  const balance = await provider.getBalance(account);
  displayBalance.innerHTML = ethers.utils.formatEther(balance);
}

async function sendTransaction() {
  signer = provider.getSigner(account);
  const trx = await signer.sendTransaction({
    to: toAccountInput.value,
    value: ethers.utils.parseEther(amountInput.value),
  });

  console.log(trx);
}

function displayHistory(transactions) {
  for (let trx of transactions) console.log(trx);
  console.log(trx.blockNumber);
}

document.addEventListener("DOMContentLoaded", initApp);
checkBalanceButton.addEventListener("click", checkBalance);
sendTrxButton.addEventListener("click", sendTransaction);
