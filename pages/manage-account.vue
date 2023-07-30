<script setup lang="ts">

useHead({
    title: 'RecensioFy | Management',
    meta: [
        {
            name: 'description',
            content: 'RecensioFy campaign management page page' 
        },
    ],
})

definePageMeta({
    layout: false,
})

</script>

<template>
    <main class="flex justify-center h-screen text-c-dark">
        <div class="m-auto">
            <div class="">
                <NuxtLink to="/" class="desktop-btn duration-300"><img class="w-32 m-auto mb-5" src="/assets/logo-dark.png" alt=""></NuxtLink>
            </div>

            account managmeent
        </div>
    </main>   
</template>

<style scoped>
</style>