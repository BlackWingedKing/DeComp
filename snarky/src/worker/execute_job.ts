import {fetchFileFromIPFS} from '../ipfs-client/ipfs-client'
import { ipfsURL, fileHash } from '../constants/constants';
import {methodNameMapping} from './method_maps';

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

module.exports = {ExecuteJob}