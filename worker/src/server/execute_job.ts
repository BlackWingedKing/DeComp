import {methodModMapping} from './method_maps.js';
import { Field } from 'snarkyjs';

export async function ExecuteJob(input: any, methodName: string) {
    const {kp, F, Main} = methodModMapping[methodName]
    return generateProof(input, F, Main, kp);
}

function generateProof(input, F, Main, kp) {
    let x = input;
    let y = F(x);
    const proof = Main.prove([y[0][0], y[0][1], y[1][0], y[1][1]], [x[0][0], x[0][1], x[1][0], x[1][1]], kp);
    return {
        proof, output: y
    };
}
