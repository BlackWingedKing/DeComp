import {Field, Circuit, circuitMain, public_} from 'snarkyjs';

export class Main extends Circuit {
    @circuitMain
    static main(w: Field, @public_ x: Field) {
        let result = x.square();
        result.assertEquals(w);
    }
}
  
export function F(x: number) {
    return x*x;
}

// // @ts-ignore:
// executor, main = F, Main;
