
import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)

    const userHashCheck =  await users.findOne({hash: body.hash})

    if(!userHashCheck){
        throw createError({
            statusCode: 403,
        })
    }
    return 'ok'
})