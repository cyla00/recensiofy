// register a user account
// takes body params "email" "password" "firstname" "lastname"

import { model } from 'mongoose'
import { stripe } from '../../stripe/apiConnection.ts'
import { UserSchema, CampaignSchema } from '../../database/schemas.ts'
import { mailer } from '../../emailClient.ts'
import { v4 as uuidv4 } from 'uuid'
import { sha256toBase64 } from '../../auth/hasher.ts'
import jwt_decode from 'jwt-decode'

export default defineEventHandler(async (event) => {
    
    const users = model('users', UserSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const env = useRuntimeConfig()
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    try{
        const userCheck = await users.findOne({id: token.id})
        const checkSub = await stripe.customers.retrieve(userCheck.stripeUserId, {expand: ['subscriptions']})

        if(checkSub.subscriptions.total_count > 0){
            throw createError({
                statusCode: 400,
                statusMessage: 'You already have an active subscription',
            })
        }

        const campaignCheck = await campaigns.findOne({userId: token.id})

        if(campaignCheck){
            await campaigns.updateOne({userId: token.id}, {$set: {visible: true}})
        }
        
        const host = await event.node.req.headers.host
        const retrievePrice = await stripe.products.retrieve(env.STRIPE_PRODUCT_SUB_ID)
        
        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: `http://${host}/payment-success`,
            customer: userCheck.stripeUserId,
            line_items: [
                {price: retrievePrice.default_price, quantity: 1},
            ],
            mode: 'subscription',
        })

        return{
            url: checkoutSession.url,
            SuccMsg: 'Redirecting to checkout ...',
        }
    }catch(e){
        throw createError({
            statusCode: 400,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})