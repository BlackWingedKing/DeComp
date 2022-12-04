import { verify, isReady } from 'snarkyjs';
await isReady;

export async function doVerify(proof, vk) {
    let ok;
    try {
        ok = await verify(proof, vk);
    } catch (error) {
        ok = !!error;
    }
    return ok
}
