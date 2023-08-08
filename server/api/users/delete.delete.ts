import { model } from 'mongoose'
import { UserSchema, ReviewSchema, CampaignSchema } from '../../database/schemas.ts'
import { stripe } from '../../stripe/apiConnection.ts'
import jwt_decode from 'jwt-decode'
import { sha256toBase64 } from '../../auth/hasher.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    try{
        const userCheck = await users.findOne({id: token.id, password: sha256toBase64(body.password)})
        
        if(!userCheck){
            throw createError({
                statusCode: 401,
                statusMessage: 'Impossible to delete account'
            })
        }

        const subs = await stripe.customers.retrieve(userCheck.stripeUserId, {expand: ['subscriptions']})
        

        if(subs.subscriptions.data.length > 0){
            throw createError({
                statusCode: 401,
                statusMessage: 'Impossible to delete account, you have an active subscription'
            })
        }

        await stripe.customers.del(userCheck.stripeUserId)
        await users.deleteOne({id: token.id})
        await campaigns.deleteOne({userId: token.id})
        await reviews.deleteMany({reviewerId: token.id})
 
        return{
            SuccMsg: 'Account deleted successfully'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, retry later'
        })
    }
})