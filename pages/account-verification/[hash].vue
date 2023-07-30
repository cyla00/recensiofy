<script setup lang="ts">

useHead({
    title: 'Recensiofy | Account Verification',
    meta: [
        {
            name: 'description',
            content: 'Recensiofy account verification page' 
        },
    ],
})

definePageMeta({
  layout: false,
//   middleware: 'verification-hash-check'
})

//backend messages popup
let Show = ref<boolean>(false)
let ErrMsg = ref<string>('')
let SuccMsg = ref<string>('')

const route = useRoute()

const verifyEmail = async () => {
    await $fetch('/api/users/verify-user', {method: 'put', body: {
        hash: route.params.hash
    }}).then((res) => {
        Show.value = true
        SuccMsg.value = res?.SuccMsg
        setTimeout(() => {
            return navigateTo('/connection')
        }, 2500)
    }).catch((e) => {
        console.log(e);
    })
}

</script>

<template>
    <main class="flex justify-center h-screen text-c-dark">
        <Popup :Show="Show" :ErrMsg="ErrMsg" :SuccMsg="SuccMsg"/>
        
        <Transition>
        <div class="m-auto">
            <div class="">
                <img class="w-32 m-auto mb-5" src="/assets/logo-dark.png" alt="">
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="">
                    <h3 class="text-2xl font-bold capitalize">verify to activate your account!</h3>
                    <p class="font-medium mt-5 text-s">Start your journey here!</p>
                </div>
                

                <div class="m-auto text-center my-10">
                    <button 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-xl text-c-light font-bold max-md:w-full capitalize"
                        @click="verifyEmail">
                        verify email
                    </button>
                </div>

            </div>
        </div>
        </Transition>
    </main>
</template>

<style scoped>
</style>