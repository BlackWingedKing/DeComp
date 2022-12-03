export var methodNameMapping: Record<string, string> = {
    "F": "QmWDWBkF5nP5JArKfFJHx2ELNfy57PcjeRiwk34g8dCFEB",
};

export function updateMapping(url: string, hash: string) {
    methodNameMapping[url] = hash;
}