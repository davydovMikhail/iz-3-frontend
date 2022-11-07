const { ethers } = require("ethers");

const methodSwitchEthTestnet = {
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x5' }],
};

let provider;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if ((chainId !== 5)) {
            await ethereum.request(methodSwitchEthTestnet);
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    //   const accounts = await ethereum.request({ method: "eth_accounts" });
    //   console.log(accounts);
    } else {
      console.log("Please install MetaMask");
      return false;
    }
  }

 async function test() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
 } 

module.exports = {
    connect,
    test
};