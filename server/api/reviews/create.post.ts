import { model } from 'mongoose'
import { CampaignSchema, ReviewSchema } from '../../database/schemas.ts'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const date = new Date()
    const env = useRuntimeConfig()

    const IPcheckURL = `http://check.getipintel.net/check.php?ip=${body.ip}&format=json&flags=f&contact=seroktika@gmail.com`

    if(body.rate === 0){
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
    
    try{
        const checkReviewer = await reviews.findOne({reviewerIP: body.ip, campaignId: body.campaignId})
        if(checkReviewer){
            throw createError({
                statusCode: 403,
                statusMessage: 'You already have submitted a review for this campaign',
            })
        }

        let ratingImg:string = ''
        const host = env.DOMAIN_NAME

        if(body.rate === 1) ratingImg = `http://${host}/rating/star1.png`
        if(body.rate === 2) ratingImg = `http://${host}/rating/star2.png`
        if(body.rate === 3) ratingImg = `http://${host}/rating/star3.png`
        if(body.rate === 4) ratingImg = `http://${host}/rating/star4.png`
        if(body.rate === 5) ratingImg = `http://${host}/rating/star5.png`
        
        await reviews.create({
            id: uuidv4(),
            campaignId: body.campaignId, 
            reviewerIP: body.ip,
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