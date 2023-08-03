// checks if user hash is valid for verification
// takes body hash

import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const users = model('users', UserSchema)
    const date = new Date()

    const userHashCheck =  await users.findOne({hash: body.hash, accountVerified: false})

    if(!userHashCheck){
        throw createError({
            statusCode: 403,
        })
    }
    setResponseStatus(event, 200)
    return 'ok'
})