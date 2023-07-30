<script setup lang="ts">
import jwt_decode from 'jwt-decode'

useHead({
    title: 'RecensioFy | setting',
    meta: [
        {
            name: 'description',
            content: 'Password setup' 
        },
    ],
})

definePageMeta({
  layout: false,
})

onBeforeMount(async () => {
    if(localStorage.getItem('token')){
        const token = jwt_decode(localStorage.getItem('token'))

        try{
            await $fetch('/api/users/jwt-check', {method: 'post', headers: {
                Authorization: `Beader ${localStorage.getItem('token')}`
            }})

            return window.location.href = '/dashboard'
        }catch(e){
            localStorage.removeItem('token')
            return
        }
    }
})

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const password = ref<string>('')
const repeat_password = ref<string>('')

const loading = ref<boolean>(false)


const setPassword = async () => {
    loading.value = true
    await $fetch('/api/users/registration', {method: 'post', body: {
        password: password.value,
    }}).then((res) => {
        loading.value = false
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            navigateTo('/connection')
        }, 2500)
    }).catch((e) => {
        loading.value = false
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}
</script>

<template>
    <main class="flex justify-center text-c-dark h-screen">

        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <Transition>
        <div class="m-auto">       

            <div class="grid grid-flow-col gap-8 max-xl:grid-flow-row max-xl:gap-3 max-xl:mt-5">

                <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">

                    <div class="my-10">
                        <h3 class="text-2xl font-bold capitalize">Set a password for your <span class="text-transparent bg-gradient-to-r bg-clip-text from-c-green to-c-blue">RecensioFy</span> account</h3>
                    </div>

                    <div class="flex flex-col my-5">
                        <div class="flex flex-row">
                            <label class="text-sm capitalize my-2 font-semibold" for="password">password</label>
                        </div>
                        
                        <input 
                            class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                            type="password" id="password" name="password" v-model="password" spellcheck="false">
                            <p class="text-xs text-c-dark font-semibold">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
                    </div>

                    <div class="flex flex-col my-5">
                        <div class="flex flex-row">
                            <label class="text-sm capitalize my-2 font-semibold" for="password">repeat password</label>
                        </div>
                        
                        <input 
                            class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                            type="password" id="password" name="password" v-model="repeat_password" spellcheck="false">
                    </div>

                    <div class="m-auto text-center mt-20 mb-10">
                        <button 
                            class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-xl text-c-light font-bold max-md:w-full capitalize"
                            @click="setPassword">
                            set new password
                        </button> 
                        <div v-if="loading" class="mt-2">
                            <i class='bx bx-loader-circle bx-spin bx-rotate-270 bx-sm'></i>
                        </div>
                        <p class="text-xs text-c-light-grey font-semibold my-2">By proceeding, I accept the terms & condition and the privacy policy of RecensioFy</p>
                    </div>
                </div>




                <div class="w-80 max-xl:w-4/5 m-auto max-xl:mb-20">
                    <div class="my-5 max-xl:hidden">
                        <NuxtLink to="/"><img class="w-24 max-xl:m-auto desktop-btn duration-300" src="~/assets/logo-dark.png" alt=""></NuxtLink>
                    </div>
                    
                    <div class="text-c-dark my-10 max-md:my-3">
                        <div class="">
                            <h4 class="capitalize font-bold text-md"><i class='bx bx-check-circle text-c-green'></i> join the platform</h4>
                            <p class="max-md:text-xs p-5 font-medium text-sm max-md:py-2 pt-0">
                                The easies joining process, 3 clicks away to start collecting reviews.
                            </p>
                        </div>
                    </div>

                    <div class="text-c-dark my-10 max-md:my-3">
                        <div class="">
                            <h4 class="capitalize font-bold text-md"><i class='bx bx-check-circle text-c-green'></i> create campaigns</h4>
                            <p class="max-md:text-xs p-5 font-medium text-sm max-md:py-2 pt-0">
                                Create a campaign and connect to our API to showcase reviews
                                on your websites, software and applications.
                            </p>
                        </div>
                    </div>

                    <div class="text-c-dark my-10 max-md:my-3">
                        <div class="">
                            <h4 class="capitalize font-bold text-md"><i class='bx bx-check-circle text-c-green'></i> collect reviews</h4>
                            <p class="max-md:text-xs p-5 font-medium text-sm max-md:py-2 pt-0">
                                Let people witness your social proof and trust by reading your reviews.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
    </main>
</template>

<style scoped>

</style>