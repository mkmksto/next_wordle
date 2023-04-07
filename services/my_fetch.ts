export default async function my_fetch(url: string, options?: {}) {
    let data,
        error = null

    try {
        const res = await fetch(url, options)
        data = await res.json()
        if (!res.ok) {
            error = 'Error, fetch failed'
            throw new Error(error)
        }
        return [data, error]
    } catch (err) {
        console.error(err)
        error = 'error fetch failed'
        return [data, error]
    }
}
