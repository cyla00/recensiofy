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
            '/api/users/update-email', // modifies email
            '/api/users/update-password', // modifies email
            '/api/users/regen-api-key', // modifies email

        ]

        if(authUrls.includes(path)){
            jwt.verify(token, env.KEY)
        }
    }
})