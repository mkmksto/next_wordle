export function sleep(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms))
}

export function get_random_item<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())]
}
