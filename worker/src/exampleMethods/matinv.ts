import { Field, Circuit, circuitMain, public_, isReady, provable, arrayProp } from 'snarkyjs';

export class Main extends Circuit {
    @circuitMain
    static main(w11: Field, w12: Field, w21: Field, w22: Field, @public_ x11: Field, @public_ x12: Field, @public_ x21: Field, @public_ x22: Field) {
        let r11 = x22;
        let r12 = x12.mul(Field(-1));
        let r21 = x21.mul(Field(-1));
        let r22 = x11;
        r11.assertEquals(w11);
        r12.assertEquals(w12);
        r21.assertEquals(w21);
        r22.assertEquals(w22);    
    }
}

export function F(x: number[][]) : number[][] {
    return [[x[1][1], -x[0][1]], [-x[1][0], x[0][0]]];
}

// const kp = Main.generateKeypair();
// console.log("generated")
// let x = [[2, 5], [1, 3]];
// let y = F(x);

// const proof = Main.prove([y[0][0], y[0][1], y[1][0], y[1][1]], [x[0][0], x[0][1], x[1][0], x[1][1]], kp);
// console.log('proof', proof);

// let vk = kp.verificationKey();
// let ok = vk.verify([Field(x[0][0]), Field(x[0][1]), Field(x[1][0]), Field(x[1][1])], proof);

// console.log("ok?", ok);
