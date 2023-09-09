import { model } from 'mongoose'
import { CampaignSchema, ReviewSchema, UserSchema } from '../../database/schemas.ts'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const api_key = event.node.req.headers.authorization.split(' ')[1]
    // const IP = event.node.req.headers['x-forwarded-for'].split('f:')[1]
    const IP = '89.226.166.176'
    const body = await readBody(event)
    const date = new Date()
    
    
    const IPcheckURL = `http://check.getipintel.net/check.php?ip=${IP}&format=json&flags=f&contact=seroktika@gmail.com`

    try{
        const ApiKeyCheck = await users.findOne({apiKey: api_key})
        const campaign = await campaigns.findOne({userId: ApiKeyCheck.id})
        
        if(!ApiKeyCheck){
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized request',
            })
        }
        
        if(body.rate < 1 && body.rate > 5){
            throw createError({
                statusCode: 400,
                statusMessage: 'Select a rating before submitting',
            })
        }
    
        if(body.reviewerName === ''){
            throw createError({
                statusCode: 400,
                statusMessage: 'Provide a name or username before submitting',
            })
        }
    
        if(body.title === ''){
            throw createError({
                statusCode: 400,
                statusMessage: 'Provide a title before submitting',
            })
        }
    
        if(body.description === ''){
            throw createError({
                statusCode: 400,
                statusMessage: 'Provide a brief description before submitting',
            })
        }

        await axios.post(IPcheckURL).then((res) => {
            if(res.data.result !== '0'){
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Proxy or VPN usage has been detected',
                })
            }
        }).catch((e) => {
            throw createError({
                statusCode: 401,
                statusMessage: e.statusMessage || 'An error occurred, please retry later abub',
            })
        })

        const checkReviewer = await reviews.findOne({reviewerIP: IP, campaignId: campaign.id})
        if(checkReviewer){
            throw createError({
                statusCode: 403,
                statusMessage: 'You already have submitted a review for this campaign',
            })
        }

        let ratingImg:string = ''
        const host = event.DOMAIN_NAME
        
        if(body.rate === 1) ratingImg = `http://${host}/rating/star1.png`
        if(body.rate === 2) ratingImg = `http://${host}/rating/star2.png`
        if(body.rate === 3) ratingImg = `http://${host}/rating/star3.png`
        if(body.rate === 4) ratingImg = `http://${host}/rating/star4.png`
        if(body.rate === 5) ratingImg = `http://${host}/rating/star5.png`
        
        

        await reviews.create({
            id: uuidv4(),
            campaignId: campaign.id, 
            reviewerIP: IP,
            reviewerName: body.reviewerName,
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
        const fetchReviews = await reviews.find({campaignId: campaign.id})

        await fetchReviews.forEach((review) => {
            rates.push(Number(review.rating))
        })

        const sum = rates.reduce((partialSum, a) => partialSum + a, 0)
        const average =  Math.round((sum / fetchReviews.length) * 10) / 10
        
        await campaigns.updateOne({id: campaign.id}, {$set: {averageRating: average, modifiedAt: date.toLocaleString("us-US")}})

        return{
            SuccMsg: 'Review successfully submitted'
        }
        
    }catch(e){
        console.log(e);
        
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
})