import { Field, Circuit, circuitMain, public_, isReady, provable, arrayProp } from 'snarkyjs';

await isReady;
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
