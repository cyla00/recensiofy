import { model } from 'mongoose'
import { UserSchema, CampaignSchema, ReviewSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])
    const date = new Date()

    if(body.rate === 0){
        throw createError({
            statusCode: 400,
            statusMessage: 'Select a rating before submitting',
        })
    }

    if(body.title === ''){
        throw createError({
            statusCode: 400,
            statusMessage: 'Provide a title before submitting',
        })
    }
    
    try{
        const checkReviewer = await reviews.findOne({reviewerId: token.id, campaignId: body.campaignId})
        const campaginCheck = await campaigns.findOne({userId: token.id})
        if(checkReviewer){
            throw createError({
                statusCode: 403,
                statusMessage: 'You already have submitted a review for this campaign',
            })
        }
        
        if(campaginCheck.id === body.campaignId){
            throw createError({
                statusCode: 403,
                statusMessage: `You can't review your own campaign`,
            })
        }

        let ratingImg:string = ''
        const host = await event.node.req.headers.host
        
        if(body.rate === 1) ratingImg = `http://${host}/rating/star1.png`
        if(body.rate === 2) ratingImg = `http://${host}/rating/star2.png`
        if(body.rate === 3) ratingImg = `http://${host}/rating/star3.png`
        if(body.rate === 4) ratingImg = `http://${host}/rating/star4.png`
        if(body.rate === 5) ratingImg = `http://${host}/rating/star5.png`
        
        await reviews.create({
            id: uuidv4(),
            campaignId: body.campaignId, 
            reviewerIP: token.id,
            title: body.title,
            description: body.description,
            videoPath: '',
            thumbnailPath: '',
            audioPath: '',
            rating: body.rate,
            ratingImg: ratingImg,
            createdAt: date.toLocaleString("us-US"),
        })

        const rates: Array<number> = []
        const fetchReviews = await reviews.find({campaignId: body.campaignId})

        await fetchReviews.forEach((review) => {
            rates.push(Number(review.rating))
        })

        const sum = rates.reduce((partialSum, a) => partialSum + a, 0)
        const average =  Math.round((sum / fetchReviews.length) * 10) / 10

        await campaigns.updateOne({id: body.campaignId}, {$set: {averageRating: average, modifiedAt: date.toLocaleString("us-US")}})

        return{
            SuccMsg: 'Review successfully submitted'
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})