export var methodNameMapping: Record<string, string> = {
};

export var methodModMapping: Record<string, any> = {    
};

export async function fillMaps(name: string) {
    const hash = methodNameMapping[name]
    const mod = await import(`../saved_modules/${hash}.js`);
    let {F, Main} = mod;
    const kp = Main.generateKeypair();
    methodModMapping[name] = {
        kp,
        F,
        Main,
    }
    console.log("added entries to maps....");
    console.log(methodModMapping, methodNameMapping);
    return;
}

// // TODO: remove this fillMaps
// fillMaps("F")
