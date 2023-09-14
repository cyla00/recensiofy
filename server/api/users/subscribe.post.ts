// register a user account
// takes body params "email" "password"

import { model } from 'mongoose'
import { stripe } from '../../stripe/apiConnection.ts'
import { UserSchema } from '../../database/schemas.ts'
import { mailer } from '../../emailClient.ts'
import { v4 as uuidv4 } from 'uuid'
import { sha256toBase64 } from '../../auth/hasher.ts'
import { emailValidator } from '../../emailValidator.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const date = new Date()
    const env = useRuntimeConfig()
    const users = model('users', UserSchema) 

    const IPcheckURL = `http://check.getipintel.net/check.php?ip=${body.ip}&format=json&flags=f&contact=seroktika@gmail.com`

    if(body.email === '' || !emailValidator(body.email)){
        throw createError({
            statusCode: 400,
            statusMessage: 'Provide a valid email',
        })
    }

    if(body.password === '' || body.repeatPass === ''){
        throw createError({
            statusCode: 400,
            statusMessage: `Provide all required credentials`,
        })
    }

    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if(!body.password.match(passw)){
        throw createError({
            statusCode: 400,
            statusMessage: 'Password is too weak',
        })
    }

    if(body.password !== body.repeatPass){
        throw createError({
            statusCode: 400,
            statusMessage: `Passwords don't match`,
        })
    }

    try{
        const host = env.DOMAIN_NAME
        const retrievePrice = await stripe.products.retrieve(env.STRIPE_PRODUCT_SUB_ID)

        const userCheck = await users.findOne({email: body.email, password: sha256toBase64(body.password)})

        if(userCheck){
            throw createError({
                statusCode: 400,
                statusMessage: `Account exists, connect`,
            })
        }

        const stripeUser = await stripe.customers.create({
            description: 'Recensiofy customer',
            email: body.email,
        })

        const newHash = uuidv4()

        await users.create({
            id: uuidv4(),
            apiKey: `api_key${uuidv4()}`,
            timezone: body.timezone,
            ip: body.ip,
            email: body.email,
            password: sha256toBase64(body.password),
            hash: newHash,
            stripeUserId: stripeUser.id,
            role: 'user',
            createdAt: date.toLocaleString("us-US"),
            modifiedAt: '',
            accountVerified: false,
        })
              
        await mailer.sendMail({
            from: env.EMAIL_CLIENT_USER,
            to: body.email,
            subject: 'Recensiofy account activation',
            html: `
                <div>
                    <p>Verify your account</p>
                    <a href="http://${host}/account-verification/${newHash}">Verify</a>
                </div>
            `
        })

        const checkout = await stripe.checkout.sessions.create({
            success_url: `http://${host}/payment-success`,
            customer: stripeUser.id,
            line_items: [
                {price: retrievePrice.default_price, quantity: 1},
            ],
            mode: 'subscription',
        })

        return{
            url: checkout.url,
            SuccMsg: 'Redirecting to checkout ...',
        }
    }
    catch(e){
        console.log(e);
        
        throw createError({
            statusCode: 400,
            statusMessage: e.statusMessage || `An error occurred please retry later`,
        })
    }
})