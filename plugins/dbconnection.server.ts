import { defineNuxtPlugin } from '#app'
import {mongoose} from 'mongoose'

export default defineNuxtPlugin(async (nitroApp) => {
    const env = useRuntimeConfig()
    
    try{
        await mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`)
        console.log('database connected')
    }catch(e){
        console.error(e)
    }
})