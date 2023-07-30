<script setup lang="ts">
let year = new Date().getFullYear()
</script>

<template>
    <slot/>


    <footer class="my-5 flex justify-center text-c-dark text-xs">
        <p>Powered by @RecensioFy {{ year }}</p>
    </footer>
</template>