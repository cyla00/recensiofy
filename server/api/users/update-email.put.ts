import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { emailValidator } from '../../emailValidator.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const date = new Date()
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])
    console.log(body);
    
    if(body.email === ''){
        throw createError({
            statusCode: 400,
            statusMessage: `Provide a valid email`
        })
    }

    const emailCheck = emailValidator(body.email)
    if(!emailCheck){
        throw createError({
            statusCode: 400,
            statusMessage: 'Use a valid email',
        })
    }

    try{
        await users.updateOne({id: token.id}, {$set: {email: body.email, modifiedAt: date.toLocaleString("us-US")}})

        return{
            SuccMsg: 'Successfully updated your email'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})