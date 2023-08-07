<script setup lang="ts">

useHead({
    title: 'RecensioFy | Password Recovery',
    meta: [
        {
            name: 'description',
            content: 'RecensioFy password recovery page' 
        },
    ],
})

definePageMeta({
  layout: false,
  middleware: 'hash-check',
})

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const route = useRoute()
const hashId = route.params.hash
const repeatPassword = ref<string>('')
const newPassword = ref<string>('')
const loading = ref<boolean>(false)

const resetPass = async () => {
    loading.value = true
    await $fetch('/api/users/reset-password', {method: 'put', body: {
        hash: hashId,
        newPassword: newPassword.value,
        repeatPassword: repeatPassword.value,
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
    <main class="flex justify-center h-screen text-c-dark">

        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <Transition>
        <div class="m-auto">
            <div class="">
                <img class="w-32 m-auto mb-5" src="/assets/logo-dark.png" alt="">
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="my-10">
                    <h3 class="text-2xl font-bold capitalize">reset your password</h3>
                    <p class="font-medium mt-10 text-s">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
                </div>
                   
                <div class="flex flex-col my-5">
                    <label class="text-sm capitalize my-2 font-semibold" for="fullName">new password</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                        type="password" v-model="newPassword">
                    <p class="text-c-light-grey font-semibold">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
                </div>

                <div class="flex flex-col my-5">
                    <label class="text-sm capitalize my-2 font-semibold" for="password">repeat password</label>
                    <input 
                        class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                        type="password" v-model="repeatPassword">
                </div>

                <div class="m-auto text-center mt-20 mb-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-xl text-c-light font-bold max-md:w-full capitalize"
                        @click="resetPass" title="reset your password">
                        reset password
                    </button>
                    <div v-if="loading" class="mt-2">
                        <i class='bx bx-loader-circle bx-spin bx-rotate-270 bx-sm'></i>
                    </div>
                </div>
                <div class="font-semibold text-center text-xs">
                    <p class="capitalize text-c-dark">return to, <NuxtLink to="/" class="link-effect text-c-blue duration-300">log in</NuxtLink></p>
                </div>
            </div>
        </div>
        </Transition>
    </main>
</template>

<style scoped>
</style>