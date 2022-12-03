import { SelfProof, Field, Experimental, verify, isReady } from "snarkyjs";

await isReady;

const SimpleProgram = Experimental.ZkProgram({
  publicInput: Field,

  methods: {
    run: {
      privateInputs: [],

      method(publicInput: Field) {
        publicInput.assertEquals(Field(0));
      },
    },
  },
});

// Compule the program.
console.log("Compiling");
const { verificationKey } = await SimpleProgram.compile();

// Create a proof.
console.log("Creating a proof");
const proof = await SimpleProgram.run(Field(0));

// Verify the proof.
console.log("Verifying....");
let ok = await verify(proof.toJSON(), verificationKey);
console.log(ok);
