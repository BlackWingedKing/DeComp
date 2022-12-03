import { create, IPFSHTTPClient } from 'ipfs-http-client'
// @ts-ignore:
import vm  from 'node:vm';

const ipfsURL = "/ip4/127.0.0.1/tcp/5002/http"
const fileHash = "QmSQehsx9hJWsRFD7Rc11kZt2yh4kHSkGm73N26cAURdzQ"

function createIPFSClient(url: string): IPFSHTTPClient {
    // client init
    const client = create({url})
    return client;
}

async function fetchFileFromIPFS(url: string, hash: string) {
    /**
     * fetches the ipfs file from the url and returns the resposne
     */
    // client init
    const client = createIPFSClient(url)

    let asyncItr = client.cat(hash)
    let fileData = ""
    for await (const itr of asyncItr) {
        let data = Buffer.from(itr).toString()
        fileData+=data
    }
    return fileData
}

async function uploadFileToIPFS(url: string, data: string) {
    const client = createIPFSClient(url);
    const { cid } = await client.add(data);
    return cid;
}

fetchFileFromIPFS(ipfsURL, fileHash).then((code) => {
    console.log(code);
    // evaluating the file
    // const executor = eval(data);
    // executor()
    const contextifiedObject = vm.createContext({
        main: null,
        executor: null,
    });
    console.log(vm.SourceTextModule);
    const bar = new vm.SourceTextModule()
      
})
