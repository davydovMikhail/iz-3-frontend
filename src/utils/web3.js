const { ethers } = require("ethers");
const { abi } = require('@/utils/abi');
const BigNumber = require('bignumber.js');

BigNumber.config({ EXPONENTIAL_AT: 60 });

const contractAddress = "0x63ee1bD9C03AbB48e97bb257e349BaDA849592e6";


const methodSwitchEthTestnet = {
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x5' }],
};

let provider;
let contract;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if ((chainId !== 5)) {
            await ethereum.request(methodSwitchEthTestnet);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      console.log("Please install MetaMask");
      return false;
    }
  }

 async function checkAddress() {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts.length;
 } 

 async function getInstance() {
    if (!contract) {
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
    }
 }

 async function stake(amount) {
    await getInstance();
    const total = new BigNumber(amount).shiftedBy(18).toString();
    try {
      const tx = await contract.stake(total);
      return tx;
    } catch (error) {
      console.log(error);
      return error;
    }
 }

async function claim() {
  await getInstance();
  try {
    const tx = await contract.claim();
    return tx;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function unstake() {
  await getInstance();
  try {
    const tx = await contract.unstake();
    return tx;
  } catch (error) {
    console.log(error);
    return error;
  }
}



module.exports = {
    connect,
    checkAddress,
    stake,
    claim,
    unstake
};