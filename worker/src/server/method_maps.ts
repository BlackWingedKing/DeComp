export var methodNameMapping: Record<string, string> = {
};

export var methodModMapping: Record<string, any> = {    
};

export async function fillMaps(name: string) {
    const hash = methodNameMapping[name]
    const mod = await import(`../saved_modules/${hash}.js`);
    console.log(mod);
    let {F, Program, Matrix} = mod;
    console.log("compiling the program")
    const { verificationKey } = await Program.compile();

    methodModMapping[name] = {
        vk: verificationKey,
        Matrix,
        F,
        Program
    }
    console.log(methodModMapping, methodNameMapping);
    return;
}
