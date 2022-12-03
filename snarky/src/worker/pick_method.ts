import { methodModMapping, methodNameMapping } from "./method_maps.js";
import { Contract } from "./contract.js";
import { ipfsURL } from "../constants/constants.js";
import { fetchFileFromIPFS } from "../ipfs-client/ipfs-client.js";
import { writeFileSync } from "fs";

export async function pickMethod(name: string) {
  // query the smart contract to get the result
  // Contract.pickMethod()

  fetchFileFromIPFS(ipfsURL, name).then(async (code) => {
    writeFileSync(`./dist/saved_modules/${name}.js`, code);
    const mod = await import(`../saved_modules/${name}.js`);
    let { F, Main } = mod;
  });
}
