export var methodNameMapping: Record<string, string> = {
    "F": "QmWDWBkF5nP5JArKfFJHx2ELNfy57PcjeRiwk34g8dCFEB",
};

// TODO: fill this methodModMapping
export var methodModMapping: Record<string, any> = {    
};

export function updateMapping(methodName: string, hash: string) {
    methodNameMapping[methodName] = hash;
}

// TODO: remove this
// initialise for "F"
async function init(name: string) {
    const hash = methodNameMapping[name]
    const mod = await import(`../saved_modules/${hash}.js`);
    let {F, Main} = mod;
    const kp = Main.generateKeypair();
    methodModMapping["F"] = {
        kp,
        F,
        Main,
    }
    console.log("initialised....");
}

init("F")
