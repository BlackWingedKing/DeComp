import {
  SelfProof,
  Field,
  Experimental,
  verify,
  isReady,
  Circuit,
  circuitMain,
  public_,
  CircuitValue,
  prop,
} from "snarkyjs";
import { CircuitMain } from "snarkyjs/dist/node/snarky";

await isReady;

class Matrix extends CircuitValue {
  @prop x11: Field;
  @prop x12: Field;
  @prop x21: Field;
  @prop x22: Field;

  constructor(x11: Field, x12: Field, x21: Field, x22: Field) {
    super();
    this.x11 = x11;
    this.x12 = x12;
    this.x21 = x21;
    this.x22 = x22;
  }
}

const SimpleProgram = Experimental.ZkProgram({
  publicInput: Matrix,

  methods: {
    verifyMatrix: {
      privateInputs: [Matrix],

      method(publicInput: Matrix, w: Matrix) {
        let x11 = publicInput.x11;
        let x12 = publicInput.x12;
        let x21 = publicInput.x21;
        let x22 = publicInput.x22;

        let r11 = x22;
        let r12 = x12.mul(Field(-1));
        let r21 = x21.mul(Field(-1));
        let r22 = x11;
        r11.assertEquals(w.x11);
        r12.assertEquals(w.x12);
        r21.assertEquals(w.x21);
        r22.assertEquals(w.x22);
      },
    },
  },
});

// Compule the program.
console.log("Compiling");
const { verificationKey } = await SimpleProgram.compile();

// Create a proof.
console.log("Creating a proof");
const m1 = new Matrix(Field(1), Field(0), Field(0), Field(1));
const m2 = new Matrix(Field(1), Field(0), Field(0), Field(1));
const proof = await SimpleProgram.verifyMatrix(m1, m2);

// Verify the proof.
console.log("Verifying....");
let ok = await verify(proof.toJSON(), verificationKey);
console.log(ok);
