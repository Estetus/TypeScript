"use strict";
class testMap {
    constructor() {
        this.size = 16;
        this.buckets = Array(this.size).fill(null).map(() => []);
    }
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % this.size;
    }
    add(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const exist = bucket.find(item => item.key === key);
        if (exist) {
            exist.value = value;
        }
        else {
            bucket.push({ key, value });
        }
    }
    get(key) {
        var _a;
        const index = this.hash(key);
        return (_a = this.buckets[index].find(i => i.key === key)) === null || _a === void 0 ? void 0 : _a.value;
    }
    delete(key) {
        const index = this.hash(key);
        const initialLength = this.buckets[index].length;
        this.buckets[index] = this.buckets[index].filter(item => item.key !== key);
        return this.buckets[index].length !== initialLength;
    }
    clear() {
        this.buckets = Array(this.size).fill(null).map(() => []);
    }
}
let weatherMap = new testMap();
weatherMap.add('London', 23);
weatherMap.add('Berlin', 25);
weatherMap.add('London', 28);
console.log(weatherMap.get('London'));
