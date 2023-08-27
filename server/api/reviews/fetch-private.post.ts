// creates campagin
// takes body: organisation, sector, location, website_url, description, fb_url, ig_url, tw_url, li_url + logo

import { model } from 'mongoose'
import { ReviewSchema, UserSchema, CampaignSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'



export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])
    
    try{
        const campaign = await campaigns.findOne({userId: token.id}).exec()
        const reviewsList = await reviews.find({campaignId: campaign.id}).exec()
        
        const list = reviewsList.slice(0, 5)
        return{
            reviewsList: list
        }

    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})