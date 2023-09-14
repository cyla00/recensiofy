
import { model } from 'mongoose'
import { UserSchema, CampaignSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    try{
        const user = await users.findOne({id: token.id})
        const campaign = await campaigns.findOne({userId: token.id})
        const host = await event.node.req.headers.host

        return {
            email: user.email,
            timezone: user.timezone,
            apiKey: user.apiKey,
            evaluateUrl: `https://${host}/evaluate/${campaign.id}`
        }

    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})