// creates campagin
// takes body: organisation, sector, location, website_url, description, fb_url, ig_url, tw_url, li_url + logo

import { model } from 'mongoose'
import { CampaignSchema, UserSchema } from '../../database/schemas.ts'
import { stripe } from '../../stripe/apiConnection.ts'
import jwt_decode from 'jwt-decode'
import { parseMultipartRequest } from '../../parseMultipartRequest.ts'
import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'


export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema)
    const campaigns = model('campaigns', CampaignSchema)
    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])
    const date = new Date()
    
    try{
        const body = await parseMultipartRequest(event.node.req)
        const userCheck = await users.findOne({id: token.id})
        const campaignCheck = await campaigns.findOne({userId: token.id})
        const checkSub = await stripe.customers.retrieve(userCheck.stripeUserId, {expand: ['subscriptions']})

        if(checkSub.subscriptions.total_count === 0){
            throw createError({
                statusCode: 400,
                statusMessage: 'Subscribe to create or update your campaign',
            })
        }

        if(body.organization === '' || body.category === '' || body.location === '' || body.description === ''){
            throw createError({
                statusCode: 400,
                statusMessage: 'Provide all the necessary information *',
            })
        }

        const urlList: Array<string> = [body.websiteUrl, body.facebookUrl, body.instagramUrl, body.tiktokUrl, body.linkedInUrl, body.twitterUrl]

        for (let i = 0; i < urlList.length; i++) {
            const element = urlList[i]
            
            if(element !== ""){
                try {
                    new URL(element)
                } catch (e) {   
                    throw createError({
                        statusCode: 500,
                        statusMessage: 'Use a valid URL',
                    })
                }
            }
        }


        if(campaignCheck){
            await campaigns.updateOne({userId: token.id}, {$set: {
                location: body.location,
                organization: body.organization,
                description: body.description,
                category: body.category,
                websiteUrl: body.websiteUrl,
                facebookUrl: body.facebookUrl,
                instagramUrl: body.instagramUrl,
                tiktokUrl: body.tiktokUrl,
                linkedInUrl: body.linkedInUrl,
                twitterUrl: body.twitterUrl,
                modifiedAt: date.toLocaleString("us-US"),
            }})
        }else{
            await campaigns.create({
                id: uuidv4(),
                userId: token.id,
                location: body.location,
                organization: body.organization,
                description: body.description,
                category: body.category,
                campaignLogo: body.campaignLogo,
                averageRating: 0,
                websiteUrl: body.websiteUrl,
                facebookUrl: body.facebookUrl,
                instagramUrl: body.instagramUrl,
                tiktokUrl: body.tiktokUrl,
                linkedInUrl: body.linkedInUrl,
                twitterUrl: body.twitterUrl,
                verifiedCampaign: false,
                createdAt: date.toLocaleString("us-US"),
                modifiedAt: '',
                visible: true,
            })
        }
        

        return{
            SuccMsg: 'Campaign successfully created'
        }

    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: e.statusMessage || 'It was not possible to create a campaign, please retry later',
        })
    }
})