import {methodModMapping} from './method_maps.js';
import { Field, VerificationKey, verify } from 'snarkyjs';

export async function ExecuteJob(input: any, methodName: string) {
    const {F, Matrix, vk, Program} = methodModMapping[methodName]
    const val = await generateProof(input, F, Matrix, vk, Program);
    console.log("output: ", val.output, "generated proof")
    return val;
}

async function generateProof(input, F, Matrix, vk, Program) {
    let x = input;
    let y = F(x);
    const m1 = new Matrix(Field(x[0][0]), Field(x[0][1]), Field(x[1][0]), Field(x[1][1]));
    const m2 = new Matrix(Field(y[0][0]), Field(y[0][1]), Field(y[1][0]), Field(y[1][1]));
    const proof = await Program.verifyMatrix(m1, m2);
    return {
        proof: proof.toJSON(),
        output: y,
        vk
    }
}
