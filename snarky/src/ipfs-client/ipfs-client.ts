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
