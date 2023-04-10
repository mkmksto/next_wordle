import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function restricted(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        res.send({
            content: 'Protected content, congrats, you are signed in.',
        })
    } else {
        res.send({
            error: 'You are not signed in. (this is a protected route)',
        })
    }
}
