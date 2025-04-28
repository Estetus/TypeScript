class testMap {
    private buckets: {key: string, value: string | number}[] [];
    private size: number = 16;

    constructor() {
      this.buckets = Array(this.size).fill(null).map(()=> [])
    }

   private hash(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % this.size;
    }

    
    add(key: string, value: string | number): void {
        const index = this.hash(key);
        const bucket = this.buckets[index]
        const exist = bucket.find(item => item.key === key);
        if (exist) {
            exist.value = value;
        } else {
           bucket.push({key, value});
        }
    }

    get(key: string): string | number | undefined {
       const index = this.hash(key)
       return this.buckets[index].find(i => i.key === key)?.value
    }

    delete(key: string): boolean {
        const index = this.hash(key);
        const initialLength = this.buckets[index].length;
        this.buckets[index] = this.buckets[index].filter(item => item.key !== key);
        return this.buckets[index].length !== initialLength;
    }

    clear(): void {
        this.buckets = Array(this.size).fill(null).map(() => []);
    }

}

let weatherMap = new testMap()
weatherMap.add('London', 23);
weatherMap.add('Berlin', 25);
weatherMap.delete('London');

console.log(weatherMap.get('London'))