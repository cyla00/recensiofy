import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    // check for jwt validity
    
    const env = useRuntimeConfig()
    if(event.node.req.headers.authorization){
        
        const token = event.node.req.headers.authorization.split(' ')[1]

        const path = await event.node.req.url
        const authUrls = [
            // list all jwt protected routes

            // USER
            '/api/users/jwt-check', // checks jwt on command
            '/api/users/delete', // deletes account, campaigns and reviews
            '/api/users/fetch-data', // fetches some user data
            '/api/users/update-email', // updates email
            '/api/users/update-password', // updates password
            '/api/users/regen-api-key', // regens api key
            '/api/users/fetch-payments', // gets all payments stripe
            '/api/campaigns/create', // creates campaign
            '/api/campaigns/delete', // deletes campaign
            '/api/campaigns/get-campaign', // gets campaign data (private)
            '/api/users/end-subscription', // ends subscription stripe
            '/api/users/init-payment', // inits payment session stripe
            'api/reviews/fetch-private', // fetch the last 5 reviews

        ]

        if(authUrls.includes(path)){
            jwt.verify(token, env.KEY)
        }
    }
})