import {fetchFileFromIPFS} from '../ipfs-client/ipfs-client.js'
import { ipfsURL, fileHash } from '../constants/constants.js';
import {methodNameMapping} from './method_maps.js';

export async function ExecuteJob(input: any, methodName: string) {
    const fileHash = methodNameMapping[methodName];
    console.log(fileHash, methodName);
    const code = await fetchFileFromIPFS(ipfsURL, fileHash);
    console.log(code);
    // ts-ignore:
    const mod = await import(`../saved_modules/${fileHash}.js`);
    let {F, Main} = mod;
    console.log("got F, main", F)
    return; 
}
