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
    <main class="flex justify-center h-screen text-c-dark">

        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <Transition>
        <div class="m-auto">
            <div class="">
                <NuxtLink to="/"><img class="w-32 m-auto mb-5 desktop-btn duration-300" src="/assets/logo-dark.png" alt=""></NuxtLink>
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="my-10">
                    <h3 class="text-2xl font-bold capitalize">sign up to start your campaigns!</h3>
                </div>
                   
                <div class="flex flex-col my-5">
                    <label class="text-sm capitalize my-2 font-semibold" for="email">email</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                        type="text" id="email" name="email" v-model="email" spellcheck="false">
                </div>

                <div class="flex flex-col my-5">
                    <div class="flex flex-row">
                        <label class="text-sm capitalize my-2 font-semibold" for="password">password</label>
                        <div class="m-auto"></div>
                        <NuxtLink to="/password-recovery/" class="link-effect text-c-blue text-xs font-semibold duration-300 m-auto mr-0">
                            forgot your password?
                        </NuxtLink>
                    </div>
                    
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                        type="password" id="password" name="password" v-model="password" spellcheck="false">
                </div>

                <div class="m-auto text-center mt-20 mb-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-xl text-c-light font-bold max-md:w-full capitalize"
                        @click="connection">
                        connect
                    </button>
                </div>
                <div class="font-semibold text-center text-xs">
                    <p class="capitalize text-c-dark">don’t have an account? <NuxtLink to="/" class="link-effect text-c-blue duration-300">Start here!</NuxtLink></p>
                </div>
            </div>
        </div>
        </Transition>
    </main>
</template>

<style scoped>
</style>