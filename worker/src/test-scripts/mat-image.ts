import { Poseidon, Field, Circuit, circuitMain, public_, isReady, provable, shutdown } from 'snarkyjs';

await isReady;

let Matrix3x3 = provable([
    [Field, Field, Field],
    [Field, Field, Field],
    [Field, Field, Field],
]);

function matrixMul(x: Field[][], y: Field[][]): Field[][] {
    let n = x.length;
    let m = y.length; // has to be === x[0].length
    let o = y[0].length;
  
    let result: Field[][] = [];
  
    // Compute the output matrix.
    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < o; j++) {
        result[i][j] = Field(0);
        for (let k = 0; k < m; k++) {
          result[i][j] = result[i][j].add(x[i][k].mul(y[k][j]));
        }
      }
    }
    return result;
}

// function multiplier(x, y) {
//     return x*y
// }

class Main extends Circuit {
  @circuitMain
  static main(w: Field, @public_ x: Field) {
    let result = x.square();
    result.assertEquals(w);
  }
}

function square_x(x: number) {
    return x*x*x;
}

const kp = Main.generateKeypair();
let x = 2;
let y = square_x(x);

const proof = Main.prove([Field(y)], [Field(x)], kp);
console.log('proof', proof);

let vk = kp.verificationKey();
let ok = vk.verify([Field(x)], proof);

console.log("ok?", ok);
shutdown()