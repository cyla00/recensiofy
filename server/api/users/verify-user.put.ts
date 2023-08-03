import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import { v4 as uuidv4 } from 'uuid'


export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const users = model('users', UserSchema)
    const date = new Date()

    const userHashCheck =  await users.findOne({hash: body.hash})
    
    if(userHashCheck.active){
        throw createError({
            statusCode: 400,
            message: `Account already activated, Log In`,
        })
    }

    try{
        await users.updateOne({hash: body.hash}, {$set: {hash: uuidv4(), modifiedAt: date.toLocaleString("us-US"), accountVerified: true}})
    }catch(e){
        console.log(e);
        
        throw createError({
            statusCode: 500,
            statusMessage: `An error occurred, please retry later`,
        })
    }

    return {
        SuccMsg: 'Account verified successfully'
    }
})