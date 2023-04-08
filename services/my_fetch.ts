import { FetchResponse } from '@/hooks/useRandomWordFetch'

export async function my_new_fetch(url: string, options?: RequestInit): Promise<FetchResponse> {
    // let data = null

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((res) => {
                if (!res.ok) reject('An Error occured, try again')
                return res.json()
            })
            .then((data) => resolve(data))
            .catch((_err) => reject('An Error Occured, Try again'))
    })

    // try {
    //     const res = await fetch(url, options)
    //     data = await res.json()
    //     if (!res.ok) Promise.reject('Error, Fetch failed')
    //     // throw new Error('sample ERROR')
    //     //
    // } catch (err) {
    //     // throw new Error('Error, fetch failed')
    //     console.error('error, fetch failed')
    //     Promise.reject('Error, Fetch failed')
    // }

    // return data
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
