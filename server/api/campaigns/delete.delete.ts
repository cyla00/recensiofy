import { model } from 'mongoose'
import { CampaignSchema, UserSchema, ReviewSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { sha256toBase64 } from '../../auth/hasher.ts'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const users = model('users', UserSchema)
    const reviews = model('reviews', ReviewSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])

    if(body.password === ''){
        throw createError({
            statusCode: 400,
            statusMessage: 'Insert your password'
        })
    }

    try{
        const checkUser = await users.findOne({id: token.id, password: sha256toBase64(body.password)})
        if(!checkUser){ 
            throw createError({
                statusCode: 400,
                statusMessage: 'Incorrect credentials',
            })
        }

        const checkCampaign = await campaigns.findOne({id: body.campaignId, userId: token.id})
        if(!checkCampaign){
            throw createError({
                statusCode: 400,
                statusMessage: 'An error occurred, please retry later',
            })
        }

        await campaigns.deleteOne({id: body.campaignId})
        await reviews.deleteMany({campaignId: body.campaignId})

        return {
            SuccMsg: 'Campaign successfully deleted'
        }

    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'An error occurred, please retry later',
        })
    }
}) 