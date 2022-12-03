import { useEffect, useState } from "react";
import { ethers } from "ethers";

const abi = [
  {
    inputs: [
      { internalType: "string", name: "methodName", type: "string" },
      { internalType: "string", name: "ipfsCodeLink", type: "string" },
    ],
    name: "addMethod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "ipfsCodeLink", type: "string" }],
    name: "pickMethod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "registry",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "workerNodes",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x1d8c93594ACF9aFd855a22aA75de0778C498bCAf";

export const useMetamask = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState();

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);

      const signer = provider.getSigner();
      const newContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(newContract);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const addMethod = async (name, ipfsHash) => {
    console.log("Adding ", name, " ", ipfsHash, "to contract");
    contract.addMethod(name, ipfsHash).then((txn) => {
      console.log(txn);
    });
  };

  return {
    haveMetamask,
    accountAddress,
    accountBalance,
    isConnected,
    connectWallet,
    addMethod,
  };
};
