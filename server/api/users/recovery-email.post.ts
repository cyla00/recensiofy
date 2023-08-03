// checks if user hash is valid for verification
// takes body email

import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import { mailer } from '../../emailClient.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const userHashCheck =  await users.findOne({email: body.email})
    const env = useRuntimeConfig()
 
    console.log(body);
    
    if(body.email === ''){
        throw createError({
            statusCode: 400,
            statusMessage: `Provide an email`
        })
    }

    if(!userHashCheck){
        throw createError({
            statusCode: 400,
            statusMessage: `Incorrect credentials`
        })
    }

    try{
        const host = await event.node.req.headers.host
        await mailer.sendMail({
            from: env.EMAIL_CLIENT_USER,
                to: body.email,
                subject: 'Reset your RecensioFy password',
                html: `
                    <div>
                        <p>Follow the link to reset your password</p>
                        <a href="http://${host}/recovery/${userHashCheck.hash}">Reset</a>
                    </div>
                `
        })
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: `An error occurred, please retry later`,
        })
    }

    return {
        SuccMsg: 'Password reset Email sent'
    }
})