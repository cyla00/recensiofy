import { model } from 'mongoose'
import { CampaignSchema } from '../../database/schemas.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const campaigns = model('campaigns', CampaignSchema)
    
    try{
        const campaign = await campaigns.findOne({id: body.id})

        return{
            campaign: {
                id: campaign.id,
                campaignLogo: campaign.campaignLogo,
                organization: campaign.organization,
                facebookUrl: campaign.facebookUrl,
                instagramUrl: campaign.instagramUrl,
                twitterUrl: campaign.twitterUrl,
                linkedInUrl: campaign.linkedInUrl,
                websiteUrl: campaign.websiteUrl,
                averageRating: campaign.averageRating,
                location: campaign.location,
                verifiedCampaign: campaign.verifiedCampaign,
                description: campaign.description,
                category: campaign.category,
            }
        }
    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})