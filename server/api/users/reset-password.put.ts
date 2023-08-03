// checks if user hash is valid for verification
// takes body hash, email, new_password

import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import { sha256toBase64 } from '../../auth/hasher.ts'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const date = new Date()

    const userHashCheck =  await users.findOne({hash: body.hash, fullName: body.fullName, accountVerified: true})
    
    if(!userHashCheck){
        throw createError({
            statusCode: 400,
            statusMessage: `Incorrect credentials`,
        })
    }

    if(body.newPassword !== body.repeatPassword){
        throw createError({
            statusCode: 400,
            statusMessage: `Passwords don't match`,
        })
    }

    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if(!body.newPassword.match(passw)){
        throw createError({
            statusCode: 400,
            statusMessage: 'Password is too weak',
        })
    }
    
    try{
        await users.updateOne({hash: body.hash}, {$set: {password: sha256toBase64(body.newPassword), hash: uuidv4()}})
    }catch(e){
        throw createError({
            statusCode: 400,
            statusMessage: `An error occurred, please retry later`,
        })
    }
     
    return {
        SuccMsg: 'Password has been successfully changed'
    }
})