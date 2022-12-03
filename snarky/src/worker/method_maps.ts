export var methodNameMapping: Record<string, string> = {
    "F": "QmWDWBkF5nP5JArKfFJHx2ELNfy57PcjeRiwk34g8dCFEB",
};

export var methodModMapping: Record<string, any> = {    
};

export function updateMapping(methodName: string, hash: string) {
    methodNameMapping[methodName] = hash;
}

export async function fillMaps(name: string) {
    const hash = methodNameMapping[name]
    const mod = await import(`../saved_modules/${hash}.js`);
    let {F, Main} = mod;
    const kp = Main.generateKeypair();
    methodModMapping["F"] = {
        kp,
        F,
        Main,
    }
    console.log("added entries to maps....");
    return;
}

// // TODO: remove this fillMaps
// fillMaps("F")
