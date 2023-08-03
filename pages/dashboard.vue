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
    <main>
        dash
    </main>
</template>

<style scoped>

</style>