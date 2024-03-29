import { model } from 'mongoose'
import { UserSchema } from '../../database/schemas.ts'
import jwt_decode from 'jwt-decode'
import { stripe } from '../../stripe/apiConnection.ts'

export default defineEventHandler(async (event) => {

    const users = model('users', UserSchema) 

    const token = jwt_decode(event.node.req.headers.authorization.split(' ')[1])
    
    try{

        const user = await users.findOne({id: token.id})

        const paymentsList = await stripe.paymentIntents.list({customer: user.stripeUserId})
        const checkSub = await stripe.customers.retrieve(user.stripeUserId, {expand: ['subscriptions']})
        
        const list: Array<object> = []

        for (const element of paymentsList.data){
            const pm = await stripe.paymentMethods.retrieve(element.payment_method)
                
            list.unshift({
                amount: element.amount,
                created: element.created,
                card_type: pm.card.brand,
                exp_month: pm.card.exp_month,
                exp_year: pm.card.exp_year,
                last4: pm.card.last4,
            })
        }

        if(checkSub.subscriptions.total_count === 0){
            return {
                pay: list,
                subscribed: false,
            }
        }
            
        return {
            pay: list,
            subscribed: true,
        }
    }catch(e){
        throw createError({
            statusCode: 500,
        })
    }
})