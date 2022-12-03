import { Field, Circuit, circuitMain, public_, isReady, provable, arrayProp } from 'snarkyjs';

await isReady;

let Matrix3x3 = provable([
    [Field, Field, Field],
    [Field, Field, Field],
    [Field, Field, Field],
  ]);
  
function calculateKernelField (kernel: number[][]): Field[][] {
    let n = kernel.length;
    let result: Field[][] = [];
    for (let i=0; i<n; i++) {
        result[i] = [];
        for (let j=0; j<n; j++) {
            result[i].push(Field(kernel[i][j]))
        }
    }
    return result;
}

const gaussianKernel = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1],
];

const kernelField = calculateKernelField(gaussianKernel);

// function fieldDotProduct(x: Field[][], y: Field[][]): Field {
//     let n = x.length;
//     let result = Field(0);
//     for (let i=0; i<n; i++) {
//         for (let j=0; j<n; j++) {
//             result.add((x[i][j].mul(y[i][j])));
//         }
//     }
//     return result;
// }

function dotProduct (x: number[][], y: number[][]): number {
    let n = x.length;
    let result = 0;
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            result+=(x[i][j]*y[i][j]);
        }
    }
    return result;
}

export class Main extends Circuit {
    @circuitMain
    @arrayProp(Field, 3) values: Field[];
    static main(w: Field[][], @public_ x: Field[][]) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                w[i][j].assertEquals(Field(0));
            }
        }
        // result[1][1] = fieldDotProduct(x, kernelField);

        // assertion
        // for (let i=0; i<3; i++) {
        //     for (let j=0; j<3; j++) {
        //         result[i][j].assertEquals(w[i][j]);
        //     }
        // }
    }
}

export function F(x: number[][]) {
    /**
     * x is a 3x3 matrix; now apply convolution over the kernel
     */
    let result: number[][] = [];
    for (let i=0; i<3; i++) {
        result[i] = [];
        for (let j=0; j<3; j++) {
            result[i][j] = 0;
        }
    }
    result[1][1] = dotProduct(x, gaussianKernel);
    return result;
}

const kp = Main.generateKeypair();
// let x = [[1,2,3], [4,5,6], [7,8,9]];
// let y = F(x);

// const proof = Main.prove([y], [x], kp);
// console.log('proof', proof);

// let vk = kp.verificationKey();
// let ok = vk.verify([x], proof);

// console.log("ok?", ok);