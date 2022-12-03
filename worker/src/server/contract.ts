import ethers from "ethers";

const privateKey =
  "78d98b502e48f14afe2e50f2cf8707fec6353c8a17163f414bac8eb43ab2b549";

const address = "0x1d8c93594ACF9aFd855a22aA75de0778C498bCAf";

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

export const Contract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );
  const signer = provider.getSigner();
  var wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(address, abi, wallet);
  return contract;
};
