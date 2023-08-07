export default defineNuxtRouteMiddleware(async (to, from) => {

    if(to.path === '/dashboard'){
        if (process.server) return
        try{
            await $fetch('/api/users/jwt-check', {method: 'post', headers: {
                Authorization: `Beader ${localStorage.getItem('token')}`
            }})
        }catch(e){
            return navigateTo('/connection')
        }
    }

    if(to.path === '/connection'){
        try{
            await $fetch('/api/users/jwt-check', {method: 'post', headers: {
                Authorization: `Beader ${localStorage.getItem('token')}`
            }})
            return navigateTo('/dashboard')
        }catch(e){
            return
        }
    }

})