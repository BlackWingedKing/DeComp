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

  fetchFileFromIPFS(ipfsURL, hash).then(async (code) => {
    writeFileSync(`./dist/saved_modules/${hash}.js`, code);
    const mod = await import(`../saved_modules/${hash}.js`);
    let { F, Main } = mod;
    await fillMaps(name);
  });
}
