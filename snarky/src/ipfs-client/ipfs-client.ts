import { create, IPFSHTTPClient } from 'ipfs-http-client'

function createIPFSClient(url: string): IPFSHTTPClient {
    // client init
    const client = create({url})
    return client;
}

export async function fetchFileFromIPFS(url: string, hash: string) {
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

export async function uploadFileToIPFS(url: string, data: string) {
    const client = createIPFSClient(url);
    const { cid } = await client.add(data);
    return cid;
}


// fetchFileFromIPFS(ipfsURL, fileHash).then(async (code) => {
//     console.log(code);
//     // evaluating the file
//     // const executor = eval(data);
//     // executor()
//     writeFileSync(`./dist/saved_modules/${fileHash}.js`, code);
//     // ts-ignore:
//     const mod = await import(`../saved_modules/${fileHash}.js`);
//     let {F, Main} = mod;
//     console.log("got F, main", F) 
// })
