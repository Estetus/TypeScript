var obj = {
    a: 1,
    b: 2
};
function swapKeysAndValues(obj) {
    return Object.fromEntries(Object.entries(obj).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [value, key];
    }));
}
var res = swapKeysAndValues(obj);
console.log(res);
