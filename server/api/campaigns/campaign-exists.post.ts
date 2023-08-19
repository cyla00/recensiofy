import { model } from 'mongoose'
import { CampaignSchema } from '../../database/schemas.ts'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const campaigns = model('campaigns', CampaignSchema)
    try{
        const campaign = await campaigns.findOne({id: body.id})
        if(!campaign){
            throw createError({
                statusCode: 404,
            })
        }

        return {
            'exists': true
        }
    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})