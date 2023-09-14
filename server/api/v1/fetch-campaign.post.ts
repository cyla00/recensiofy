import { model } from 'mongoose'
import { CampaignSchema, ReviewSchema, UserSchema } from '../../database/schemas.ts'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const api_key = event.node.req.headers.authorization.split(' ')[1]
    const query = await getQuery(event)
    
    try{
        const ApiKeyCheck = await users.findOne({apiKey: api_key})
        if(!ApiKeyCheck){
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized API access',
            })
        }
        

        // fethc all reviews if no query
        const campaign = await campaigns.findOne({userId: ApiKeyCheck.id}) 
        
        return{
            campaign
        }
    }catch(e){
        console.log(e);
        
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})