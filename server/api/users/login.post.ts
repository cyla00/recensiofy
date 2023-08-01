// login
// takes basic auth username password

import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt from 'jsonwebtoken'
import { sha256toBase64 } from '../../auth/hasher.ts'


export default defineEventHandler(async (event) => {

    const env = useRuntimeConfig()

    const basicAuthString = event.node.req.headers.authorization.split(' ')[1]
    
    const decoded = new Buffer.from(basicAuthString,'base64').toString()

    const email = decoded.split(':')[0]
    const password = sha256toBase64(decoded.split(':')[1])

    const users = model('users', UserSchema)
    const date = new Date()

    if(decoded === 'undefined:undefined'){
        throw createError({
            statusCode: 400,
            statusMessage: `Incorret credentials`,
        })
    }

    const userCheck =  await users.findOne({email: email, password: password})
        
        if(!userCheck){
            throw createError({
                statusCode: 401,
                statusMessage: `Incorret credentials`,
            })
        }

        if(!userCheck.accountVerified){
            throw createError({
                statusCode: 400,
                statusMessage: `Verify your email before connecting`,
            })
        }

        try{
            await users.updateOne({email: email, password: password}, {$set: {lastLogin: date.toLocaleString("us-US")}})
        }catch(e){
            throw createError({
                statusCode: 500,
                statusMessage: `An error occurred, please retry later`,
            })
        }

        const token = await jwt.sign({
            id: userCheck.id,
            email: userCheck.email,
            fullName: userCheck.fullName,
            role: userCheck.role,
        }, env.KEY, { expiresIn: 60 * 60 * 3 })

        return {
            SuccMsg: 'Successfully connected',
            token: token
        }
})