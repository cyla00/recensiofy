export default defineNuxtRouteMiddleware(async (to, from) => {

    if(to.path === '/dashboard'){
        try{
            await $fetch('/api/users/jwt-check', {method: 'post', headers: {
                Authorization: `Beader ${localStorage.getItem('token')}`
            }})
            return
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