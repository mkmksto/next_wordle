import { FetchResponse } from '@/hooks/useRandomWordFetch'

export async function my_new_fetch(url: string, options?: RequestInit): Promise<FetchResponse> {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((res) => {
                if (!res.ok) reject('An Error occured, try again')
                return res.json()
            })
            .then((data) => resolve(data))
            .catch((_err) => reject('An Error Occured, Try again'))
    })
}

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
