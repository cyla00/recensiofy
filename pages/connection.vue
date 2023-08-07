<script setup lang="ts">
import jwt_decode from 'jwt-decode'
import base64 from 'base-64'

useHead({
    title: 'RecensioFy | Log In',
    meta: [
        {
            name: 'description',
            content: 'RecensioFy connection page' 
        },
    ],
})

definePageMeta({
    layout: false,
    middleware: ['is-connected-check'],
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

const email = ref<string>('')
const password = ref<string>('')

const connection = async () => {
    await $fetch('/api/users/login', {method: 'post', headers: {
        Authorization: `Basic ${base64.encode(`${email.value}:${password.value}`)}`
    }}).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        localStorage.setItem('token', res.token)
        setTimeout(() => {
            navigateTo('/dashboard')
        }, 2500)
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}
</script>

<template>
    <main class="flex justify-center h-screen text-c-dark text-xs">

        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <Transition>
        <div class="m-auto flex max-xl:flex-col">

            <div class="back-shadow p-7 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="my-10">
                    <h3 class="text-xl font-bold capitalize">sign up to start your campaigns!</h3>
                </div>
                   
                <div class="flex flex-col my-5">
                    <label class="capitalize my-2 font-semibold" for="email">email</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 rounded-md text-sm font-semibold" 
                        type="text" v-model="email" spellcheck="false">
                </div>

                <div class="flex flex-col my-5">
                    <div class="flex flex-row">
                        <label class="capitalize my-2 font-semibold" for="password">password</label>
                        <div class="m-auto"></div>
                        <NuxtLink to="/password-recovery/" class="link-effect text-c-blue font-semibold duration-300 m-auto mr-0">
                            forgot your password?
                        </NuxtLink>
                    </div>
                    
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md" 
                        type="password" v-model="password" spellcheck="false">
                </div>

                <div class="m-auto text-center mt-20 mb-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold max-md:w-full capitalize"
                        @click="connection" title="proceed to dashboard">
                        connect
                    </button>
                </div>
                <div class="font-semibold text-center text-xs">
                    <p class="capitalize text-c-dark">don’t have an account? <NuxtLink to="/" class="link-effect text-c-blue duration-300">Start here!</NuxtLink></p>
                </div>
            </div>


            <div class="w-96 max-xl:w-4/5 m-auto ml-5 max-xl:mx-auto">
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
        </Transition>
    </main>
</template>

<style scoped>
</style>