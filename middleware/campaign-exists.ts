export default defineNuxtRouteMiddleware(async (to, from) => {

    const body = {
        id: to.params.campaignId
    }

    try{
        await $fetch('/api/campaigns/campaign-exists', {method: 'post', body: body})
    }catch(e){
        return navigateTo('/not-found')
    }
})