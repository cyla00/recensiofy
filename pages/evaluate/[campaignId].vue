<script setup lang="ts">

useHead({
    title: 'Recensiofy | Evaluate',
    meta: [
        {
            name: 'description',
            content: 'Recensiofy campaign evaluation page' 
        },
    ],
})

definePageMeta({
    layout: 'powered-footer',
    middleware: ['campaign-exists'],
})

const route = useRoute()

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const paramId = route.params.campaignId
const campaignData = ref<object>({})
const ratingNumber = ref<number>(0)
const title = ref<string>('') 
const description = ref<string>('')
const reviewerName = ref<string>('')

const campaignLogo = ref<string>('https://i.ibb.co/ZY5mmjg/default-campaing-logo.png')

onBeforeMount(async () => {

    const body = {
        id: paramId
    }

    await $fetch('/api/campaigns/public-data', {method: 'post', body: body, headers: {
        Authorization: `Beader ${localStorage.getItem('token')}`
    }}).then((res) => {
        campaignData.value = res.campaign
    }).catch((e) => {
        return
    })
})




const submitReview = async () => {

    let ip = ''
    await $fetch('https://api.ipify.org?format=json', { method: 'get' }).then((res) => {
        ip = res?.ip
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = 'It was not possible to register, retry later'
        return
    })

    const body = {
        campaignId: campaignData.value.id,
        rate: ratingNumber.value,
        title: title.value,
        description: description.value,
        ip: ip,
        reviewerName: reviewerName.value,
    }

    await $fetch('/api/reviews/create', {method: 'post', body}).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            window.location.reload()
        }, 2500)
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}

</script>

<template>
    <main class="flex justify-center h-full text-c-dark">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div class="m-auto w-[750px] max-md:w-4/5 shrink-0 my-20">
            <div class="flex m-auto justify-center">
                <a href="/" class="desktop-btn duration-200"><img class="w-20 m-auto mb-5" src="/assets/logo-dark.png" alt=""></a>
            </div>
            <div class="back-shadow p-5 rounded-xl m-auto max-md:px-5 mb-5 flex max-md:flex max-md:flex-col max-md:text-center">
                <div class="shrink-0 my-auto">
                    <img :src="campaignLogo" alt="camapign logo" class="h-20 m-auto rounded-xl">
                </div>
                <div class="mr-auto ml-5 overflow-hidden max-md:m-auto max-md:my-5 w-full my-auto">
                    <h3 class="text-c-dark font-semibold capitalize text-base truncate">{{ campaignData.organization }}</h3>
                    <p class="text-xs my-1"><i class='bx bx-map-pin bx-xs'></i> {{ campaignData.location }}</p>
                    <a :href="campaignData.facebookUrl" target="_blank" v-if="campaignData.facebookUrl !== ''"><i class='bx bxl-facebook-circle bx-sm duration-200 hover:text-c-blue mr-1'></i></a>
                    <a :href="campaignData.instagramUrl" target="_blank" v-if="campaignData.instagramUrl !== ''"><i class='bx bxl-instagram-alt bx-sm duration-200 hover:text-c-blue mr-1'></i></a>
                    <a :href="campaignData.twitterUrl" target="_blank" v-if="campaignData.twitterUrl !== ''"><i class='bx bxl-twitter bx-sm duration-200 hover:text-c-blue mr-1'></i></a>
                    <a :href="campaignData.linkedInUrl" target="_blank" v-if="campaignData.linkedInUrl !== ''"><i class='bx bxl-linkedin-square bx-sm duration-200 hover:text-c-blue mr-1'></i></a>
                    <a :href="campaignData.websiteUrl" target="_blank" v-if="campaignData.websiteUrl !== ''"><i class='bx bx-link-alt bx-sm duration-200 hover:text-c-blue mr-1'></i></a>
                    

                    <div class="flex text-xs font-semibold text-c-dark">
                        <p class="py-1 px-5 rounded-full border border-c-dark">{{ campaignData.category }}</p>
                    </div>

                    <div class="m-auto flex">
                        <p 
                            v-if="campaignData.verifiedCampaign" 
                            class="my-2 duration-200 text-xs capizalize text-c-light py-1 px-3 bg-gradient-to-bl from-c-green to-c-blue font-bold rounded-full max-md:w-full max-md:mb-2 max-md:mx-0">
                            <i class='bx bxs-check-circle text-c-green'></i> verified campaign!
                        </p>
                    </div>
                    
                </div> 
                <div class="font-semibold my-auto max-md:m-auto shrink-0 ml-5">
                    <p class="text-xs text-center">average rating</p>
                    <div class="flex flex-row">
                        <i class='bx bxs-star bx-sm text-c-green my-auto'></i><p class="text-2xl">{{ campaignData.averageRating }}/5</p>
                    </div>
                </div>
            </div>
            <div class="back-shadow p-5 rounded-xl m-auto max-md:px-5">
                <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue my-5 text-center">Evaluate your experience!</h3>

                <div class="text-c-dark font-semibold text-base">
                    <h3 class="text-sm">Rating *</h3>
                    <h3 class="text-xs text-c-light-grey">(How good was it?)</h3>
                    <RatingStars @ratingValue="(n) => {ratingNumber = n}"/>
                </div>

                <div class="flex flex-col my-3">

                    <div class="my-5">
                        <label class="text-sm capitalize my-2 font-semibold m-0">Reviewer name *</label>
                        <h3 class="font-semibold text-xs text-c-light-grey">(Insert your name or username)</h3>
                    </div>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md font-semibold" 
                        type="text" v-model="reviewerName" spellcheck="false" maxlength="50" placeholder="max 50 characters">


                    <div class="my-5">
                        <label class="text-sm capitalize my-2 font-semibold m-0">title *</label>
                        <h3 class="font-semibold text-xs text-c-light-grey">(Choose a title for your review)</h3>
                    </div>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md font-semibold" 
                        type="text" v-model="title" spellcheck="false" maxlength="50" placeholder="max 50 characters">

                    <div class="my-5">
                        <label class="text-sm capitalize my-2 font-semibold mt-10">description *</label>
                        <h3 class="font-semibold text-xs text-c-light-grey">(Describe your experience)</h3>
                    </div>
                    <textarea
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md mb-10 font-semibold" 
                        v-model="description" spellcheck="false" rows="8" cols="5" maxlength="250" placeholder="max 250 characters"></textarea>
                </div>

                <div class="max-md:flex-col flex justify-center mt-5">
                    <button 
                        @click="submitReview"
                        class="mx-2 desktop-btn duration-200 capizalize text-c-light py-1 px-3 bg-c-green font-bold rounded-tl-xl rounded-br-xl max-md:w-full max-md:mb-2 max-md:mx-0">
                        Submit review
                    </button>
                </div>  
            </div>
        </div>
    </main>
</template>

<style scope>
textarea {
  resize: none;
}
</style>