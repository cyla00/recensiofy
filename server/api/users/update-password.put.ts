import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { sha256toBase64 } from '../../auth/hasher.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const date = new Date()
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    if(body.currentPass === '' || body.newPass === ''){
        throw createError({
            statusCode: 400,
            statusMessage: `Provide all required credentials`
        })
    }

    try{

        const checkUser = users.findOne({id: token.id, password: sha256toBase64(body.currentPass)})

        if(!checkUser){
            throw createError({
                statusCode: 400,
                statusMessage: `An error occurred, please retry later`
            })
        }

        await users.updateOne({id: token.id}, {$set: {password: sha256toBase64(body.newPass), modifiedAt: date.toLocaleString("us-US")}})

        return{
            SuccMsg: 'Successfully updated your password'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})