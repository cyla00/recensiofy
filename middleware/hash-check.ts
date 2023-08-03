export default defineNuxtRouteMiddleware(async (to, from) => {
    try{
        const data = await $fetch('/api/users/hash-check', {method: 'post', body: {
            hash: to.params.hash
        }})
    }catch(e){
        return navigateTo('/not-found')
    }
})