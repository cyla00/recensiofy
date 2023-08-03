export default defineNuxtRouteMiddleware(async (to, from) => {
    try{
        const data = await $fetch('/api/users/check-verification-hash', {method: 'post', body: {
            hash: to.params.hash
        }})
    }catch(e){
        return navigateTo('/not-found')
    }
})