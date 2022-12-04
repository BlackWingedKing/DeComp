import { Field, Experimental, isReady, CircuitValue, prop } from "snarkyjs";

await isReady;

export class Matrix extends CircuitValue {
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

export const Program = Experimental.ZkProgram({
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

export function F(x: number[][]): number[][] {
  return [
    [x[1][1], -x[0][1]],
    [-x[1][0], x[0][0]],
  ];
}
