<script setup lang="ts">
useHead({
    title: 'Password Recovery'
})

definePageMeta({
  layout: false,
})

let Show = ref<boolean>(false)
let ErrMsg = ref<string>('')
let SuccMsg = ref<string>('') 

const email = ref<string>('')
let loading = ref<boolean>(false)


const passRecover = async () => {
    loading.value = true
    await $fetch('/api/users/recovery-email', {method: 'post', body: {
        email: email.value
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
    <main class="flex justify-center h-screen text-c-dark text-xs">

        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <Transition>
        <div class="m-auto">
            <div class="">
                <NuxtLink to="/"><img class="w-20 m-auto mb-5 desktop-btn duration-300" src="/assets/logo-dark.png" alt=""></NuxtLink>
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="my-10">
                    <h3 class="text-xl font-bold capitalize">reset your access credentials</h3>
                    <p class="font-medium mt-10 text-base">We will send you a recovery link by email to reset your password, check the spam folder if you don't find it!</p>
                </div>
                   
                <div class="flex flex-col my-5">
                    <label class="capitalize my-2 font-semibold" for="email">email</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md font-semibold" 
                        type="text" v-model="email" spellcheck="false">
                </div>

                <div class="m-auto text-center mt-20 mb-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold max-md:w-full capitalize"
                        @click="passRecover" title="send recovery email">
                        continue
                    </button>
                    <div v-if="loading" class="mt-2">
                            <i class='bx bx-loader-circle bx-spin bx-rotate-270 bx-sm'></i>
                        </div>
                </div>
                <div class="font-semibold text-center">
                    <p class="capitalize text-c-dark">return to, <NuxtLink to="/connection" class="link-effect text-c-blue duration-300">Connection</NuxtLink></p>
                </div>
            </div>
        </div>
        </Transition>
    </main>
</template>

<style scoped>
</style>