import {methodModMapping} from './method_maps.js';
import { Field } from 'snarkyjs';

export async function ExecuteJob(input: any, methodName: string) {
    const {kp, F, Main} = methodModMapping[methodName]
    return generateProof(input, F, Main, kp);
}

function generateProof(input, F, Main, kp) {
    let x = input;
    let y = F(x);
    const proof = Main.prove([Field(y)], [Field(x)], kp);
    return {
        proof, output: y
    };
}
