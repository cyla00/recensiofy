import { model } from 'mongoose'
import { UserSchema, CampaignSchema } from '../../database/schemas.ts'
import { stripe } from '../../stripe/apiConnection.ts'
import jwt_decode from 'jwt-decode'
import { sha256toBase64 } from '../../auth/hasher.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    if(body.password === ''){
        throw createError({
            statusCode: 401,
            statusMessage: 'Insert your password to continue'
        })
    }

    try{

        const userCheck = await users.findOne({id: token.id, password: sha256toBase64(body.password)})

        if(!userCheck){
            throw createError({
                statusCode: 401,
                statusMessage: 'Incorrect credentials'
            })
        }

        const campaignCheck = await campaigns.findOne({userId: token.id})

        if(campaignCheck){
            await campaigns.updateOne({userId: token.id}, {$set: {visible: false}})
        }

        const subs = await stripe.customers.retrieve(userCheck.stripeUserId, {expand: ['subscriptions']})
        
        if(subs.subscriptions.data.length === 0){
            throw createError({
                statusCode: 401,
                statusMessage: 'Currently you have no active subscriptions'
            })
        }

        for (const element of subs.subscriptions.data){
            await stripe.subscriptions.cancel(element.id)
        }
 
        return{
            SuccMsg: 'Subscription terminated successfully'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, retry later'
        })
    }
})