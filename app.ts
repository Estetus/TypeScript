

const obj: Record<string, number> = {

    a: 1,
    b: 2
}


function swapKeysAndValues<T extends Record<string, number>>(obj: T ): Record<number, string> {
return  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]))
}

const res = swapKeysAndValues(obj)

console.log(res)