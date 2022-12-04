import {
  fillMaps,
  methodModMapping,
  methodNameMapping,
} from "./method_maps.js";
import { Contract } from "./contract.js";
import { ipfsURL } from "../constants/constants.js";
import { fetchFileFromIPFS } from "../ipfs-client/ipfs-client.js";
import { writeFileSync } from "fs";

const contract = Contract();

export async function pickMethod(name: string, hash: string) {
  // query the smart contract to get the result
  const out = await contract.pickMethod(hash);
  console.log("output:", out);
  
  methodNameMapping[name] = hash;

  const code = await fetchFileFromIPFS(ipfsURL, hash);
  console.log("fetched file from IPFS");
  writeFileSync(`./dist/saved_modules/${hash}.js`, code);
  console.log("wrote file to disk");
  await fillMaps(name);
  console.log("filled the maps");
}
