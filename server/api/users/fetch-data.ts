
import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    try{
        const user = await users.findOne({id: token.id})

        return {
            email: user.email,
            timezone: user.timezone,
            apiKey: user.apiKey,
        }

    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})