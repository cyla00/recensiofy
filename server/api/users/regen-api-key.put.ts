import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const date = new Date()
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    try{

        await users.updateOne({id: token.id}, {$set: {apiKey: `api_key${uuidv4()}`, modifiedAt: date.toLocaleString("us-US")}})

        return{
            SuccMsg: 'Successfully updated your API key'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})