<script setup lang="ts">
useHead({
    title: 'RecensioFy | Dashboard',
    meta: [
        {
            name: 'description',
            content: 'RecensioFy dashboard page' 
        },
    ],
})

definePageMeta({
    layout: 'default',
    middleware: ['is-connected-check'],
})

</script>

<template>
    <main class="py-10 flex justify-center">
        <div class="flex max-xl:flex-col">
            <DashboardUserData/>
            <DashboardCampaignData/>
            <div class="mx-auto max-xl:mx-0 grid grid-rows-2 h-[820px]">
                <DashboardReviewsData/>
                <DashboardPaymentsData/>
            </div>
        </div>
        
        
        
    </main>
</template>

<style scoped>

</style>