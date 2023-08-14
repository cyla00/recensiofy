<script setup lang="ts">
useHead({
    title: 'RecensioFy | Delete Account',
    meta: [
        {
            name: 'description',
            content: 'Recensiofy delete account page' 
        },
    ],
})

definePageMeta({
  layout: false,
})


const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const password = ref<string>('')
const loading = ref<boolean>(false)

const endSubscription = async () => {

    const body = {
        password: password.value
    }

    await $fetch('/api/users/end-subscription', {method: 'put', body, headers: {
        Authorization: `Beader ${localStorage.getItem('token')}`,
    }}).then((res) => {
        loading.value = false
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            return window.location.href = '/dashboard'
        }, 1500)
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
        <div class="m-auto">
            <div class="">
                <nuxtLink to="/" class="desktop-btn duration-300"><img class="w-20 m-auto mb-5" src="/assets/logo-dark.png" alt=""></nuxtLink> 
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="">
                    <h3 class="text-xl font-bold capitalize">end subscription</h3>
                    <p class="font-medium mt-5 text-s">Recensiofy will stop the monthly payment subscription</p>
                </div>
                
                <div class="flex flex-col my-5">
                    <label class="capitalize my-2 font-semibold">password</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                        type="password" v-model="password" spellcheck="false">
                </div>

                <div class="m-auto text-center my-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-red py-2 px-10 rounded-tl-xl rounded-br-xl text-xs text-c-light font-bold max-md:w-full capitalize"
                        @click="endSubscription">
                        end subscription
                    </button>

                    <button 
                        class="duration-300 desktop-btn bg-c-blue py-2 px-10 mx-2 rounded-tl-xl rounded-br-xl text-xs text-c-light font-bold max-md:w-full capitalize max-md:mx-auto max-md:mt-5"
                        @click="navigateTo('/dashboard')">
                        back
                    </button>

                    <div v-if="loading" class="mt-2">
                        <i class='bx bx-loader-circle bx-spin bx-rotate-270 bx-sm'></i>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<style scoped>
</style>