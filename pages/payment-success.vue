<script setup lang="ts">

useHead({
    title: 'RecensioFy | Subscribed',
    meta: [
        {
            name: 'description',
            content: 'RecensioFy payment success page' 
        },
    ],
})

definePageMeta({
    layout: false,
})

</script>

<template>
    <main class="flex justify-center h-screen text-c-dark text-xs">
        <div class="m-auto">
            <div class="">
                <img class="w-20 m-auto mb-5" src="/assets/logo-dark.png" alt="">
            </div>

            <div class="back-shadow p-10 rounded-xl max-md:px-5 max-md:w-4/5 m-auto w-forms">
                <div class="">
                    <h3 class="text-xl font-bold capitalize">You have successfully subscribed!</h3>
                    <p class="font-medium mt-5 text-s">We are glad to welcome you on board! click continue to go back to your dashboard</p>
                </div>
                    
                <div class="m-auto text-center my-10">
                    <NuxtLink to="/connection" 
                        class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold max-md:w-full capitalize">
                        Continue</NuxtLink>
                </div>
            </div>
        </div>
    </main>
        
</template>

<style scoped>
</style>