import { model } from 'mongoose'
import { CampaignSchema, ReviewSchema, UserSchema } from '../../database/schemas.ts'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

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
        if(Object.keys(query).length === 0){
            const user = await users.findOne({apiKey: api_key})
            const campaign = await campaigns.findOne({userId: user.id})
            const fullReviewList = await reviews.find({campaignId: campaign.id})

            return{
                fullReviewList,
            }
        }

        // checks if query param is valid
        const validParams: Array<string> = ['amount'] // possible query parameters ('amount', 'rating', 'keyword', 'location' ...)
        const paramsList: Array<string> = []
        for(const param in query){
            if(!validParams.includes(param)){
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Bad query parameter',
                })
            }
            paramsList.push(param)
        }

        for(const paramQuery in paramsList){
            
            const user = await users.findOne({apiKey: api_key})
            const campaign = await campaigns.findOne({userId: user.id})
            const reviewList = await reviews.find({campaignId: campaign.id}).sort({_id: -1})

            const filteredReviewList = reviewList.slice(0, query.amount)
            return{
                filteredReviewList,
            }
        }
        
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})